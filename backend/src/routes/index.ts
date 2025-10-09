/**
 * Exportación centralizada de rutas
 */

import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import taskRoutes from './taskRoutes';
import dashboardRoutes from './dashboardRoutes';

const router = Router();

// Rutas de la API
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
