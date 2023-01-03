import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import app from '../../app'
import User from '../../entity/User'
import { generateJWT } from '../../services/authService'
import { AppDataSource } from '../../services/dbService'

const userRepository = AppDataSource.getRepository(User)

beforeEach(async () => {
    if (!AppDataSource.isInitialized)
        await AppDataSource.initialize()
})

afterEach(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
})

describe('GET /users', () => {

    it('should display list of users in JSON format', async () => {
        let user: User = await userRepository.save(
            { email: "cecile@doe.com", password: "cecile@doe.com", role: "admin" }
        )
        const response = await request(app)
            .get('/users')
            .set({ "x-access-token": generateJWT(user) })
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
    })


    it('should display details of single User', async () => {

        let user: User = await userRepository.save(
            { email: "cecile@doe.com", password: "cecile@doe.com", role: "admin" }
        )

        const response = await request(app)
            .get(`/users/${user.id}`)
            .set({ "x-access-token": generateJWT(user) })
        expect(response.statusCode).toBe(200)
        expect(response.body.email).toBe(user.email)

    })

})

describe('PUT /users/:id', () => {
    it('should allow the update of user and return an ID', async () => {
        let user: User = await userRepository.save(
            { email: "cecile@doe.com", password: "cecile@doe.com", role: "admin" }
        )

        const response = await request(app)
            .put(`/users/${user.id}`)
            .set({ "x-access-token": generateJWT(user) })
            .send({ firstName: 'Cecile', password: "celeste@doe.com", role: "admin" })
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeGreaterThan(0)

        let updatedUser = await userRepository.findOne({ where: { id: user.id } })
        expect(updatedUser?.firstName).toBe('Cecile')

    })

})

describe('DELETE /users/:id', () => {
    it('should allow the deletion of user and return 200', async () => {
        let user: User = await userRepository.save(
            { email: "cecile@doe.com", password: "cecile@doe.com", role: "admin" }
        )

        const response = await request(app)
            .delete(`/users/${user.id}`)
            .set({ "x-access-token": generateJWT(user) })
        expect(response.statusCode).toBe(200)

    })

})
