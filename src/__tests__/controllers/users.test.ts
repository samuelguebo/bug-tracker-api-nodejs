import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import app from '../../app'
import { AppDataSource } from '../../data-source'
import User from '../../entity/User'
import { initializeDatabase } from '../../utils/dbHelper'

const userRepository = AppDataSource.getRepository(User)

beforeAll(async () => {
    await initializeDatabase()
})

describe('GET /users', () => {
    it('should display list of users in JSON format', async () => {
        const response = await request(app).get('/users')
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
    })

    it('should display details of single User', async () => {
        let user: User = await userRepository.save(
            { email: "cecile@doe.com", password: "cecile@doe.com" }
        )

        const response = await request(app)
            .get(`/users/${user.id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.email).toBe(user.email)

        // Delete recently created User
        await userRepository.delete({ id: user.id })

    })
})

describe('POST /users', () => {
    it('should allow the creation of user and return an ID', async () => {
        const response = await request(app)
            .post("/users")
            .send({ email: "cecile@doe.com", password: "cecile@doe.com" })
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeGreaterThan(0)

        // Delete recently created User
        await userRepository.delete({ id: response.body.id })

    })

    it('should not allow user creation when email is missing', async () => {

        const response = await request(app)
            .post("/users")
            .send({ firstName: 'Marie Cecile', password: "cecile@doe.com" })
        expect(response.statusCode).toBe(400)

    })
})

describe('PUT /users/:id', () => {
    it('should allow the update of user and return an ID', async () => {
        let user: User = await userRepository.save(
            { email: "cecile@doe.com", password: "cecile@doe.com" }
        )

        const response = await request(app)
            .put(`/users/${user.id}`)
            .send({ firstName: 'Cecile', password: "celeste@doe.com" })
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeGreaterThan(0)

        let updatedUser = await userRepository.findOne({ where: { id: user.id } })
        expect(updatedUser.firstName).toBe('Cecile')

        // Delete recently created User
        await userRepository.delete({ id: updatedUser.id })

    })

})

describe('DELETE /users/:id', () => {
    it('should allow the deletion of user and return 200', async () => {
        let user: User = await userRepository.save(
            { email: "cecile@doe.com", password: "cecile@doe.com" }
        )

        const response = await request(app).delete(`/users/${user.id}`)
        expect(response.statusCode).toBe(200)

    })

})
