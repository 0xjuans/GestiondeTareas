/**
 * Middleware de autenticación
 */

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    // Obtener token del header
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'No se proporcionó token de autenticación',
      });
      return;
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

    // Agregar usuario a la request
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      rol_id: decoded.rol_id,
      rol_nombre: decoded.rol_nombre,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido o expirado',
    });
  }
};

/**
 * Middleware para verificar roles
 */
export const checkRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'No autenticado',
      });
      return;
    }

    if (!roles.includes(req.user.rol_nombre)) {
      res.status(403).json({
        success: false,
        message: 'No tienes permisos para acceder a este recurso',
      });
      return;
    }

    next();
  };
};
