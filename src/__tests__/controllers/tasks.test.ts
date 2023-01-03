import { describe, expect } from '@jest/globals'
import request from 'supertest'
import app from '../../app'
import Project from '../../entity/Project'
import Task from '../../entity/Task'
import User from '../../entity/User'
import { generateJWT } from '../../services/authService'
import { AppDataSource } from '../../services/dbService'

const userRepository = AppDataSource.getRepository(User)
const projectRepository = AppDataSource.getRepository(Project)
const taskRepository = AppDataSource.getRepository(Task)

const mockEntities = async () => {
    let project: Project = new Project
    let user: User = new User
    let task: Task = new Task
    let token: string

    project = await projectRepository.save({ ...project, title: 'December holidays' })
    user = await userRepository.save({ ...user, email: 'anna@doe.com', password: 'anna@doe.com', role: "admin" })
    task = await taskRepository.save({ ...task, title: 'Send gift cards to employees', author: user })
    token = generateJWT(user)

    return { project, user, task, token }
}

beforeEach(async () => {
    if (!AppDataSource.isInitialized)
        await AppDataSource.initialize()
})

afterEach(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
})

describe('GET /tasks', () => {
    it('should display list of tasks in JSON format', async () => {
        const { token } = await mockEntities()
        const response = await request(app)
            .get('/tasks')
            .set({ "x-access-token": token })
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
    })

    it('should display details of single task', async () => {

        const { task, token } = await mockEntities()
        const response = await request(app)
            .get(`/tasks/${task.id}`)
            .set({ "x-access-token": token })
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe(task.title)

    })
})

describe('POST /tasks', () => {
    it('should allow the creation of task and return entity', async () => {
        // Get mocks
        let { user, task, token } = await mockEntities()

        // Make HTTP request
        const response = await request(app)
            .post('/tasks')
            .set({ "x-access-token": token })
            .send({
                author: user.id,
                title: task.title
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.priority).toBe('low')

    })

    it('should not allow task creation when author ID is missing', async () => {
        const { task, token } = await mockEntities()
        const response = await request(app)
            .post('/tasks')
            .set({ "x-access-token": token })
            .send({ title: task.title })

        expect(response.statusCode).toBe(400)

    })


    it('should attach projects to task', async () => {

        // Get mocks
        let { project, user, task, token } = await mockEntities()

        // Make HTTP request
        let response = await request(app)
            .post('/tasks')
            .set({ "x-access-token": token })
            .send({
                author: user.id,
                title: task.title,
                projects: [project.id]
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.priority).toBe('low')

        // Check whether task endpoint displays added project
        response = await request(app)
            .get(`/tasks/${response.body.id}`)
            .set({ "x-access-token": token })

        expect(response.statusCode).toBe(200)
        expect(response.body.projects?.length).toBe(1)

        // Check whether project endpoint displays added task
        response = await request(app)
            .get(`/projects/${project.id}`)
            .set({ "x-access-token": token })

        expect(response.statusCode).toBe(200)
        expect(response.body.tasks?.length).toBe(1)
    })

    it('should attach collaborators to task', async () => {

        // Get mocks
        let { user, task, token } = await mockEntities()

        // Make HTTP request
        let response = await request(app)
            .post('/tasks')
            .set({ "x-access-token": token })
            .send({
                author: user.id,
                title: task.title,
                collaborators: [user.id]
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.priority).toBe('low')

        // Check whether task endpoint displays added collaborator
        response = await request(app)
            .get(`/tasks/${response.body.id}`)
            .set({ "x-access-token": token })

        expect(response.statusCode).toBe(200)
        expect(response.body.collaborators.length).toBe(1)

    })
})

describe('PUT /tasks/:id', () => {
    it('should allow the update of task and return an ID', async () => {

        // Get mocks
        const { task, user, project, token } = await mockEntities()

        // Make HTTP query
        let response = await request(app)
            .put(`/tasks/${task.id}`)
            .set({ "x-access-token": token })
            .send({
                author: user.id,
                title: 'An update is usually a good thing!',
                projects: [project.id],
                collaborators: [user.id],
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeGreaterThan(0)

        // Check whether task endpoint displays added project
        response = await request(app)
            .get(`/tasks/${response.body.id}`)
            .set({ "x-access-token": token })

        expect(response.statusCode).toBe(200)
        expect(response.body.projects?.length).toBe(1)

        // Check whether project endpoint displays added task
        response = await request(app)
            .get(`/projects/${project.id}`)
            .set({ "x-access-token": token })

        expect(response.statusCode).toBe(200)
        expect(response.body.tasks?.length).toBe(1)
    })

    it('should update task if we attach collaborators and projects ', async () => {

        // Get mocks
        const { task, user, project, token } = await mockEntities()

        // Make HTTP query
        let response = await request(app)
            .put(`/tasks/${task.id}`)
            .set({ "x-access-token": token })
            .send({
                author: user.id,
                title: 'An update is usually a good thing!',
                projects: [project.id],
                collaborators: [user.id],
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeGreaterThan(0)

        // Check whether task endpoint displays added project
        response = await request(app)
            .get(`/tasks/${response.body.id}`)
            .set({ "x-access-token": token })

        expect(response.statusCode).toBe(200)
        expect(response.body.projects?.length).toBe(1)

        // Check whether project endpoint displays added task
        response = await request(app)
            .get(`/projects/${project.id}`)
            .set({ "x-access-token": token })

        expect(response.statusCode).toBe(200)
        expect(response.body.tasks?.length).toBe(1)
    })

})

describe('DELETE /tasks/:id', () => {
    it('should allow the deletion of task and return 200', async () => {
        const { task, token } = await mockEntities()
        const response = await request(app)
            .delete(`/tasks/${task.id}`)
            .set({ "x-access-token": token })
        expect(response.statusCode).toBe(200)

    })

    it('should allow cascaded deletion when parent project is deleted', async () => {
        // Get mocks
        let { project, user, task, token } = await mockEntities()

        // Make HTTP request
        let response = await request(app)
            .post('/tasks')
            .set({ "x-access-token": token })
            .send({
                author: user.id,
                title: task.title,
                projects: [project.id]
            })
        expect(response.statusCode).toBe(200)
        expect(response.body.priority).toBe('low')

        // Second HTTP request, attemtpt deletion
        response = await request(app)
            .delete(`/projects/${project.id}`)
            .set({ "x-access-token": token })
        expect(response.statusCode).toBe(200)

    })
})