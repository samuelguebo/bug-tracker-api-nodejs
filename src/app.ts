// Get the necessary packages
import express from 'express'
import bodyParser from 'body-parser'
import sourceMapSupport from 'source-map-support'
import TaskRoutes from './controllers/tasks'
import UserRoutes from './controllers/users'
import ProjectRoutes from './controllers/projects'
import CommentsRoutes from './controllers/comments'
import AuthenticationRoutes from './controllers/authentication'
import authenticateJWT from './services/authService'

const app = express()
const cors = require('cors');
const { json, urlencoded } = bodyParser

// Typescript, CORS, and JSON Parsing support 
sourceMapSupport.install()
app.use(cors());
app.use(json())
app.use(urlencoded({ extended: false }))


// Routes
app.use('/', AuthenticationRoutes)
app.use('/comments', authenticateJWT, CommentsRoutes)
app.use('/projects', authenticateJWT, ProjectRoutes)
app.use('/tasks', authenticateJWT, TaskRoutes)
app.use('/users', authenticateJWT, UserRoutes)

export default app
