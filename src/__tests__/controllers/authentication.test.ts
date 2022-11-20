import { describe, expect, test } from '@jest/globals'
import { min } from 'moment'
import request from 'supertest'
import app from '../../app'
import User from '../../entity/User'
import { AppDataSource } from '../../services/dbService'
import utils from '../../services/passwordService'

const userRepository = AppDataSource.getRepository(User)

beforeEach(async () => {
    if (!AppDataSource.isInitialized)
        await AppDataSource.initialize()
})

afterEach(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
})


describe('POST /signup', () => {
    it('should allow the creation of user and return an ID', async () => {
        const response = await request(app)
            .post("/signup")
            .send({ email: "cecile@doe.com", password: "cecile@doe.com" })
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeGreaterThan(0)

    })

    it('should not allow user creation when email is missing', async () => {

        const response = await request(app)
            .post("/signup")
            .send({ firstName: 'Marie Cecile', password: "cecile@doe.com" })
        expect(response.statusCode).toBe(400)

    })
})


describe('POST /login', () => {
    it('should generate and return a token', async () => {
        const plaintextPassword = "cecile"
        const passwordHash = await utils.hashPassword(plaintextPassword)
        const user: User = await userRepository.save({
            email: 'cecile@doe.com', password: passwordHash
        })
        const response = await request(app)
            .post("/login")
            .send({ email: user.email, password: plaintextPassword })
        expect(response.statusCode).toBe(200)
        expect(response.body.token.length).toBeGreaterThan(10)

    })

    it('should not generate a token if login is incorrect', async () => {
        const user: User = await userRepository.save({
            email: 'cecile@doe.com', password: "cecile"
        })
        const response = await request(app)
            .post("/login")
            .send({ email: user.email, password: "NotCecile" })
        expect(response.statusCode).toBe(403)
    })
})
