import { describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { EntityMetadata } from 'typeorm'
import app from '../../app'
import Comment from '../../entity/Comment'
import Project from '../../entity/Project'
import Task from '../../entity/Task'
import User from '../../entity/User'
import { AppDataSource } from '../../utils/dbHelper'

const commentRepository = AppDataSource.getRepository(Comment)
const userRepository = AppDataSource.getRepository(User)
const projectRepository = AppDataSource.getRepository(Project)
const taskRepository = AppDataSource.getRepository(Task)

const mockEntities = async () => {

    let project: Project
    let user: User
    let comment: Comment
    let task: Task

    project = await projectRepository.save({ ...project, title: 'December holidays' })
    user = await userRepository.save({ ...user, email: 'anna@doe.com', password: 'anna@doe.com' })
    task = await taskRepository.save({ ...task, title: 'Send gift cards to employees', author: user })

    comment = await commentRepository.save({
        ...comment, content: 'what a lovely idea!', author: user, task: task
    })

    return { project, user, task, comment }
}

const deleteMockEntities = async ({ project, user, task, comment }) => {
    await commentRepository.delete(comment.id)
    await taskRepository.delete(task.id)
    await projectRepository.delete(project.id)
    await userRepository.delete(user.id)

}

beforeAll(async () => {
    await AppDataSource.initialize()
})


describe('GET /comments', () => {
    it('should display list of comments in JSON format', async () => {
        const response = await request(app).get('/comments')
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('json')
    })

    it('should display details of single Comment', async () => {

        const { project, user, task, comment } = await mockEntities()

        const response = await request(app)
            .get(`/comments/${comment.id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.content).toBe(comment.content)


        // Delete recently created data
        await deleteMockEntities({ project, user, task, comment })
    })
})


describe('POST /comments', () => {
    it('should allow the creation of comment and return entity', async () => {
        // Get mocks
        const { project, user, task, comment } = await mockEntities()

        // Make HTTP request
        const response = await request(app)
            .post('/comments')
            .send({
                task: comment.task.id,
                author: comment.author.id,
                content: comment.content
            })

        expect(response.statusCode).toBe(200)
        expect(response.body.content).toBe(comment.content)

        // Delete recently created data
        await deleteMockEntities({ project, user, task, comment })
    })

    it('should not allow comment creation when task ID is missing', async () => {
        const { project, user, task, comment } = await mockEntities()

        const response = await request(app)
            .post('/comments')
            .send({
                author: comment.author.id,
                content: comment.content
            })

        expect(response.statusCode).toBe(400)
        await deleteMockEntities({ project, user, task, comment })
    })
})


describe('PUT /comments/:id', () => {
    it('should allow the update of comment and return an ID', async () => {

        // Get mocks
        const { task, project, user, comment } = await mockEntities()

        // Make HTTP query
        const response = await request(app)
            .put(`/comments/${comment.id}`)
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
        expect(updatedComment.content).toBe('An update is usually a good thing!')

        // Delete recently created data
        await deleteMockEntities({ project, user, task, comment })
    })

})

describe('DELETE /comments/:id', () => {
    it('should allow the deletion of comment and return 200', async () => {
        const { project, user, task, comment } = await mockEntities()


        const response = await request(app).delete(`/comments/${comment.id}`)
        expect(response.statusCode).toBe(200)

        // Delete recently created data
        await deleteMockEntities({ project, user, task, comment })
    })

})

