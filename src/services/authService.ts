// Applying authentication to specific endpoints
import { NextFunction, Request, Response, Router } from 'express'
import jsonwebtoken, { sign } from 'jsonwebtoken'
import User from '../entity/User'
const { verify } = jsonwebtoken
const router = Router()


// Protecting path
const authenticateJWT = (request: Request, response: Response, next: NextFunction) => {
    /**
     * TODO: Apply RBAC for data modifying operations 
     */
    const token =
        request.body.token || request.query.token || request.headers["x-access-token"]

    if (!token) {
        console.log("A token is required for authentication")
        return response.status(403).send("A token is required for authentication")
    }
    try {
        const decoded = verify(token, process.env.AUTH_SECRET)
        request["decoded"] = decoded
    } catch (err) {
        return response.status(401).send("Invalid Token")
    }

    return next()
}

export const generateJWT = () => sign({ admin: true }, process.env.AUTH_SECRET, {
    expiresIn: 24 * 60  // expires in 24 hours
})


export default authenticateJWT