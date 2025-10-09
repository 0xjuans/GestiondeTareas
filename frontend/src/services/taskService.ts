/**
 * Servicio para operaciones relacionadas con tareas
 */

import { apiService } from './api';
import { 
  Task, 
  TaskSubmission, 
  CreateTaskData, 
  UpdateTaskData, 
  GradeSubmissionData,
  TaskFilter 
} from '../types/task';
import { ApiResponse } from '../types/common';

class TaskService {
  /**
   * Obtener todas las tareas del usuario autenticado
   */
  async getTasks(filter?: TaskFilter): Promise<ApiResponse<Task[]>> {
    const params = new URLSearchParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const url = params.toString() ? `/tasks?${params}` : '/tasks';
    return apiService.get<Task[]>(url);
  }

  /**
   * Obtener tarea por ID
   */
  async getTaskById(taskId: number): Promise<ApiResponse<Task>> {
    return apiService.get<Task>(`/tasks/${taskId}`);
  }

  /**
   * Crear nueva tarea
   */
  async createTask(taskData: CreateTaskData): Promise<ApiResponse<Task>> {
    return apiService.post<Task>('/tasks', taskData);
  }

  /**
   * Actualizar tarea
   */
  async updateTask(taskData: UpdateTaskData): Promise<ApiResponse<Task>> {
    return apiService.put<Task>(`/tasks/${taskData.id}`, taskData);
  }

  /**
   * Eliminar tarea
   */
  async deleteTask(taskId: number): Promise<ApiResponse> {
    return apiService.delete(`/tasks/${taskId}`);
  }

  /**
   * Obtener entregas de una tarea específica
   */
  async getTaskSubmissions(taskId: number): Promise<ApiResponse<TaskSubmission[]>> {
    return apiService.get<TaskSubmission[]>(`/tasks/${taskId}/submissions`);
  }

  /**
   * Obtener entregas del estudiante autenticado
   */
  async getMySubmissions(): Promise<ApiResponse<TaskSubmission[]>> {
    return apiService.get<TaskSubmission[]>('/submissions');
  }

  /**
   * Crear o actualizar entrega de tarea
   */
  async submitTask(taskId: number, submissionData: FormData): Promise<ApiResponse<TaskSubmission>> {
    return apiService.post<TaskSubmission>(`/tasks/${taskId}/submit`, submissionData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Calificar entrega
   */
  async gradeSubmission(gradeData: GradeSubmissionData): Promise<ApiResponse<TaskSubmission>> {
    return apiService.patch<TaskSubmission>(`/submissions/${gradeData.submission_id}/grade`, gradeData);
  }

  /**
   * Obtener estadísticas del dashboard
   */
  async getDashboardStats(): Promise<ApiResponse<any>> {
    return apiService.get('/dashboard/stats');
  }

  /**
   * Obtener tareas próximas a vencer
   */
  async getUpcomingTasks(): Promise<ApiResponse<Task[]>> {
    return apiService.get<Task[]>('/tasks/upcoming');
  }

  /**
   * Obtener tareas vencidas
   */
  async getOverdueTasks(): Promise<ApiResponse<Task[]>> {
    return apiService.get<Task[]>('/tasks/overdue');
  }
}

export const taskService = new TaskService();
