import { Request, Response, Router } from 'express'
import { AppDataSource } from '../data-source'

// Importing model
import Project from '../entity/Project'

const router = Router()
const projectRepository = AppDataSource.getRepository(Project)

// Create
router.post('/', async function (request: Request, response: Response) {
    if (!request.body.title) {
        return response.status(403).send({ error: 'No title address provided.' })
    }

    // Inserting the row into the DB
    projectRepository.save(request.body)
        .then(project => {
            response.send({ id: project.id })
        }).catch(err => {
            response.status(500).send({ error: `Could not create the project, ${err}` })
        })

})
// List
router.get('/', function (request: Request, response: Response) {

    projectRepository.find({ take: 10 })
        .then(projects => {
            response.send(projects)
        })
        .catch(err => {
            response.status(404).send({ error: "Could not find any projects." })
        })
})

// Read 
router.get('/:id', function (request, response) {
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
router.put('/:id', function (request, response) {
    // TODO
    response.status(404).send({ error: "Undefined route" })
})

// Delete
router.delete('/:id', function (request, response) {
    // TODO
    response.status(404).send({ error: "Undefined route" })
})
export default router
