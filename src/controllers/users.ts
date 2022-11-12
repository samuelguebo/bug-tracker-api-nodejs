import { Router, Request, Response } from 'express';
const router      = Router();

// Importing model
import User from '../models/user.js';

// Create
router.post('/', function(request: Request, response: Response) {
    if(!request.body.email) { response.json( 
        {
            success: false,
            message: 'No email address'
        }
    )}
   
    // Inserting the row into the DB, but hash password first
    User.create(request.body).then(savedUser => {
    response.send({id: savedUser.id});
        
    }).catch(err => {
        response.status(500).send({error: `Could not create the user ${err}`});
    })

});

// Update 
router.put('/:id', function(request: Request, response: Response){
    // TODO
    response.status(404).send({error: "Undefined route"});
});

// Delete
router.delete('/:id', function(request: Request, response: Response){
    // TODO
    response.status(404).send({error: "Undefined route"});
});

// Get

router.get('/', async function(request: Request, response: Response){
    // TODO
    const users = await User.findAll()
    response.status(200).send(users);
});

export default router;