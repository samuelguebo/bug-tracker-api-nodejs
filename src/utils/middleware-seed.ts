// Requirements

import User from '../entity/User';
import Task from '../entity/Task.js';
import Project from '../entity/Project';
import utils from './utils';
import { seedProjects, seedTasks, seedUsers } from './seed-data';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';

// Seed the Database

const SeedLoader = function (request: Request, response: Response, next: any) {
        
    // Running db imports only once
    oneTimeInsert();
    next();
}

/**
 * Make sure the Db is empty
 * and persist data only once
 */
async function oneTimeInsert(){
    // check for Task model existence
    try {
        
        const userRepository = AppDataSource.getRepository(User)
        const taskRepository = AppDataSource.getRepository(Task)
        const projectRepository = AppDataSource.getRepository(Project)

        let task: Task = new Task()
        let users: User[] = await userRepository.find({take: 3})

        if(users.length < 2){

            // Create users and other entities if there are none
            let user = new User()
            for(let row of seedUsers){
                user.email = row.email
                user.password = await utils.hashPassword(row.password)
                user = await userRepository.save(user)
            }

            // Create projects
            let project = new Project()
            for(let row of seedProjects){
                project.title = row
                project = await projectRepository.save(project)
            }

            // Create tasks
            for(let row of seedTasks){
                task = new Task()
                task.title = row?.title || row?.original_title
                task.author = user
                task.members = [user]
                task.content = row.content
                task.projects = [project]

                taskRepository.save(task)
            }
        }

    } catch (error) {
        console.log(error)
    }
    
}

export default SeedLoader;