// Get the necessary packages
import express from 'express'
import bodyParser from 'body-parser'
import sourceMapSupport from 'source-map-support'
import AuthMiddleware from './middlewares/middleware-auth'
import TaskRoutes from './controllers/tasks'
import UserRoutes from './controllers/users'
import ProjectRoutes from './controllers/projects'
import AuthenticationRoutes from './controllers/authentication'

const app = express()
const { json, urlencoded } = bodyParser

// Typescript and JSON Parsing support 
sourceMapSupport.install()
app.use(json())
app.use(urlencoded({ extended: false }))

// Middlewares
app.use(AuthMiddleware)

// Routes
app.use('/tasks', TaskRoutes)
app.use('/users', UserRoutes)
app.use('/projects', ProjectRoutes)
app.use('/authentication', AuthenticationRoutes)

export default app
