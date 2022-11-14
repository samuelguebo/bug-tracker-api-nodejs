// Applying authentication to specific endpoints
import { Request, Response, Router } from 'express'
import jsonwebtoken from 'jsonwebtoken'
const { verify } = jsonwebtoken
const router = Router()


// Protecting /projects path
router.use('/projects', function (request: Request, response: Response, next) {
    const token =
        request.body.token || request.query.token || request.headers["x-access-token"]

    if (!token) {
        return response.status(403).send("A token is required for authentication")
    }
    try {
        const decoded = verify(token, process.env.AUTH_SECRET)
        request["user"] = decoded
    } catch (err) {
        return response.status(401).send("Invalid Token")
    }
    return next()
})

export default router