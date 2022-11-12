import { Router } from 'express';
import AuthMiddleware from '../utils/middleware-auth.js'
import TaskRoutes from './tasks.js'
import UserRoutes from './users.js'
import ProjectRoutes from './projects.js'
import AuthenticationRoutes from './authentication.js'

const router  = Router();

/**
 * Middlewares
 */

// Authentication
router.use(AuthMiddleware);

// Routes
router.use('/tasks', TaskRoutes);
router.use('/users', UserRoutes);
router.use('/projects', ProjectRoutes);
router.use('/authentication', AuthenticationRoutes);



export default router;