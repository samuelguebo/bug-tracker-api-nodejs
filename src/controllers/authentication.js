import { Router } from 'express';
import User from '../models/user.js';
import config from '../utils/config.js';
import jsonwebtoken from 'jsonwebtoken';
import utils from '../utils/utils.js';

const { sign } = jsonwebtoken;
const router      = Router();

// Authentication
router.post('/', async function (request, response) {
    try {
        const user = await User.findOne({ where: {email: request.body.email} })
        
        if(!user){
            response.status(404).send({message: "Authentication failed, no User found"});
        }
         
        // Check the password now
        console.log(`comparing ${request.body.password} and ${user.password}`)
        const isSame = await utils.compareHash(request.body.password, user.password)
        
        if(isSame === false){
            response.status(403).send({success: false, message: "Authentication failed, password do not match"});
        }else{
            // If no error showed up, generate the token
            var token = sign({admin:  true}, config.supersecret, {
                expiresIn: 24 * 60  // expires in 24 hours
            });
                
            response.send({
                token: token
            });        
        }    
        
        
    } catch (error) {
        response.status(500).send(error)
    }

})
export default router;