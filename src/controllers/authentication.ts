import { Request, Response, Router } from 'express'
import User from '../entity/User'
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
        const user = await userRepository.findOne(
            {
                where: { email: request.body.email },
                select: ['id', 'password', 'role', 'email', 'firstName', 'avatar']
            })

        if (!user) {
            return response.status(404).send({ message: msgNoUserFound })
        }

        // Check the password now
        const isSame = await utils.compareHash(request.body.password, user.password)
        const token = generateJWT(user)
        if (isSame === false) {
            return response.status(403).send({
                message: msgWrongPassword
            })
        }
        // Otherwise return payload
        response.send({
            email: user.email,
            token: token,
            role: user.role,
            firstName: user.firstName,
            message: msgLoginSuccess,
            id: user.id,
            avatar: user.avatar
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
            return response.status(400).json({ error: errors.array().toString() });
        }

        // Inserting the row into the DB, but hash password first
        utils.hashPassword(request.body.password)
            .then(async hash => {
                request.body.password = hash
                let user: User = await userRepository.save(request.body)
                response.send({ id: user.id, message: msgSignupSuccess })
            }).catch(err => {
                response.status(500).send({ error: `${err}` })
            })

    }
)
const msgSignupSuccess = 'Account created successfully!'
const msgNoUserFound = "Authentication failed, no User found"
const msgLoginSuccess = "Logged in successfully!"
const msgWrongPassword = "Authentication failed, password do not match"

export default router