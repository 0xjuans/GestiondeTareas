/**
 * Controlador de autenticación
 */

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/UserModel';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../types';

export class AuthController {
  /**
   * Login de usuario
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validar campos requeridos
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email y contraseña son requeridos',
        });
        return;
      }

      // Buscar usuario
      const user = await UserModel.findByEmail(email);

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Credenciales inválidas',
        });
        return;
      }

      // Verificar si el usuario está activo
      if (!user.activo) {
        res.status(401).json({
          success: false,
          message: 'Usuario inactivo',
        });
        return;
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Credenciales inválidas',
        });
        return;
      }

      // Generar token
      const token = generateToken({
        id: user.id,
        username: user.username,
        email: user.email,
        rol_id: user.rol_id,
        rol_nombre: user.rol_nombre || '',
      });

      // Enviar respuesta
      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            nombre: user.nombre,
            apellidos: user.apellidos,
            rol_id: user.rol_id,
            rol_nombre: user.rol_nombre,
          },
          rol: user.rol_nombre,
        },
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión',
      });
    }
  }

  /**
   * Obtener usuario actual
   */
  static async me(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'No autenticado',
        });
        return;
      }

      const user = await UserModel.findById(req.user.id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
        return;
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          nombre: user.nombre,
          apellidos: user.apellidos,
          rol_id: user.rol_id,
          rol_nombre: user.rol_nombre,
          activo: user.activo,
        },
      });
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener información del usuario',
      });
    }
  }

  /**
   * Logout (opcional, el token se elimina en el cliente)
   */
  static async logout(_req: Request, res: Response): Promise<void> {
    res.json({
      success: true,
      message: 'Sesión cerrada exitosamente',
    });
  }
}
