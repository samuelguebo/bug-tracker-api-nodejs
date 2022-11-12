// Applying authentication to specific endpoints
import config from './config.js';
import { Router } from 'express';
import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;
const router  = Router();


// Protecting /users path
router.use('/projects', function (request, response, next){
    const token = request.body.token || request.query.token || request.headers['x-access-token'] || request.headers['token'];
     
    // decode token
    if(token) {
        
        // verify token and check expiry date
        verify(token, config.supersecret, function(err, decoded) {
            if(err){
                return response.json({
                    success: false,
                    message: 'Invalid token'
                })
            }else{
                
                // save decoded variable for other requests
                request.decoded = decoded;
                next();
            }
            
        } )

    }else {
        // no token, deny
       response.status(403).send({
           success: false,
           message: 'No token provided'
       }) 
    }
}); 

export default router;