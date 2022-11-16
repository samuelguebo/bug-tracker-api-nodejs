import { body, validationResult } from 'express-validator'
import { Request, Response, Router } from 'express'
import { In } from 'typeorm'
import { AppDataSource } from '../data-source'
import Project from '../entity/Project'
import User from '../entity/User'

const router = Router()
const projectRepository = AppDataSource.getRepository(Project)
const userRepository = AppDataSource.getRepository(User)

// Create
router.post('/',
    body('title').isLength({ min: 5 }),
    body('members').optional(),
    async (request: Request, response: Response) => {

        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        let payload = {}
        let members: User[] = []

        // Prepare payload for DB insertion
        payload = { title: request.body.title }
        if (request.body.members !== undefined) {
            members = await userRepository.find({ where: { id: In(request.body.members) } })
            payload = { title: request.body.title, members: members }
        }

        // Persist and return ID
        projectRepository.save(payload).then(project => {
            response.send({ id: project.id })
        }).catch(err => {
            response.status(500).send({ error: `Could not create the user ${err}` })
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
router.get('/:id', function (request: Request, response: Response) {
    projectRepository.findOne({
        where: { id: Number(request.params.id) },
        select: ['id', 'title', 'members']
    })
        .then(project => {
            response.status(200).send(project)
        }).catch(error => response.status(400).send({ error: error }))
})


// Update 
router.put('/:id',
    body('title').isLength({ min: 5 }),
    body('members').optional(),
    async (request: Request, response: Response) => {

        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        let payload = {}
        let members: User[] = []

        // Prepare payload for DB insertion
        payload = { title: request.body.title }
        if (request.body.members !== undefined) {
            members = await userRepository.find({ where: { id: In(request.body.members) } })
        }

        // Persist and return ID
        projectRepository.findOne({
            where: { id: Number(request.params.id) }
        }).then(async project => {

            project = await projectRepository.preload(project)
            project = { ...project, ...request.body, members: members }
            project = await projectRepository.save(project)
            response.send(project)
        }).catch(err => {
            response.status(500).send({ error: `${err}` })
        })

    })

// Delete a single Project
router.delete('/:id', function (request: Request, response: Response) {
    projectRepository.findOne({ where: { id: Number(request.params.id) } })
        .then(async project => {
            projectRepository.delete({ id: Number(project.id) })
            response.sendStatus(200)
        }).catch(error => response.sendStatus(400))
})
export default router
