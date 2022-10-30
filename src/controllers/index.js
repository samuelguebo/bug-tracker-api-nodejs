import { Router } from 'express';
import AuthMiddleware from '../utils/middleware-auth.js'
import PostRoutes from './posts.js'
import UserRoutes from './users.js'
import CategoryRoutes from './categories.js'
import AuthenticationRoutes from './authentication.js'

const router  = Router();

/**
 * Middlewares
// Initial seed
// import seedLoader from '../utils/middleware-seed.js';
// app.use(seedLoader);
 */

// Authentication
router.use(AuthMiddleware);

// Routes
router.use('/posts', PostRoutes);
router.use('/users', UserRoutes);
router.use('/categories', CategoryRoutes);
router.use('/authentication', AuthenticationRoutes);



export default router;