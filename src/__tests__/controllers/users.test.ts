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
        expect(response.statusCode).toBe(403)

    })
})


