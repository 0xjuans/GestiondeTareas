/**
 * Tipos relacionados con autenticación y usuarios
 */

export interface User {
  id: number;
  username: string;
  email: string;
  nombre: string;
  apellidos: string;
  rol_id: number;
  rol_nombre: string;
  activo: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  rol?: string;
  user?: User;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export type UserRole = 'administrador' | 'profesor' | 'estudiante';

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  nombre: string;
  apellidos: string;
  rol_id: number;
}

export interface UpdateUserData {
  id: number;
  username?: string;
  email?: string;
  nombre?: string;
  apellidos?: string;
  rol_id?: number;
  activo?: boolean;
  password?: string;
}
