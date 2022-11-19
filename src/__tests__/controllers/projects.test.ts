import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { In } from 'typeorm'
import app from '../../app'
import Project from '../../entity/Project'
import User from '../../entity/User'
import { AppDataSource } from '../../utils/dbHelper'

const projectRepository = AppDataSource.getRepository(Project)
const userRepository = AppDataSource.getRepository(User)

beforeEach(async () => {
    if (!AppDataSource.isInitialized)
        await AppDataSource.initialize()
})

afterEach(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
})

describe('GET /projects', () => {
    it('should display list of projects in JSON format', async () => {
        const response = await request(app).get('/projects')
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
    })

    it('should display details of single Project', async () => {
        let project: Project = await projectRepository.save(
            { title: "Quaterly reviews" }
        )

        const response = await request(app)
            .get(`/projects/${project.id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe(project.title)
    })
})

describe('POST /projects', () => {
    it('should allow the creation of project and return entity', async () => {
        const response = await request(app)
            .post("/projects")
            .send({ title: "Compliance audit" })

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
        expect(response.body.id).toBeGreaterThan(0)
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

    })

    it('should not allow project creation when title is missing', async () => {

        const response = await request(app)
            .post("/projects")
            .send({})

        expect(response.statusCode).toBe(400)

    })
})

describe('PUT /projects/:id', () => {
    it('should update Project and return an ID', async () => {
        let project: Project = await projectRepository.save(
            { title: "International Women Day" }
        )

        const response = await request(app)
            .put(`/projects/${project.id}`)
            .send({ title: 'Org-wide Holidays' })
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeGreaterThan(0)

        let updatedProject = await projectRepository.findOne({ where: { id: project.id } })
        expect(updatedProject?.title).toBe('Org-wide Holidays')

    })

    it('should attach users to Project on update', async () => {

        let users: User[] = []
        let userIds: number[] = []

        // create Project with no members
        let project: Project = await projectRepository.save(
            { title: "International Women Day" }
        )

        // Prepare new members
        users.push(await userRepository.save({ email: 'one@doe.com', password: 'one@doe.com' }))
        users.push(await userRepository.save({ email: 'two@doe.com', password: 'two@doe.com' }))
        userIds = users.map(user => user.id)

        // Update Project
        const payLoad = { title: 'Compliance audit', members: userIds }
        const response = await request(app).put(`/projects/${project.id}`).send(payLoad)

        // Check API response and value of updated Project
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
        expect(response.body.members).toHaveLength(userIds.length)

    })
})

describe('DELETE /projects/:id', () => {
    it('should delete Project and return 200', async () => {
        let project: Project = await projectRepository.save(
            { title: "International Women Day" }
        )

        const response = await request(app).delete(`/projects/${project.id}`)
        expect(response.statusCode).toBe(200)

    })
})