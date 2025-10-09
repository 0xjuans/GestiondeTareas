/**
 * Rutas de autenticación
 */

import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// POST /api/auth/login
router.post('/login', AuthController.login);

// GET /api/auth/me
router.get('/me', authMiddleware, AuthController.me);

// POST /api/auth/logout
router.post('/logout', authMiddleware, AuthController.logout);

export default router;
