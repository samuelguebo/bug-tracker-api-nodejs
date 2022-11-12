import { Router } from 'express';
var router      = Router();

// Importing models
import Task from '../models/task.js';


// List
router.get('/', function(request, response) {

    // Finding 10 records
    Task.findAll({limit: 10}).then(tasks => {
        response.send(tasks); 
    }).catch(err => {
        response.status(500).send(err);
    })

});

// Read 
router.get('/:id', function(request, response){
    // TODO
    response.status(404).send({error: "Undefined route"});
});

// Create
router.post('/', async function(request, response) {
    
    // Inserting the row into the DB
    Task.create(request.body).then(post => {
        response.send(post)
    }).catch(err => {
        response.status(500).send(
            {error: "Task could not be created"}
        );
    })
    
});

// Update 
router.put('/:id', function(request, response){
    // TODO
    response.status(404).send({error: "Undefined route"});
});

// Delete
router.delete('/:id', function(request, response){
    // TODO
    response.status(404).send({error: "Undefined route"});
});

export default router;