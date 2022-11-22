import { Request } from "express"
import User from "../../entity/User"
import { verifyUserAuthorization } from "../../services/authService"

describe('Role-Based Access Control', () => {

    it('should not allow member to update or delete resource', async () => {
        let user: User = {} as User
        let req: Request = {} as Request
        user.role = 'member'
        req.baseUrl = '/users'
        req.method = 'UPDATE'
        const isAllowed: Boolean = await verifyUserAuthorization(user, req)
        expect(isAllowed).toBe(false)
    })

    it('should allow member to post a comment', async () => {
        let user: User = {} as User
        let req: Request = {} as Request
        user.role = 'member'
        req.baseUrl = '/comments'
        req.method = 'POST'
        const isAllowed: Boolean = await verifyUserAuthorization(user, req)
        expect(isAllowed).toBe(true)
    })

    it('should allow guest to view a task', async () => {
        let user: User = {} as User
        let req: Request = {} as Request
        user.role = 'guest'
        req.baseUrl = '/tasks'
        req.method = 'GET'
        const isAllowed: Boolean = await verifyUserAuthorization(user, req)
        expect(isAllowed).toBe(true)
    })

    it('should allow admin to post a comment', async () => {
        let user: User = {} as User
        let req: Request = {} as Request
        user.role = 'admin'
        req.baseUrl = '/comments'
        req.method = 'POST'
        const isAllowed: Boolean = await verifyUserAuthorization(user, req)
        expect(isAllowed).toBe(true)
    })

    it('should allow admin to delete a project', async () => {
        let user: User = {} as User
        let req: Request = {} as Request
        user.role = 'admin'
        req.baseUrl = '/projects'
        req.method = 'DELETE'
        const isAllowed: Boolean = await verifyUserAuthorization(user, req)
        expect(isAllowed).toBe(true)
    })

    it('should allow admin to update a user', async () => {
        let user: User = {} as User
        let req: Request = {} as Request
        user.role = 'admin'
        req.baseUrl = '/users'
        req.method = 'PUT'
        const isAllowed: Boolean = await verifyUserAuthorization(user, req)
        expect(isAllowed).toBe(true)
    })
})