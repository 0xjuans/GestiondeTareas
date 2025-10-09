/**
 * Rutas de usuarios
 */

import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware, checkRole } from '../middleware/auth';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// GET /api/users - Obtener todos los usuarios (solo admin)
router.get('/', checkRole('administrador'), UserController.getAll);

// GET /api/users/:id - Obtener usuario por ID
router.get('/:id', UserController.getById);

// POST /api/users - Crear usuario (solo admin)
router.post('/', checkRole('administrador'), UserController.create);

// PUT /api/users/:id - Actualizar usuario (solo admin)
router.put('/:id', checkRole('administrador'), UserController.update);

// DELETE /api/users/:id - Eliminar usuario (solo admin)
router.delete('/:id', checkRole('administrador'), UserController.delete);

export default router;
