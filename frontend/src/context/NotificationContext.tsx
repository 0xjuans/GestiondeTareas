/**
 * Contexto para manejar notificaciones globales
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification } from '../types/common';
import { apiService } from '../services/api';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: number) => void;
  markAllAsRead: () => void;
  refreshNotifications: () => Promise<void>;
  isLoading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Calcular notificaciones no leídas
  const unreadCount = notifications.filter(n => !n.leida).length;

  // Cargar notificaciones
  const refreshNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.get('/notifications');
      if (response.success) {
        setNotifications(response.data || []);
      }
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Marcar notificación como leída
  const markAsRead = async (notificationId: number) => {
    try {
      await apiService.patch(`/notifications/${notificationId}/read`);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, leida: true } : n)
      );
    } catch (error) {
      console.error('Error marcando notificación como leída:', error);
    }
  };

  // Marcar todas como leídas
  const markAllAsRead = async () => {
    try {
      await apiService.patch('/notifications/mark-all-read');
      setNotifications(prev => 
        prev.map(n => ({ ...n, leida: true }))
      );
    } catch (error) {
      console.error('Error marcando todas las notificaciones como leídas:', error);
    }
  };

  // Cargar notificaciones al montar el componente
  useEffect(() => {
    refreshNotifications();
  }, []);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refreshNotifications,
    isLoading
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications debe ser usado dentro de un NotificationProvider');
  }
  return context;
};
