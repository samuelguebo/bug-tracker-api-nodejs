import "reflect-metadata"
import Comment from "../entity/Comment"
import Project from "../entity/Project"
import Task from "../entity/Task"
import User from "../entity/User"
import { DataSource } from "typeorm"

export const AppDataSource = process.env.NODE_ENV === 'test'
    ? new DataSource({
        type: "sqlite",
        database: `storage/line.sqlite`,
        logging: process.env.TYPEORM_LOGGING as any,
        entities: [User, Project, Task, Comment],
        synchronize: true
    }) :
    new DataSource({
        type: process.env.TYPEORM_TYPE as any,
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
        logging: process.env.TYPEORM_LOGGING as any,
        entities: [Comment, Project, Task, User],
        migrations: [],
        subscribers: [],
    })

// Initiate Database connection
export const initializeDatabase = async function () {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize()
            console.log("Database connection initialized")
        }
    } catch (error) {
        console.log(error)
    }
}
