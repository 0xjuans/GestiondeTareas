/**
 * Modelo de Usuario
 */

import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '../config/database';
import { User } from '../types';

export class UserModel {
  /**
   * Obtener usuario por email
   */
  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT u.*, r.nombre as rol_nombre 
       FROM usuarios u 
       LEFT JOIN roles r ON u.rol_id = r.id 
       WHERE u.email = ?`,
      [email]
    );

    if (rows.length === 0) return null;
    return rows[0] as User;
  }

  /**
   * Obtener usuario por ID
   */
  static async findById(id: number): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT u.*, r.nombre as rol_nombre 
       FROM usuarios u 
       LEFT JOIN roles r ON u.rol_id = r.id 
       WHERE u.id = ?`,
      [id]
    );

    if (rows.length === 0) return null;
    return rows[0] as User;
  }

  /**
   * Obtener todos los usuarios
   */
  static async findAll(): Promise<User[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT u.*, r.nombre as rol_nombre 
       FROM usuarios u 
       LEFT JOIN roles r ON u.rol_id = r.id 
       ORDER BY u.nombre ASC`
    );

    return rows as User[];
  }

  /**
   * Crear nuevo usuario
   */
  static async create(userData: Partial<User>): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO usuarios (username, password, email, nombre, apellidos, rol_id, activo) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userData.username,
        userData.password,
        userData.email,
        userData.nombre,
        userData.apellidos,
        userData.rol_id,
        userData.activo ?? true,
      ]
    );

    return result.insertId;
  }

  /**
   * Actualizar usuario
   */
  static async update(id: number, userData: Partial<User>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    if (userData.username !== undefined) {
      fields.push('username = ?');
      values.push(userData.username);
    }
    if (userData.email !== undefined) {
      fields.push('email = ?');
      values.push(userData.email);
    }
    if (userData.nombre !== undefined) {
      fields.push('nombre = ?');
      values.push(userData.nombre);
    }
    if (userData.apellidos !== undefined) {
      fields.push('apellidos = ?');
      values.push(userData.apellidos);
    }
    if (userData.rol_id !== undefined) {
      fields.push('rol_id = ?');
      values.push(userData.rol_id);
    }
    if (userData.activo !== undefined) {
      fields.push('activo = ?');
      values.push(userData.activo);
    }
    if (userData.password !== undefined) {
      fields.push('password = ?');
      values.push(userData.password);
    }

    if (fields.length === 0) return false;

    values.push(id);

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  /**
   * Eliminar usuario
   */
  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM usuarios WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }

  /**
   * Verificar si el email ya existe
   */
  static async emailExists(email: string, excludeId?: number): Promise<boolean> {
    let query = 'SELECT COUNT(*) as count FROM usuarios WHERE email = ?';
    const params: any[] = [email];

    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows[0].count > 0;
  }

  /**
   * Verificar si el username ya existe
   */
  static async usernameExists(username: string, excludeId?: number): Promise<boolean> {
    let query = 'SELECT COUNT(*) as count FROM usuarios WHERE username = ?';
    const params: any[] = [username];

    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows[0].count > 0;
  }
}
