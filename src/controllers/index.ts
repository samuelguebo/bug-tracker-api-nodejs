import { Router } from 'express';
import AuthMiddleware from '../utils/middleware-auth'
import TaskRoutes from './tasks'
import UserRoutes from './users'
import ProjectRoutes from './projects'
import AuthenticationRoutes from './authentication'

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