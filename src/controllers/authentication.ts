import { Router } from 'express'
import User from '../entity/User'
import jsonwebtoken from 'jsonwebtoken'
import utils from '../utils/utils'
import { AppDataSource } from '../utils/dbHelper'

const { sign } = jsonwebtoken
const router = Router()

// Authentication
router.post('/', async function (request, response) {
    try {

        const user: User = await AppDataSource.manager.findOne(User, { where: { email: request.body.email } })
        if (!user) {
            response.status(404).send({ message: "Authentication failed, no User found" })
        }

        // Check the password now
        console.log(`comparing ${request.body.password} and ${user.password}`)
        const isSame = await utils.compareHash(request.body.password, user.password)

        if (isSame === false) {
            response.status(403).send({ success: false, message: "Authentication failed, password do not match" })
        } else {
            // If no error showed up, generate the token
            var token = sign({ admin: true }, process.env.AUTH_SECRET, {
                expiresIn: 24 * 60  // expires in 24 hours
            })

            response.send({
                token: token
            })
        }

    } catch (error) {
        response.status(500).send(error)
    }

})
export default router