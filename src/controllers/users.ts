import { Router, Request, Response } from 'express'
import { body, param, validationResult } from 'express-validator'
import utils from '../utils/utils'
import User from '../entity/User'
import { AppDataSource } from '../utils/dbHelper'

const router = Router()
const userRepository = AppDataSource.getRepository(User)

// Create
router.post('/',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    function (request: Request, response: Response,
    ) {
        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // Inserting the row into the DB, but hash password first
        utils.hashPassword(request.body.password)
            .then(async hash => {
                request.body.password = hash
                let user: User = await userRepository.save(request.body)
                response.send({ id: user.id })
            }).catch(err => {
                response.status(500).send({ error: `${err}` })
            })

    }
)

// Get All
router.get('/', function (request: Request, response: Response) {

    userRepository.find({ take: 5 }).then(users => {
        response.status(200).send(users.map(user => user.id))
    }).catch(error => {
        console.log(error)
    })

})

// Get single user 
router.put('/:id',
    param('id').isNumeric(),
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 }),
    function (request: Request, response: Response) {
        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        userRepository.findOne({
            where: { id: Number(request.params.id) },
            select: ['id', 'email', 'firstName', 'lastName']
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
        userRepository.findOne({ where: { id: Number(request.params.id) } })
            .then(async user => {
                response.status(200).send({ id: user.id, email: user.email, })
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