import { Router } from 'express';

// Importing model
import Project from '../models/project.js';

const router  = Router();

// List
router.get('/', function(request, response) {
    
    // Finding 10 records
    Project.findAll({limit: 10}).then(projects => {})
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
        // Model.update(conditions, doc, [options], [callback])
        Project.findOne({_id: id}, 
            function (err, raw) {
                if (err) {
                    response.send(err.message);
                    //response.status(500).send({error:"Could not update the project"});
                } else {
                    response.send(raw);
                }
            }
        );
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
