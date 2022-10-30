import { Router } from 'express';
var router      = Router();

// Importing models
import Post from '../models/post.js';


// List
router.get('/', async function(request, response) {

    // Finding 10 records
    const posts = await Post.findAll({limit: 10})
    response.send(posts); 

});

// Read 
router.get('/:id', function(request, response){
    // TODO
    response.status(404).send({error: "Undefined route"});
});

// Create
router.post('/', async function(request, response) {
    
    // Inserting the row into the DB
    Post.create(request.body).then(post => {
        response.send(post)
    }).catch(err => {
        response.status(500).send(
            {error: "Post could not be created"}
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