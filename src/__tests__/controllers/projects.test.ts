import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { In } from 'typeorm'
import app from '../../app'
import { AppDataSource } from '../../data-source'
import Project from '../../entity/Project'
import User from '../../entity/User'
import { initializeDatabase } from '../../utils/dbHelper'

const projectRepository = AppDataSource.getRepository(Project)
const userRepository = AppDataSource.getRepository(User)

beforeAll(async () => {
    await initializeDatabase()
})

describe('GET /projects', () => {
    it('should display list of projects in JSON format', async () => {
        const response = await request(app).get('/projects')
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
    })
})

describe('POST /projects', () => {
    it('should allow the creation of project and return an ID', async () => {
        const response = await request(app)
            .post("/projects")
            .send({ title: "Compliance audit" })

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
        expect(response.body.id).toBeGreaterThan(0)

        // Delete recently created User
        await projectRepository.delete({ id: response.body.id })

    })

    it('should attach users to projects as members', async () => {

        let users: User[] = []
        let userIds: number[] = []

        users.push(await userRepository.save({ email: 'one@doe.com', password: 'one@doe.com' }))
        users.push(await userRepository.save({ email: 'two@doe.com', password: 'two@doe.com' }))

        userIds = users.map(user => user.id)
        const payLoad = { title: 'Compliance audit', members: userIds }
        const response = await request(app).post("/projects").send(payLoad)

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
        expect(response.body.id).toBeGreaterThan(0)

        // Delete recently created Project and Users
        await projectRepository.delete({ id: response.body.id })
        await userRepository.delete({ id: In(userIds) })

    })

    it('should not allow project creation when title is missing', async () => {

        const response = await request(app)
            .post("/projects")
            .send({})

        expect(response.statusCode).toBe(400)

    })
})


