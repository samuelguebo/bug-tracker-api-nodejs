import { Router, Request, Response } from 'express'
import utils from '../utils/utils'
import User from '../entity/User'
import { AppDataSource } from '../data-source'

const router = Router()
const userRepository = AppDataSource.getRepository(User)

// Create
router.post('/', function (request: Request, response: Response) {
    if (!request.body.email) {
        return response.status(403).send({ error: 'No email address provided.' })
    }

    // Inserting the row into the DB, but hash password first
    utils.hashPassword(request.body.password)
        .then(async hash => {

            let user: User = await userRepository.save(request.body)
            request.body.password = hash
            response.send({ id: user.id })
        }).catch(err => {
            response.status(500).send({ error: `Could not create the user ${err}` })
        })

})

// Get All
router.get('/', function (request: Request, response: Response) {

    userRepository.find({ take: 5 }).then(users => {
        response.status(200).send(users.map(user => user.id))
    }).catch(error => {
        console.log(error)
    })

})

// Update 
router.put('/:id', function (request: Request, response: Response) {
    // TODO
    response.status(404).send({ error: "Undefined route" })
})

// Delete
router.delete('/:id', function (request: Request, response: Response) {
    // TODO
    response.status(404).send({ error: "Undefined route" })
})

export default router