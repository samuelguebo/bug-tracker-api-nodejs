import "reflect-metadata"
import { DataSource } from "typeorm"
import Comment from "./entity/Comment"
import Project from "./entity/Project"
import Task from "./entity/Task"
import User from "./entity/User"

export const AppDataSource = new DataSource({
    type: process.env.TYPEORM_TYPE as any,
    host: process.env.NODE_ENV == 'test' ? process.env.TYPEORM_HOST_TEST : process.env.TYPEORM_HOST,
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

