import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import app from '../../app'
import Project from '../../entity/Project'
import Task from '../../entity/Task'
import User from '../../entity/User'
import { generateJWT } from '../../services/authService'
import { AppDataSource } from '../../services/dbService'

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

const mockEntities = async () => {
    let project: Project = new Project
    let user: User = new User
    let task: Task = new Task
    let token: string
    let users: User[] = []
    let userIds: number[] = []

    users.push(await userRepository.save({
        email: 'one@doe.com', password: 'one@doe.com'
    }))
    users.push(await userRepository.save({
        email: 'two@doe.com', password: 'two@doe.com'
    }))

    userIds = users.map(user => user.id)
    project = await projectRepository.save({
        ...project, title: 'December holidays'
    })
    user = await userRepository.save({
        ...user, email: 'anna@doe.com', password: 'anna@doe.com', role: "admin"
    })
    token = generateJWT(user)

    return { project, user, task, userIds, token }
}

describe('GET /projects', () => {
    it('should display list of projects in JSON format', async () => {
        const { token } = await mockEntities()
        const response = await request(app)
            .get('/projects')
            .set({ "x-access-token": token })
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
    })

    it('should display details of single Project', async () => {
        const { project, userIds, token } = await mockEntities()

        const response = await request(app)
            .get(`/projects/${project.id}`)
            .set({ "x-access-token": token })
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe(project.title)
    })
})

describe('POST /projects', () => {
    it('should allow the creation of project and return entity', async () => {
        const { token } = await mockEntities()
        const response = await request(app)
            .post("/projects")
            .set({ "x-access-token": token })
            .send({ title: "Compliance audit" })

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
        expect(response.body.id).toBeGreaterThan(0)
    })

    it('should attach users to projects as members', async () => {

        const { userIds, token, project } = await mockEntities()
        const payLoad = { title: 'Compliance audit', members: userIds }

        let response = await request(app)
            .post("/projects")
            .set({ "x-access-token": token })
            .send(payLoad)

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
        expect(response.body.id).toBeGreaterThan(0)

        // Check whether project endpoint displays added task
        response = await request(app)
            .get(`/projects/${response.body.id}`)
            .set({ "x-access-token": token })

        expect(response.statusCode).toBe(200)
        expect(response.body.members.length).toBe(userIds.length)

    })

    it('should not allow project creation when title is missing', async () => {
        const { token } = await mockEntities()
        const response = await request(app)
            .post("/projects")
            .set({ "x-access-token": token })
            .send({})

        expect(response.statusCode).toBe(400)

    })
})

describe('PUT /projects/:id', () => {
    it('should update Project and return an ID', async () => {
        const { project, token, userIds } = await mockEntities()

        let response = await request(app)
            .put(`/projects/${project.id}`)
            .set({ "x-access-token": token })
            .send({ title: 'Org-wide Holidays' })
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeGreaterThan(0)

    })

    it('should attach users to Project on update', async () => {

        const { project, userIds, token } = await mockEntities()

        // Update Project
        const payLoad = { title: 'Compliance audit', members: userIds }
        let response = await request(app)
            .put(`/projects/${project.id}`)
            .set({ "x-access-token": token })
            .send(payLoad)

        // Check API response and value of updated Project
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')

        // Check whether project endpoint displays added task
        response = await request(app)
            .get(`/projects/${project.id}`)
            .set({ "x-access-token": token })

        expect(response.statusCode).toBe(200)
        expect(response.body.members.length).toBe(userIds.length)

    })
})

describe('DELETE /projects/:id', () => {
    it('should delete Project and return 200', async () => {
        const { project, token } = await mockEntities()

        const response = await request(app)
            .delete(`/projects/${project.id}`)
            .set({ "x-access-token": token })
        expect(response.statusCode).toBe(200)

    })
})