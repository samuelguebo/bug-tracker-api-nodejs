import { Request, Response, Router } from 'express';
import { AppDataSource } from '../data-source';

// Importing model
import Project from '../entity/Project';

const router  = Router();

// List
router.get('/', function(request: Request, response: Response) {
    
    // Finding 10 records
    AppDataSource.manager.find(Project).then(projects => {
        response.send(projects)
    })
    .catch(err => {
        response.status(404).send({error:"Could not find any project"})
    })
        

});

// Read 
router.get('/:id', function(request, response){
    var id = request.params.id;
    
    // Filtering
    if (!id.toString() || id.toString() === "") {
        response.status(500).send(
            {error:"A project must have have an ID"}
        );
    }else {
        // TODO: Find user by id
        response.send(200)
    }
});

// Create
router.post('/', function(request, response) {
    // TODO
    response.status(404).send({error: "Undefined route"});

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
