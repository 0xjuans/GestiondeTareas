/**
 * Tipos TypeScript para el backend
 */

import { Request } from 'express';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  nombre: string;
  apellidos: string;
  rol_id: number;
  rol_nombre?: string;
  activo: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
    rol_id: number;
    rol_nombre: string;
  };
}

export interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_creacion: Date;
  fecha_entrega: Date;
  materia_id: number;
  grupo_id: number;
  profesor_id: number;
  estado_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface TaskSubmission {
  id: number;
  tarea_id: number;
  estudiante_id: number;
  estado_id: number;
  fecha_entrega?: Date;
  calificacion?: number;
  comentarios?: string;
  archivo_adjunto?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Notification {
  id: number;
  usuario_id: number;
  titulo: string;
  mensaje: string;
  tarea_id?: number;
  leida: boolean;
  created_at: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
