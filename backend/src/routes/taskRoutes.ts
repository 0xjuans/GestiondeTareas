/**
 * Rutas de tareas
 */

import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { authMiddleware, checkRole } from '../middleware/auth';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// GET /api/tasks - Obtener tareas
router.get('/', TaskController.getAll);

// GET /api/tasks/:id - Obtener tarea por ID
router.get('/:id', TaskController.getById);

// POST /api/tasks - Crear tarea (solo profesor)
router.post('/', checkRole('profesor', 'administrador'), TaskController.create);

// PUT /api/tasks/:id - Actualizar tarea (solo profesor)
router.put('/:id', checkRole('profesor', 'administrador'), TaskController.update);

// DELETE /api/tasks/:id - Eliminar tarea (solo profesor)
router.delete('/:id', checkRole('profesor', 'administrador'), TaskController.delete);

export default router;
