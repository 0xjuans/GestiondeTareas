/**
 * Controlador de tareas
 */

import { Response } from 'express';
import { TaskModel } from '../models/TaskModel';
import { AuthRequest } from '../types';

export class TaskController {
  /**
   * Obtener todas las tareas (según el rol del usuario)
   */
  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'No autenticado',
        });
        return;
      }

      let tasks;

      // Estudiante: solo sus tareas
      if (req.user.rol_id === 3) {
        tasks = await TaskModel.findByStudent(req.user.id);
      }
      // Profesor: solo sus tareas
      else if (req.user.rol_id === 2) {
        tasks = await TaskModel.findByTeacher(req.user.id);
      }
      // Administrador: todas las tareas
      else {
        tasks = await TaskModel.findAll();
      }

      res.json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      console.error('Error obteniendo tareas:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener tareas',
      });
    }
  }

  /**
   * Obtener tarea por ID
   */
  static async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const task = await TaskModel.findById(parseInt(id));

      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada',
        });
        return;
      }

      res.json({
        success: true,
        data: task,
      });
    } catch (error) {
      console.error('Error obteniendo tarea:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener tarea',
      });
    }
  }

  /**
   * Crear tarea
   */
  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'No autenticado',
        });
        return;
      }

      const { titulo, descripcion, fecha_entrega, materia_id, grupo_id } = req.body;

      // Validar campos requeridos
      if (!titulo || !fecha_entrega || !materia_id || !grupo_id) {
        res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos',
        });
        return;
      }

      // Crear tarea
      const taskId = await TaskModel.create({
        titulo,
        descripcion,
        fecha_entrega,
        materia_id,
        grupo_id,
        profesor_id: req.user.id,
      });

      // Obtener tarea creada
      const newTask = await TaskModel.findById(taskId);

      res.status(201).json({
        success: true,
        data: newTask,
        message: 'Tarea creada exitosamente',
      });
    } catch (error) {
      console.error('Error creando tarea:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear tarea',
      });
    }
  }

  /**
   * Actualizar tarea
   */
  static async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { titulo, descripcion, fecha_entrega, materia_id, grupo_id, estado_id } = req.body;

      // Verificar si la tarea existe
      const task = await TaskModel.findById(parseInt(id));
      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada',
        });
        return;
      }

      // Preparar datos de actualización
      const updateData: any = {};
      if (titulo) updateData.titulo = titulo;
      if (descripcion !== undefined) updateData.descripcion = descripcion;
      if (fecha_entrega) updateData.fecha_entrega = fecha_entrega;
      if (materia_id) updateData.materia_id = materia_id;
      if (grupo_id) updateData.grupo_id = grupo_id;
      if (estado_id) updateData.estado_id = estado_id;

      // Actualizar tarea
      const updated = await TaskModel.update(parseInt(id), updateData);

      if (!updated) {
        res.status(500).json({
          success: false,
          message: 'Error al actualizar tarea',
        });
        return;
      }

      // Obtener tarea actualizada
      const updatedTask = await TaskModel.findById(parseInt(id));

      res.json({
        success: true,
        data: updatedTask,
        message: 'Tarea actualizada exitosamente',
      });
    } catch (error) {
      console.error('Error actualizando tarea:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar tarea',
      });
    }
  }

  /**
   * Eliminar tarea
   */
  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Verificar si la tarea existe
      const task = await TaskModel.findById(parseInt(id));
      if (!task) {
        res.status(404).json({
          success: false,
          message: 'Tarea no encontrada',
        });
        return;
      }

      // Eliminar tarea
      const deleted = await TaskModel.delete(parseInt(id));

      if (!deleted) {
        res.status(500).json({
          success: false,
          message: 'Error al eliminar tarea',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Tarea eliminada exitosamente',
      });
    } catch (error) {
      console.error('Error eliminando tarea:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar tarea',
      });
    }
  }

  /**
   * Obtener estadísticas del dashboard
   */
  static async getDashboardStats(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'No autenticado',
        });
        return;
      }

      const stats = await TaskModel.getDashboardStats(req.user.id, req.user.rol_id);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener estadísticas',
      });
    }
  }
}
