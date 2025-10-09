/**
 * Tipos comunes utilizados en toda la aplicación
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SelectOption {
  value: number | string;
  label: string;
  disabled?: boolean;
}

export interface Notification {
  id: number;
  usuario_id: number;
  titulo: string;
  mensaje: string;
  tarea_id?: number;
  leida: boolean;
  created_at: string;
}

export interface Group {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Subject {
  id: number;
  nombre: string;
  codigo: string;
  descripcion?: string;
  activo: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardStats {
  total_tareas: number;
  tareas_pendientes: number;
  tareas_completadas: number;
  tareas_vencidas: number;
  total_estudiantes?: number;
  total_profesores?: number;
  total_grupos?: number;
  total_materias?: number;
}

export interface FormError {
  field: string;
  message: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}
