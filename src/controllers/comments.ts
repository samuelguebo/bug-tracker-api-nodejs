import { Router, Request, Response } from 'express'
import { body, param, validationResult } from 'express-validator'
import { AppDataSource } from '../services/dbService'
import Comment from '../entity/Comment'

const router = Router()
const commentRepository = AppDataSource.getRepository(Comment)

// Create
router.post('/',
    body('task').isNumeric(),
    body('author').isNumeric(),
    body('content').isLength({ min: 10 }),
    function (request: Request, response: Response,
    ) {

        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // Persist to DB
        commentRepository.save(request.body).then(comment => {
            response.send(comment)
        }).catch(err => {
            response.status(500).send({ error: `${err}` })
        })

    }
)

// Get All
router.get('/', function (request: Request, response: Response) {

    commentRepository.find({ take: 5 }).then(comments => {
        response.status(200).send(comments.map(comment => comment.id))
    }).catch(error => {
        console.log(error)
    })

})

// Get a single entity 
router.get('/:id',
    param('id').isNumeric(),
    function (request: Request, response: Response) {
        commentRepository.findOne({ where: { id: Number(request.params.id) }, relations: ['author', 'task'] })
            .then(async comment => {
                response.status(200).send(comment)
            }).catch(error => response.status(400).send({ error: error }))
    }
)

// Get single entity 
router.put('/:id',
    param('id').isNumeric(),
    body('task').isNumeric(),
    body('author').isNumeric(),
    body('content').isLength({ min: 10 }),
    function (request: Request, response: Response) {

        // Handle missing fields
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        commentRepository.findOne({
            where: { id: Number(request.params.id) }
        })
            .then(async comment => {

                // Update record
                comment = await commentRepository.preload(comment)
                comment = { ...comment, ...request.body }
                comment = await commentRepository.save(comment)
                response.status(200).send(comment)
            }).catch(error => response.status(400).send({ error: error }))

    }
)

// Delete a single entity
router.delete('/:id',
    param('id').isNumeric(),
    function (request: Request, response: Response) {
        commentRepository.findOne({ where: { id: Number(request.params.id) } })
            .then(async comment => {
                commentRepository.delete({ id: Number(comment.id) })
                response.sendStatus(200)
            }).catch(error => response.sendStatus(400))
    }
)

export default router