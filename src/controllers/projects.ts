import { body, param, validationResult } from 'express-validator'
import { Request, Response, Router } from 'express'
import { In } from 'typeorm'
import { AppDataSource } from '../services/dbService'
import Project from '../entity/Project'
import User from '../entity/User'

const router = Router()
const projectRepository = AppDataSource.getRepository(Project)
const userRepository = AppDataSource.getRepository(User)

// Create
router.post('/',
    body('title').isLength({ min: 5 }),
    body('members').optional().isArray(),
    async (request: Request, response: Response) => {

        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // Attach basic fields
        let project: Project
        project = { ...project, ...request.body }

        // Attach members, if applicable
        if (request.body.members !== undefined) {
            project.members = await userRepository.find({
                where: { id: In(request.body.members) }
            })
        }

        // Persist and return entity
        projectRepository.save(project).then(project => {
            response.send(project)
        }).catch(err => {
            response.status(500).send({ error: `${err}` })
        })

    })
// List
router.get('/', (request: Request, response: Response) => {

    projectRepository.find({ take: 10 })
        .then(projects => response.send(projects))
        .catch(err => {
            response.status(404).send({ error: "Could not find any projects." })
        })
})

// Get a single User 
router.get('/:id',
    param('id').isNumeric(),
    function (request: Request, response: Response) {
        projectRepository.findOne({
            where: { id: Number(request.params.id) },
            select: ['id', 'title', 'members']
        })
            .then(project => {
                response.status(200).send(project)
            }).catch(error => response.status(400).send({ error: error }))
    }
)


// Update 
router.put('/:id',
    param('id').isNumeric(),
    body('title').isLength({ min: 5 }),
    body('members').optional(),
    async (request: Request, response: Response) => {

        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        projectRepository.findOne({
            where: { id: Number(request.params.id) }
        }).then(async project => {

            // Update basic fields
            project = await projectRepository.preload(project)
            project = { ...project, ...request.body }

            // Update members, if applicable
            if (request.body.members !== undefined) {
                project.members = await userRepository.find({
                    where: { id: In(request.body.members) }
                })
            }
            // Persist and return entity
            project = await projectRepository.save(project)
            response.send(project)
        }).catch(err => {
            response.status(500).send({ error: `${err}` })
        })

    }
)

// Delete a single Project
router.delete('/:id',
    param('id').isNumeric(),
    function (request: Request, response: Response) {
        projectRepository.findOne({ where: { id: Number(request.params.id) } })
            .then(async project => {
                projectRepository.delete({ id: Number(project.id) })
                response.sendStatus(200)
            }).catch(error => response.sendStatus(400))
    }
)

export default router
