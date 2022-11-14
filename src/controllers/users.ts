import { Router, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
const router = Router()

// Importing model
import User from '../entity/User'
import utils from '../utils/utils'

// Create
router.post('/', function (request: Request, response: Response) {
    if (!request.body.email) {
        response.json(
            {
                success: false,
                message: 'No email address'
            }
        )
    }

    // Inserting the row into the DB, but hash password first
    utils.hashPassword(request.body.password)
        .then(async hash => {
            request.body.password = hash
            let user: User = await AppDataSource.getRepository(User).save(request.body)
            response.send(user)
        }).catch(err => {
            response.status(500).send({ error: `Could not create the user ${err}` })
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

// Get

router.get('/', function (request: Request, response: Response) {

    AppDataSource.getRepository(User).find({ take: 5 }).then(users => {
        response.status(200).send(users)
    }).catch(error => {
        console.log(error)
    })

})

export default router