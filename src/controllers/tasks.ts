import { Request, Response, Router } from 'express'
import { AppDataSource } from '../data-source'
import Task from '../entity/Task'
const router = Router()

// List
router.get('/', function (request: Request, response: Response) {

    // Finding 10 records
    AppDataSource.getRepository(Task).find({ take: 10 }).then(tasks => {
        response.send(tasks)
    }).catch(err => {
        response.status(500).send(err)
    })

})

// Read 
router.get('/:id', function (request: Request, response: Response) {
    // TODO
    response.status(404).send({ error: "Undefined route" })
})

// Create
router.post('/', async function (request: Request, response: Response) {

    // Inserting the row into the DB
    AppDataSource.getRepository(Task).save(request.body).then(task => {
        response.send(task)
    }).catch(err => {
        response.status(500).send(
            { error: "Task could not be created" }
        )
    })

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