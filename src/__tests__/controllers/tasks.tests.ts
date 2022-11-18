import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import app from '../../app'
import Project from '../../entity/Project'
import Task from '../../entity/Task'
import User from '../../entity/User'
import { AppDataSource, initializeDatabase } from '../../utils/dbHelper'
import { initializeTestDatabase, TestDataSource } from '../../utils/testHelper'

const userRepository = AppDataSource.getRepository(User)
const projectRepository = AppDataSource.getRepository(Project)
const taskRepository = AppDataSource.getRepository(Task)

const mockEntities = async () => {
    let project: Project
    let user: User
    let task: Task

    project = await projectRepository.save({ ...project, title: 'December holidays' })
    user = await userRepository.save({ ...user, email: 'anna@doe.com', password: 'anna@doe.com' })
    task = await taskRepository.save({ ...task, title: 'Send gift cards to employees', author: user })

    return { project, user, task }
}

const deleteMockEntities = async ({ project, user, task }) => {
    await userRepository.delete(user.id)
    await projectRepository.delete(project.id)
    await taskRepository.delete(task.id)

}

beforeAll(async () => {
    await AppDataSource.initialize()
})



describe('GET /tasks', () => {
    it('should display list of tasks in JSON format', async () => {
        const response = await request(app).get('/tasks')
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
    })

    it('should display details of single task', async () => {

        const { project, user, task } = await mockEntities()

        const response = await request(app)
            .get(`/tasks/${task.id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toBe(task.title)


        // Delete recently created data
        await deleteMockEntities({ project, user, task })
    })
})

describe('POST /tasks', () => {
    it('should allow the creation of task and return entity', async () => {
        // Get mocks
        let { project, user, task } = await mockEntities()

        // Make HTTP request
        const response = await request(app)
            .post('/tasks')
            .send({
                author: user.id,
                title: task.title
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.priority).toBe('low')

        // Delete recently created data
        await taskRepository.delete(response.body.id)
        await deleteMockEntities({ project, user, task })
    })

    it('should not allow task creation when author ID is missing', async () => {
        const { project, user, task } = await mockEntities()

        const response = await request(app)
            .post('/tasks')
            .send({ title: task.title })

        expect(response.statusCode).toBe(400)

        // Delete recently created data
        await deleteMockEntities({ project, user, task })
    })
})


describe('PUT /tasks/:id', () => {
    it('should allow the update of task and return an ID', async () => {

        // Get mocks
        const { task, project, user } = await mockEntities()

        // Make HTTP query
        const response = await request(app)
            .put(`/tasks/${task.id}`)
            .send({
                author: user.id,
                title: 'An update is usually a good thing!'
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeGreaterThan(0)

        let updatedTask = await taskRepository
            .findOne({ where: { id: task.id } })
        expect(updatedTask.title).toBe('An update is usually a good thing!')

        // Delete recently created data
        await deleteMockEntities({ project, user, task })
    })

})


describe('DELETE /tasks/:id', () => {
    it('should allow the deletion of task and return 200', async () => {
        const { project, user, task } = await mockEntities()


        const response = await request(app).delete(`/tasks/${task.id}`)
        expect(response.statusCode).toBe(200)

        // Delete recently created data
        await deleteMockEntities({ project, user, task })
    })

})