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
    body('collaborators').optional().isArray(),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('projects').optional().isArray(),
    async (request: Request, response: Response) => {

        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // Attach basic fields
        let task: Task = new Task
        task = { ...task, ...request.body }

        // Attach author
        const existingAuthor = await userRepository.findOne({
            where: { id: Number(request.body.author) }
        })

        if (existingAuthor) {
            task.author = existingAuthor
        }

        // Attach collaborators, if applicable
        if (request.body.collaborators !== undefined) {
            task.collaborators = await userRepository.find({
                where: { id: In(request.body.collaborators) }
            })
        }

        // Attach projects, if applicable
        if (request.body.projects !== undefined) {
            task.projects = await projectRepository.find({
                where: { id: In(request.body.projects) }
            })
        }

        // Persist and return created Task
        taskRepository.save(task).then(new_task => {
            response.send(new_task)
        }).catch(err => {
            response.status(500).send({ error: `${err}` })
        })

    }
)

// List
router.get('/', (request: Request, response: Response) => {

    taskRepository.find({
        take: 50, relations: ['author']
    })
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
            where: { id: Number(request.params.id) },
            relations: ['author', 'comments', 'projects', 'collaborators']
        })
            .then(new_task => {
                response.status(200).send(new_task)
            }).catch(error => response.status(400).send({ error: error }))
    })


// Update 
router.put('/:id',
    param('id').isNumeric(),
    body('title').isLength({ min: 5 }),
    body('author').isNumeric(),
    body('collaborators').optional().isArray(),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('projects').optional().isArray(),
    async (request: Request, response: Response) => {

        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            let task = await taskRepository.findOne({ where: { id: Number(request.params.id) } })

            if (!task) {
                throw Error("User does not exist")
            }
            // Attach basic fields
            let existingTask = await taskRepository.preload(task)
            existingTask = { ...existingTask, ...request.body }

            // Attach author
            const existingAuthor = await userRepository.findOne({
                where: { id: Number(request.body.author) }
            })

            if (existingAuthor) {
                task.author = existingAuthor
            }

            // Attach collaborators, if applicable
            if (request.body.collaborators !== undefined) {
                task.collaborators = await userRepository.find({
                    where: { id: In(request.body.collaborators) }
                })
            }

            // Attach projects, if applicable
            if (request.body.projects !== undefined) {
                task.projects = await projectRepository.find({
                    where: { id: In(request.body.projects) }
                })
            }

            // Persist and return created entity
            const new_task = await taskRepository.save(task)
            response.send(new_task)
        }
        catch (error) {
            response.status(400).send({ error: error })
        }

    }
)

// Delete a single Task
router.delete('/:id',
    param('id').isNumeric(),
    function (request: Request, response: Response) {
        taskRepository.findOne({ where: { id: Number(request.params.id) } })
            .then(async task => {
                taskRepository.delete({ id: Number(task?.id) })
                response.sendStatus(200)
            }).catch(error => response.sendStatus(400))
    })

export default router
