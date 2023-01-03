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
        let project: Project = new Project
        project = { ...project, ...request.body }

        // Attach members, if applicable
        if (request.body.members !== undefined) {
            project.members = await userRepository.find({
                where: { id: In(request.body.members) }
            })
        }

        // Persist and return entity
        projectRepository.save(project).then(new_project => {
            response.send(new_project)
        }).catch(err => {
            response.status(500).send({ error: `${err}` })
        })

    })

// Get list of projects
router.get('/', (request: Request, response: Response) => {

    projectRepository.find({ relations: ['members'] })
        .then(projects => response.send(projects))
        .catch(() => {
            response.status(404).send({ error: "Could not find any projects." })
        })
})


// Get a projects by user
router.get('/user/:id',
    param('id').isNumeric(),
    function (request: Request, response: Response) {
        userRepository.findOne({
            where: { id: Number(request.params.id) },
            relations: ['projects'],
            select: ['id', 'projects']
        })
            .then(project => {
                response.status(200).send(project)
            }).catch(error => response.status(400).send({ error: error }))
    }
)

// Get a project details
router.get('/:id',
    param('id').isNumeric(),
    function (request: Request, response: Response) {

        projectRepository.findOne({
            where: { id: Number(request.params.id) },
            relations: ['tasks', 'members'],
            select: ['id', 'description', 'title', 'members']
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
    body('members').optional().isArray(),
    async (request: Request, response: Response) => {

        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        projectRepository.findOne({
            where: { id: Number(request.params.id) }
        }).then(async project => {

            if (!project) {
                throw Error("Project does not exist.")
            }

            // Update basic fields
            const existingProject = await projectRepository.preload(project)

            // Update members, if applicable
            if (request.body.members !== undefined) {
                request.body.members = await userRepository.find({
                    where: { id: In(request.body.members) }
                })
            }

            // Persist and return entity
            const new_project = await projectRepository.save({ ...existingProject, ...request.body })
            response.send(new_project)
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
                await projectRepository.delete({ id: Number(project?.id) })
                response.sendStatus(200)
            }).catch(error => {
                console.log(error)
                response.sendStatus(400)
            })
    }
)

export default router
