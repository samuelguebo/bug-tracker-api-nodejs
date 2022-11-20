import { Request, Response, Router } from 'express'
import User from '../entity/User'
import jsonwebtoken from 'jsonwebtoken'
import utils from '../services/passwordService'
import { AppDataSource } from '../services/dbService'
import { body, validationResult } from 'express-validator'
import { Repository } from 'typeorm'
import { generateJWT } from '../services/authService'

const router = Router()
const userRepository: Repository<User> = AppDataSource.getRepository(User)

// Authentication
router.post('/login', async function (request, response) {
    try {

        const user: User = await userRepository.findOne(
            {
                where: { email: request.body.email },
                select: ['password']
            })

        if (!user) {
            return response.status(404).send({ message: "Authentication failed, no User found" })
        }

        // Check the password now
        // console.log(`comparing ${request.body.password} and ${user.password}`)
        const isSame = await utils.compareHash(request.body.password, user.password)
        const token = generateJWT()
        if (isSame === false) {
            return response.status(403).send({ message: "Authentication failed, password do not match" })


        }
        // Otherwise return token
        response.send({
            token: token
        })
    } catch (error) {
        response.status(500).send(error)
    }

})

// Signup
router.post('/signup',
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    async function (request: Request, response: Response,
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
export default router