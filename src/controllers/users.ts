import { Router, Request, Response } from 'express'
import { body, param, validationResult } from 'express-validator'
import utils from '../services/passwordService'
import User from '../entity/User'
import { AppDataSource } from '../services/dbService'

const router = Router()
const userRepository = AppDataSource.getRepository(User)

// Get All
router.get('/', function (request: Request, response: Response) {

    userRepository.find({ take: 10 }).then(users => {
        response.status(200).send(users)
    }).catch(error => {
        console.log(error)
    })

})

// Get single user 
router.put('/:id',
    param('id').isNumeric(),
    param('avatar').optional().isNumeric(),
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 }),
    function (request: Request, response: Response) {
        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        userRepository.findOne({
            where: { id: Number(request.params.id) }
        })
            .then(async user => {
                // Handle password change
                if (request.body.password !== undefined) {
                    let hash = await utils.hashPassword(request.body.password)
                    request.body.password = hash
                }
                // Update record
                user = await userRepository.preload(user)
                user = { ...user, ...request.body }
                user = await userRepository.save(user)
                response.status(200).send(user)
            }).catch(error => response.status(400).send({ error: error }))

    }
)

// Get a single User 
router.get('/:id',
    param('id').isNumeric(),
    function (request: Request, response: Response) {
        userRepository.findOne({
            where: { id: Number(request.params.id) }
        })
            .then(async user => {
                response.status(200).send(user)
            }).catch(error => response.status(400).send({ error: error }))
    })

// Delete a single user
router.delete('/:id',
    param('id').isNumeric(),
    function (request: Request, response: Response) {
        userRepository.findOne({ where: { id: Number(request.params.id) } })
            .then(async user => {
                userRepository.delete({ id: Number(user.id) })
                response.sendStatus(200)
            }).catch(error => response.sendStatus(400))
    }
)

export default router