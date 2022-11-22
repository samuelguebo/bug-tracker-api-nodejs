// Applying authentication to specific endpoints
import { NextFunction, Request, Response, Router } from 'express'
import jsonwebtoken, { sign } from 'jsonwebtoken'
import { accessControlPolicy as roles } from '../config/accessControlPolicy'
import User from '../entity/User'
import { AppDataSource } from './dbService'

// Protecting path
const authenticateJWT = async (request: Request, response: Response, next: NextFunction) => {

    const token =
        request.body.token || request.query.token || request.headers["x-access-token"]

    if (!token) {
        console.log("A token is required for authentication")
        return response.status(403).send("A token is required for authentication")
    }
    try {
        const { verify } = jsonwebtoken
        const decoded: {} = verify(token, process.env.AUTH_SECRET)

        // Apply Attribute-Based Access Control
        let user: User = await AppDataSource.getRepository(User)
            .findOne({ where: { id: decoded["userId"] } })

        const isAuthorized = verifyUserAuthorization(user, request)
        if (!isAuthorized)
            return response.status(403).send({ error: "Resource not allowed." })

    } catch (err) {
        return response.status(401).send({ error: "Invalid Token" })
    }

    return next()
}

export const generateJWT = (user: User) => sign({ userId: user.id }, process.env.AUTH_SECRET, {
    expiresIn: 24 * 60  // expires in 24 hours
})

export const verifyUserAuthorization = (user: User, request: Request): Boolean => {
    // Check whether user has appropriate role
    if (!(user.role in roles))
        return false

    // Check HTTP attribute
    if (!(roles[user.role].actions.includes(request.method)))
        return false

    // Check resource
    const resource = request.baseUrl.replace('/', '')
    const roleResources = roles[user.role].resources
    const isAdmin = roleResources.includes("*")

    const canAccessResource = roleResources.includes(resource)
    if (!(isAdmin) && !(canAccessResource))
        return false

    return true
}

export default authenticateJWT