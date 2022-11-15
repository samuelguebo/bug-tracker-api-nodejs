import { AppDataSource } from "../data-source"
import Comment from "../entity/Comment"
import Project from "../entity/Project"
import Task from "../entity/Task"
import User from "../entity/User"

// Initiate Database connection
export const initializeDatabase = async function () {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize()
            // console.log("Database connection was initialized successfully")
        }
    } catch (error) {
        console.log(error)
    }
}
