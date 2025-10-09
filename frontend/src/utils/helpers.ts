/**
 * Funciones de utilidad para la aplicación
 */

import { format, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { DATE_FORMATS } from './constants';

/**
 * Formatear fecha para mostrar
 */
export const formatDate = (date: string | Date, formatStr: string = DATE_FORMATS.DISPLAY): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Fecha inválida';
    return format(dateObj, formatStr, { locale: es });
  } catch (error) {
    return 'Fecha inválida';
  }
};

/**
 * Formatear fecha relativa (hace X tiempo)
 */
export const formatRelativeTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Fecha inválida';
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Hace un momento';
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
    if (diffInSeconds < 2592000) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
    
    return formatDate(dateObj);
  } catch (error) {
    return 'Fecha inválida';
  }
};

/**
 * Verificar si una fecha está vencida
 */
export const isOverdue = (dueDate: string | Date): boolean => {
  try {
    const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
    if (!isValid(dateObj)) return false;
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    dateObj.setHours(0, 0, 0, 0);
    
    return dateObj < now;
  } catch (error) {
    return false;
  }
};

/**
 * Verificar si una fecha está próxima a vencer (dentro de 3 días)
 */
export const isDueSoon = (dueDate: string | Date): boolean => {
  try {
    const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate;
    if (!isValid(dateObj)) return false;
    
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    
    now.setHours(0, 0, 0, 0);
    threeDaysFromNow.setHours(23, 59, 59, 999);
    dateObj.setHours(0, 0, 0, 0);
    
    return dateObj >= now && dateObj <= threeDaysFromNow;
  } catch (error) {
    return false;
  }
};

/**
 * Capitalizar primera letra
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formatear nombre completo
 */
export const formatFullName = (nombre: string, apellidos: string): string => {
  return `${capitalize(nombre)} ${capitalize(apellidos)}`.trim();
};

/**
 * Generar iniciales
 */
export const getInitials = (nombre: string, apellidos: string): string => {
  const firstInitial = nombre?.charAt(0)?.toUpperCase() || '';
  const lastInitial = apellidos?.charAt(0)?.toUpperCase() || '';
  return `${firstInitial}${lastInitial}`;
};

/**
 * Validar email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Formatear tamaño de archivo
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Obtener extensión de archivo
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

/**
 * Generar color aleatorio para avatar
 */
export const generateAvatarColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
