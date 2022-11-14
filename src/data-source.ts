import "reflect-metadata"
import { DataSource } from "typeorm"
import Project from "./entity/Project"
import Task from "./entity/Task"
import User from "./entity/User"

export const AppDataSource = new DataSource({
    type: process.env.TYPEORM_TYPE as any,
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Project, Task, User],
    migrations: [],
    subscribers: [],
})

