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

// Read 
router.get('/:id', (request: Request, response: Response) => {
    var id = request.params.id

    // Filtering
    if (!id.toString() || id.toString() === "") {
        response.status(500).send(
            { error: "A project must have have an ID" }
        )
    } else {
        // TODO: Find user by id
        response.send(200)
    }
})


// Update 
router.put('/:id', (equest: Request, response: Response) => {
    // TODO
    response.status(404).send({ error: "Undefined route" })
})

// Delete
router.delete('/:id', (equest: Request, response: Response) => {
    // TODO
    response.status(404).send({ error: "Undefined route" })
})
export default router
