import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import app from '../../app'
import Comment from '../../entity/Comment'
import Project from '../../entity/Project'
import Task from '../../entity/Task'
import User from '../../entity/User'
import { generateJWT } from '../../services/authService'
import { AppDataSource } from '../../services/dbService'

const commentRepository = AppDataSource.getRepository(Comment)
const userRepository = AppDataSource.getRepository(User)
const projectRepository = AppDataSource.getRepository(Project)
const taskRepository = AppDataSource.getRepository(Task)

const mockEntities = async () => {

    let project: Project = new Project
    let user: User = new User
    let comment: Comment = new Comment
    let task: Task = new Task

    project = await projectRepository.save({ ...project, title: 'December holidays' })
    user = await userRepository.save({ ...user, email: 'anna@doe.com', password: 'anna@doe.com', role: "admin" })
    task = await taskRepository.save({ ...task, title: 'Send gift cards to employees', author: user })

    comment = await commentRepository.save({
        ...comment, content: 'what a lovely idea!', author: user, task: task
    })

    return { project, user, task, comment }
}

beforeEach(async () => {
    if (!AppDataSource.isInitialized)
        await AppDataSource.initialize()
})

afterEach(async () => {
    await AppDataSource.dropDatabase()
    await AppDataSource.destroy()
})

describe('GET /comments', () => {
    it('should display list of comments in JSON format', async () => {
        const { user } = await mockEntities()
        const response = await request(app)
            .get('/comments')
            .set({ "x-access-token": generateJWT(user) })
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
    })

    it('should display details of single Comment', async () => {

        const { user, comment } = await mockEntities()

        const response = await request(app)
            .get(`/comments/${comment.id}`)
            .set({ "x-access-token": generateJWT(user) })
        expect(response.statusCode).toBe(200)
        expect(response.body.content).toBe(comment.content)

    })
})


describe('POST /comments', () => {
    it('should allow the creation of comment and return entity', async () => {
        // Get mocks
        const { user, comment } = await mockEntities()

        // Make HTTP request
        const response = await request(app)
            .post('/comments')
            .set({ "x-access-token": generateJWT(user) })
            .send({
                task: comment.task.id,
                author: comment.author.id,
                content: comment.content
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.content).toBe(comment.content)

    })

    it('should not allow comment creation when task ID is missing', async () => {
        const { user, comment } = await mockEntities()


    })
})


describe('PUT /comments/:id', () => {
    it('should allow the update of comment and return an ID', async () => {

        // Get mocks
        const { user, comment } = await mockEntities()

        // Make HTTP query
        const response = await request(app)
            .put(`/comments/${comment.id}`)
            .set({ "x-access-token": generateJWT(user) })
            .send({
                task: comment.task.id,
                author: comment.author.id,
                content: 'An update is usually a good thing!'
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBeGreaterThan(0)

        let updatedComment = await commentRepository
            .findOne(
                {
                    where: { id: comment.id }
                })
        expect(updatedComment?.content).toBe('An update is usually a good thing!')
    })

})

describe('DELETE /comments/:id', () => {
    it('should allow the deletion of comment and return 200', async () => {
        const { user, comment } = await mockEntities()

        const response = await request(app)
            .delete(`/comments/${comment.id}`)
            .set({ "x-access-token": generateJWT(user) })
        expect(response.statusCode).toBe(200)

    })

})

