/**
 * Rutas del dashboard
 */

import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// GET /api/dashboard/stats - Obtener estadísticas del dashboard
router.get('/stats', TaskController.getDashboardStats);

export default router;
