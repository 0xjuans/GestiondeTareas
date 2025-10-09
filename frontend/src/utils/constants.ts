/**
 * Constantes de la aplicación
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  USERS: '/users',
  TASKS: '/tasks',
  SUBMISSIONS: '/submissions',
  NOTIFICATIONS: '/notifications',
  GROUPS: '/groups',
  SUBJECTS: '/subjects',
  DASHBOARD: '/dashboard',
} as const;

export const USER_ROLES = {
  ADMIN: 'administrador',
  TEACHER: 'profesor',
  STUDENT: 'estudiante',
} as const;

export const TASK_STATES = {
  PENDING: 'pendiente',
  IN_PROGRESS: 'en_progreso',
  COMPLETED: 'completada',
  OVERDUE: 'vencida',
  GRADED: 'calificada',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  TASKS: '/tasks',
  SUBMISSIONS: '/submissions',
  USERS: '/users',
  GROUPS: '/groups',
  SUBJECTS: '/subjects',
  NOTIFICATIONS: '/notifications',
  PROFILE: '/profile',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
} as const;

export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DD HH:mm:ss',
} as const;

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif',
  ],
} as const;
