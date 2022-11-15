// Get the necessary packages
import express from 'express'
import bodyParser from 'body-parser'
import routes from './controllers/index'
import sourceMapSupport from 'source-map-support'
import { AppDataSource } from './data-source'

const app = express()

const { json, urlencoded } = bodyParser

// Typescript source map support
sourceMapSupport.install();

// Middleware
app.use(json())
app.use(urlencoded({ extended: false }))

// Using routes and middlewares
app.use(routes)

export default app
