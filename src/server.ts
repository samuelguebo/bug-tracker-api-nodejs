// Get the necessary packages
import express from 'express'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import routes from './controllers/index'
import sourceMapSupport from 'source-map-support'
import { AppDataSource } from './data-source'
import SeedLoader from './middlewares/middleware-seed'

dotenv.config()
const app = express()
const { json, urlencoded } = bodyParser

// Typsescript source map support
sourceMapSupport.install()

// Initiate Database connection
AppDataSource.initialize().then(async () => {
    console.log("Database connection was initialized successfully")

    // Initial seed
    app.use(SeedLoader)

    // Middlewares
    app.use(json())
    app.use(urlencoded({ extended: false }))

    // Using routes and middlewares
    app.use(routes)

    app.listen(process.env.SERVER_PORT, function () {
        console.log("The App is running on port " + process.env.SERVER_PORT)
    })

}).catch(error => console.log(error))





