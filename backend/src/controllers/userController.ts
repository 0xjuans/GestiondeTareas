/**
 * Controlador de usuarios
 */

import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/UserModel';
import { AuthRequest } from '../types';

export class UserController {
  /**
   * Obtener todos los usuarios
   */
  static async getAll(_req: AuthRequest, res: Response): Promise<void> {
    try {
      const users = await UserModel.findAll();

      // Excluir passwords
      const usersWithoutPassword = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      res.json({
        success: true,
        data: usersWithoutPassword,
      });
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener usuarios',
      });
    }
  }

  /**
   * Obtener usuario por ID
   */
  static async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(parseInt(id));

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
        return;
      }

      const { password, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: userWithoutPassword,
      });
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener usuario',
      });
    }
  }

  /**
   * Crear usuario
   */
  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { username, email, password, nombre, apellidos, rol_id } = req.body;

      // Validar campos requeridos
      if (!username || !email || !password || !nombre || !apellidos || !rol_id) {
        res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos',
        });
        return;
      }

      // Verificar si el email ya existe
      const emailExists = await UserModel.emailExists(email);
      if (emailExists) {
        res.status(400).json({
          success: false,
          message: 'El email ya está registrado',
        });
        return;
      }

      // Verificar si el username ya existe
      const usernameExists = await UserModel.usernameExists(username);
      if (usernameExists) {
        res.status(400).json({
          success: false,
          message: 'El nombre de usuario ya está en uso',
        });
        return;
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear usuario
      const userId = await UserModel.create({
        username,
        email,
        password: hashedPassword,
        nombre,
        apellidos,
        rol_id,
      });

      // Obtener usuario creado
      const newUser = await UserModel.findById(userId);

      if (!newUser) {
        res.status(500).json({
          success: false,
          message: 'Error al crear usuario',
        });
        return;
      }

      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        success: true,
        data: userWithoutPassword,
        message: 'Usuario creado exitosamente',
      });
    } catch (error) {
      console.error('Error creando usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear usuario',
      });
    }
  }

  /**
   * Actualizar usuario
   */
  static async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { username, email, nombre, apellidos, rol_id, activo, password } = req.body;

      // Verificar si el usuario existe
      const user = await UserModel.findById(parseInt(id));
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
        return;
      }

      // Verificar si el email ya existe (excluyendo el usuario actual)
      if (email && email !== user.email) {
        const emailExists = await UserModel.emailExists(email, parseInt(id));
        if (emailExists) {
          res.status(400).json({
            success: false,
            message: 'El email ya está registrado',
          });
          return;
        }
      }

      // Verificar si el username ya existe (excluyendo el usuario actual)
      if (username && username !== user.username) {
        const usernameExists = await UserModel.usernameExists(username, parseInt(id));
        if (usernameExists) {
          res.status(400).json({
            success: false,
            message: 'El nombre de usuario ya está en uso',
          });
          return;
        }
      }

      // Preparar datos de actualización
      const updateData: any = {};
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (nombre) updateData.nombre = nombre;
      if (apellidos) updateData.apellidos = apellidos;
      if (rol_id) updateData.rol_id = rol_id;
      if (activo !== undefined) updateData.activo = activo;

      // Si se proporciona nueva contraseña, hashearla
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      // Actualizar usuario
      const updated = await UserModel.update(parseInt(id), updateData);

      if (!updated) {
        res.status(500).json({
          success: false,
          message: 'Error al actualizar usuario',
        });
        return;
      }

      // Obtener usuario actualizado
      const updatedUser = await UserModel.findById(parseInt(id));

      if (!updatedUser) {
        res.status(500).json({
          success: false,
          message: 'Error al obtener usuario actualizado',
        });
        return;
      }

      const { password: _, ...userWithoutPassword } = updatedUser;

      res.json({
        success: true,
        data: userWithoutPassword,
        message: 'Usuario actualizado exitosamente',
      });
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar usuario',
      });
    }
  }

  /**
   * Eliminar usuario
   */
  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Verificar si el usuario existe
      const user = await UserModel.findById(parseInt(id));
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
        return;
      }

      // No permitir eliminar al usuario actual
      if (req.user && req.user.id === parseInt(id)) {
        res.status(400).json({
          success: false,
          message: 'No puedes eliminar tu propio usuario',
        });
        return;
      }

      // Eliminar usuario
      const deleted = await UserModel.delete(parseInt(id));

      if (!deleted) {
        res.status(500).json({
          success: false,
          message: 'Error al eliminar usuario',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Usuario eliminado exitosamente',
      });
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar usuario',
      });
    }
  }
}
