import "reflect-metadata"
import { DataSource } from "typeorm"
import Comment from "../entity/Comment"
import Project from "../entity/Project"
import Task from "../entity/Task"
import User from "../entity/User"

// Prepare Test Database connection with SQLite
const TestDataSource = new DataSource({
    type: "sqlite",
    database: `../../storage/line.sqlite`,
    logging: process.env.TYPEORM_LOGGING as any,
    entities: [User, Project, Task, Comment],
    synchronize: true
})



const initializeTestDatabase = async function () {
    try {
        if (!TestDataSource.isInitialized) {
            await TestDataSource.initialize()
            console.log("Test Database connection initialized")
        }
    } catch (error) {
        console.log(error)
    }
}

export { TestDataSource, initializeTestDatabase }
