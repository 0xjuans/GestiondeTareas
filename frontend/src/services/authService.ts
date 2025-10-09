/**
 * Servicio para operaciones de autenticación
 */

import { apiService } from './api';
import { User, LoginCredentials, AuthResponse, CreateUserData, UpdateUserData } from '../types/auth';
import { ApiResponse } from '../types/common';

class AuthService {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse & { user?: User }> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/login', credentials);
      
      if (response.success && response.data) {
        // Guardar token en localStorage
        const token = (response.data as any).token;
        if (token) {
          localStorage.setItem('auth_token', token);
        }
        
        return {
          success: true,
          rol: (response.data as any).rol,
          user: (response.data as any).user
        };
      }
      
      return {
        success: false,
        message: response.message || 'Error al iniciar sesión'
      };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: 'Error al iniciar sesión'
      };
    }
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>('/auth/me');
    if (!response.success || !response.data) {
      throw new Error('No se pudo obtener la información del usuario');
    }
    return response.data;
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  /**
   * Obtener token de autenticación
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Crear nuevo usuario (solo administradores)
   */
  async createUser(userData: CreateUserData): Promise<ApiResponse<User>> {
    return apiService.post<User>('/users', userData);
  }

  /**
   * Actualizar usuario
   */
  async updateUser(userData: UpdateUserData): Promise<ApiResponse<User>> {
    return apiService.put<User>(`/users/${userData.id}`, userData);
  }

  /**
   * Eliminar usuario
   */
  async deleteUser(userId: number): Promise<ApiResponse> {
    return apiService.delete(`/users/${userId}`);
  }

  /**
   * Obtener todos los usuarios (solo administradores)
   */
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return apiService.get<User[]>('/users');
  }

  /**
   * Obtener usuario por ID
   */
  async getUserById(userId: number): Promise<ApiResponse<User>> {
    return apiService.get<User>(`/users/${userId}`);
  }
}

export const authService = new AuthService();
