/**
 * Modelo de Tareas
 */

import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '../config/database';
import { Task } from '../types';

export class TaskModel {
  /**
   * Obtener todas las tareas
   */
  static async findAll(): Promise<Task[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT t.*, 
              m.nombre as materia_nombre, 
              m.codigo as materia_codigo,
              g.nombre as grupo_nombre,
              CONCAT(u.nombre, ' ', u.apellidos) as profesor_nombre,
              e.nombre as estado_nombre
       FROM tareas t
       LEFT JOIN materias m ON t.materia_id = m.id
       LEFT JOIN grupos g ON t.grupo_id = g.id
       LEFT JOIN usuarios u ON t.profesor_id = u.id
       LEFT JOIN estados_tarea e ON t.estado_id = e.id
       ORDER BY t.fecha_creacion DESC`
    );

    return rows as Task[];
  }

  /**
   * Obtener tarea por ID
   */
  static async findById(id: number): Promise<Task | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT t.*, 
              m.nombre as materia_nombre,
              m.codigo as materia_codigo,
              g.nombre as grupo_nombre,
              CONCAT(u.nombre, ' ', u.apellidos) as profesor_nombre,
              e.nombre as estado_nombre
       FROM tareas t
       LEFT JOIN materias m ON t.materia_id = m.id
       LEFT JOIN grupos g ON t.grupo_id = g.id
       LEFT JOIN usuarios u ON t.profesor_id = u.id
       LEFT JOIN estados_tarea e ON t.estado_id = e.id
       WHERE t.id = ?`,
      [id]
    );

    if (rows.length === 0) return null;
    return rows[0] as Task;
  }

  /**
   * Obtener tareas por estudiante
   */
  static async findByStudent(studentId: number): Promise<Task[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT t.*, 
              m.nombre as materia_nombre,
              m.codigo as materia_codigo,
              g.nombre as grupo_nombre,
              CONCAT(u.nombre, ' ', u.apellidos) as profesor_nombre,
              e.nombre as estado_nombre
       FROM tareas t
       INNER JOIN grupos g ON t.grupo_id = g.id
       INNER JOIN estudiante_grupo eg ON g.id = eg.grupo_id
       LEFT JOIN materias m ON t.materia_id = m.id
       LEFT JOIN usuarios u ON t.profesor_id = u.id
       LEFT JOIN estados_tarea e ON t.estado_id = e.id
       WHERE eg.estudiante_id = ?
       ORDER BY t.fecha_entrega ASC`,
      [studentId]
    );

    return rows as Task[];
  }

  /**
   * Obtener tareas por profesor
   */
  static async findByTeacher(teacherId: number): Promise<Task[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT t.*, 
              m.nombre as materia_nombre,
              m.codigo as materia_codigo,
              g.nombre as grupo_nombre,
              CONCAT(u.nombre, ' ', u.apellidos) as profesor_nombre,
              e.nombre as estado_nombre
       FROM tareas t
       LEFT JOIN materias m ON t.materia_id = m.id
       LEFT JOIN grupos g ON t.grupo_id = g.id
       LEFT JOIN usuarios u ON t.profesor_id = u.id
       LEFT JOIN estados_tarea e ON t.estado_id = e.id
       WHERE t.profesor_id = ?
       ORDER BY t.fecha_creacion DESC`,
      [teacherId]
    );

    return rows as Task[];
  }

  /**
   * Crear nueva tarea
   */
  static async create(taskData: Partial<Task>): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        taskData.titulo,
        taskData.descripcion,
        taskData.fecha_entrega,
        taskData.materia_id,
        taskData.grupo_id,
        taskData.profesor_id,
        taskData.estado_id || 1, // Estado por defecto: pendiente
      ]
    );

    return result.insertId;
  }

  /**
   * Actualizar tarea
   */
  static async update(id: number, taskData: Partial<Task>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    if (taskData.titulo !== undefined) {
      fields.push('titulo = ?');
      values.push(taskData.titulo);
    }
    if (taskData.descripcion !== undefined) {
      fields.push('descripcion = ?');
      values.push(taskData.descripcion);
    }
    if (taskData.fecha_entrega !== undefined) {
      fields.push('fecha_entrega = ?');
      values.push(taskData.fecha_entrega);
    }
    if (taskData.materia_id !== undefined) {
      fields.push('materia_id = ?');
      values.push(taskData.materia_id);
    }
    if (taskData.grupo_id !== undefined) {
      fields.push('grupo_id = ?');
      values.push(taskData.grupo_id);
    }
    if (taskData.estado_id !== undefined) {
      fields.push('estado_id = ?');
      values.push(taskData.estado_id);
    }

    if (fields.length === 0) return false;

    values.push(id);

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE tareas SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  /**
   * Eliminar tarea
   */
  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM tareas WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }

  /**
   * Obtener estadísticas del dashboard
   */
  static async getDashboardStats(userId: number, rolId: number): Promise<any> {
    let query = '';
    
    if (rolId === 3) { // Estudiante
      query = `
        SELECT 
          COUNT(DISTINCT t.id) as total_tareas,
          SUM(CASE WHEN t.estado_id = 1 THEN 1 ELSE 0 END) as tareas_pendientes,
          SUM(CASE WHEN t.estado_id = 3 THEN 1 ELSE 0 END) as tareas_completadas,
          SUM(CASE WHEN t.estado_id = 4 THEN 1 ELSE 0 END) as tareas_vencidas
        FROM tareas t
        INNER JOIN estudiante_grupo eg ON t.grupo_id = eg.grupo_id
        WHERE eg.estudiante_id = ?
      `;
    } else if (rolId === 2) { // Profesor
      query = `
        SELECT 
          COUNT(DISTINCT t.id) as total_tareas,
          SUM(CASE WHEN t.estado_id = 1 THEN 1 ELSE 0 END) as tareas_pendientes,
          SUM(CASE WHEN t.estado_id = 3 THEN 1 ELSE 0 END) as tareas_completadas,
          SUM(CASE WHEN t.estado_id = 4 THEN 1 ELSE 0 END) as tareas_vencidas
        FROM tareas t
        WHERE t.profesor_id = ?
      `;
    } else { // Administrador
      query = `
        SELECT 
          COUNT(DISTINCT t.id) as total_tareas,
          SUM(CASE WHEN t.estado_id = 1 THEN 1 ELSE 0 END) as tareas_pendientes,
          SUM(CASE WHEN t.estado_id = 3 THEN 1 ELSE 0 END) as tareas_completadas,
          SUM(CASE WHEN t.estado_id = 4 THEN 1 ELSE 0 END) as tareas_vencidas,
          (SELECT COUNT(*) FROM usuarios WHERE rol_id = 3) as total_estudiantes,
          (SELECT COUNT(*) FROM usuarios WHERE rol_id = 2) as total_profesores,
          (SELECT COUNT(*) FROM grupos) as total_grupos,
          (SELECT COUNT(*) FROM materias) as total_materias
        FROM tareas t
      `;
    }

    const [rows] = await pool.query<RowDataPacket[]>(query, rolId !== 1 ? [userId] : []);
    return rows[0];
  }
}
