/**
 * Tipos relacionados con tareas y entregas
 */

export interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_creacion: string;
  fecha_entrega: string;
  materia_id: number;
  materia_nombre?: string;
  materia_codigo?: string;
  grupo_id: number;
  grupo_nombre?: string;
  profesor_id: number;
  profesor_nombre?: string;
  estado_id: number;
  estado_nombre?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TaskSubmission {
  id: number;
  tarea_id: number;
  estudiante_id: number;
  estudiante_nombre?: string;
  estado_id: number;
  estado_nombre?: string;
  fecha_entrega?: string;
  calificacion?: number;
  comentarios?: string;
  archivo_adjunto?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTaskData {
  titulo: string;
  descripcion: string;
  fecha_entrega: string;
  materia_id: number;
  grupo_id: number;
}

export interface UpdateTaskData {
  id: number;
  titulo?: string;
  descripcion?: string;
  fecha_entrega?: string;
  materia_id?: number;
  grupo_id?: number;
  estado_id?: number;
}

export interface TaskState {
  id: number;
  nombre: string;
}

export interface GradeSubmissionData {
  submission_id: number;
  calificacion: number;
  comentarios?: string;
}

export interface TaskFilter {
  materia_id?: number;
  estado_id?: number;
  grupo_id?: number;
  fecha_desde?: string;
  fecha_hasta?: string;
}
