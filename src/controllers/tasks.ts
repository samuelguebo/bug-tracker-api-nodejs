import { Request, Response, Router } from 'express'
import { AppDataSource } from '../services/dbService'
import { body, param, validationResult } from 'express-validator'
import Task from '../entity/Task'
import User from '../entity/User'
import { In } from 'typeorm'
import Project from '../entity/Project'

const router = Router()
const taskRepository = AppDataSource.getRepository(Task)
const userRepository = AppDataSource.getRepository(User)
const projectRepository = AppDataSource.getRepository(Project)

// Create
router.post('/',
    body('title').isLength({ min: 5 }),
    body('author').isNumeric(),
    body('subscribers').optional().isArray(),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('projects').optional().isArray(),
    async (request: Request, response: Response) => {

        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // Attach basic fields
        let task: Task
        task = { ...task, ...request.body }

        // Attach author
        task.author = await userRepository.findOne({
            where: { id: Number(request.body.author) }
        })

        // Attach subscribers, if applicable
        if (request.body.subscribers !== undefined) {
            task.subscribers = await userRepository.find({
                where: { id: In(request.body.subscribers) }
            })
        }

        // Attach projects, if applicable
        if (request.body.projects !== undefined) {
            task.projects = await projectRepository.find({
                where: { id: In(request.body.projects) }
            })
        }

        // Persist and return created Task
        taskRepository.save(task).then(task => {
            response.send(task)
        }).catch(err => {
            response.status(500).send({ error: `Could not create the user ${err}` })
        })

    }
)

// List
router.get('/', (request: Request, response: Response) => {

    taskRepository.find({ take: 10 })
        .then(tasks => response.send(tasks))
        .catch(err => {
            response.status(404).send({ error: "Could not find any tasks." })
        })
})

// Get a single entity 
router.get('/:id',
    param('id').isNumeric(),
    function (request: Request, response: Response) {
        taskRepository.findOne({
            where: { id: Number(request.params.id) }
        })
            .then(task => {
                response.status(200).send(task)
            }).catch(error => response.status(400).send({ error: error }))
    })


// Update 
router.put('/:id',
    param('id').isNumeric(),
    body('title').isLength({ min: 5 }),
    body('author').isNumeric(),
    body('subscribers').optional().isArray(),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('projects').optional().isArray(),
    async (request: Request, response: Response) => {

        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        taskRepository.findOne({ where: { id: Number(request.params.id) } })
            .then(async task => {

                // Attach basic fields
                task = await taskRepository.preload(task)
                task = { ...task, ...request.body }

                // Attach author
                task.author = await userRepository.findOne({
                    where: { id: Number(request.body.author) }
                })

                // Attach subscribers, if applicable
                if (request.body.subscribers !== undefined) {
                    task.subscribers = await userRepository.find({
                        where: { id: In(request.body.subscribers) }
                    })
                }

                // Attach projects, if applicable
                if (request.body.projects !== undefined) {
                    task.projects = await projectRepository.find({
                        where: { id: In(request.body.projects) }
                    })
                }

                // Persist and return created entity
                task = await taskRepository.save(task)
                response.send(task)
            }).catch(err => {
                response.status(500).send({ error: `${err}` })
            })

    }
)

// Delete a single Project
router.delete('/:id',
    param('id').isNumeric(),
    function (request: Request, response: Response) {
        taskRepository.findOne({ where: { id: Number(request.params.id) } })
            .then(async task => {
                taskRepository.delete({ id: Number(task.id) })
                response.sendStatus(200)
            }).catch(error => response.sendStatus(400))
    })

export default router
