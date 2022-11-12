// Requirements

import User from '../models/user.js';
import Task from '../models/task.js';
import Project from '../models/project.js';
import utils from './utils.js';
import firstRun from 'first-run';
import { seedTasks, seedUsers } from './seed-data.js';

// Seed the Database

const SeedLoader = function (request, response, next) {
        
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
        
        // Create users
        let user = await User.findOne()
        if(!user){
            for(let row of seedUsers){
                user = User.create(row)
            }
        
            // Create tasks
            const post = await Task.findOne()
            if(!post){
                for(let post of seedTasks){
                    // TODO: fix association bug
                    Task.create({...post, UserId: user.id})
                }
            }
        }
         
        


    } catch (error) {
        console.log(err)
    }
    
}

export default SeedLoader;