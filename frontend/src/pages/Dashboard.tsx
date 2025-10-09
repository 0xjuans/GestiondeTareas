/**
 * Página principal del dashboard
 */

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { taskService } from '../services/taskService';
import { formatDate, formatRelativeTime, isOverdue, isDueSoon } from '../utils/helpers';
import { USER_ROLES } from '../utils/constants';
import { Task } from '../types/task';
import { DashboardStats } from '../types/common';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Cargar estadísticas
      const statsResponse = await taskService.getDashboardStats();
      if (statsResponse.success && statsResponse.data) {
        setStats(statsResponse.data);
      }

      // Cargar tareas recientes
      const tasksResponse = await taskService.getTasks();
      if (tasksResponse.success && tasksResponse.data) {
        setRecentTasks(tasksResponse.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error cargando dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWelcomeMessage = () => {
    if (!user) return 'Bienvenido';
    
    const roleMessages = {
      [USER_ROLES.ADMIN]: 'Panel de Administración',
      [USER_ROLES.TEACHER]: 'Panel del Profesor',
      [USER_ROLES.STUDENT]: 'Panel del Estudiante',
    };

    return roleMessages[user.rol_nombre as keyof typeof roleMessages] || 'Dashboard';
  };

  const getStatsCards = () => {
    if (!stats) return null;

    const cards = [
      {
        title: 'Total Tareas',
        value: stats.total_tareas,
        variant: 'primary',
        icon: 'bi-clipboard-check',
      },
      {
        title: 'Pendientes',
        value: stats.tareas_pendientes,
        variant: 'warning',
        icon: 'bi-clock',
      },
      {
        title: 'Completadas',
        value: stats.tareas_completadas,
        variant: 'success',
        icon: 'bi-check-circle',
      },
      {
        title: 'Vencidas',
        value: stats.tareas_vencidas,
        variant: 'danger',
        icon: 'bi-exclamation-triangle',
      },
    ];

    return cards.map((card, index) => (
      <Col md={6} lg={3} key={index}>
        <Card className="h-100 shadow-sm">
          <Card.Body className="text-center">
            <div className={`text-${card.variant} mb-2`}>
              <i className={`${card.icon} fs-1`}></i>
            </div>
            <Card.Title className="h3 mb-1">{card.value}</Card.Title>
            <Card.Text className="text-muted">{card.title}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <LoadingSpinner size="sm" text="Cargando dashboard..." />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="h2 mb-1">{getWelcomeMessage()}</h1>
        <p className="text-muted">
          Bienvenido de vuelta, {user?.nombre}. Aquí tienes un resumen de tu actividad.
        </p>
      </div>

      {/* Estadísticas */}
      <Row className="mb-4">
        {getStatsCards()}
      </Row>

      {/* Tareas Recientes */}
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Tareas Recientes</h5>
            </Card.Header>
            <Card.Body>
              {recentTasks.length === 0 ? (
                <p className="text-muted text-center py-3">
                  No hay tareas disponibles
                </p>
              ) : (
                <ListGroup variant="flush">
                  {recentTasks.map((task) => (
                    <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{task.titulo}</h6>
                        <p className="mb-1 text-muted small">
                          {task.materia_nombre} • {task.grupo_nombre}
                        </p>
                        <small className="text-muted">
                          Entrega: {formatDate(task.fecha_entrega)}
                        </small>
                      </div>
                      <div className="text-end">
                        <Badge 
                          bg={
                            isOverdue(task.fecha_entrega) ? 'danger' :
                            isDueSoon(task.fecha_entrega) ? 'warning' :
                            'success'
                          }
                          className="mb-1"
                        >
                          {task.estado_nombre}
                        </Badge>
                        <br />
                        <small className="text-muted">
                          {formatRelativeTime(task.fecha_creacion)}
                        </small>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Acciones Rápidas</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                {user?.rol_nombre === USER_ROLES.TEACHER && (
                  <>
                    <button className="btn btn-primary">
                      <i className="bi bi-plus-circle me-2"></i>
                      Crear Nueva Tarea
                    </button>
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-file-earmark-text me-2"></i>
                      Ver Entregas
                    </button>
                  </>
                )}
                
                {user?.rol_nombre === USER_ROLES.STUDENT && (
                  <>
                    <button className="btn btn-primary">
                      <i className="bi bi-list-task me-2"></i>
                      Ver Mis Tareas
                    </button>
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-file-earmark-arrow-up me-2"></i>
                      Mis Entregas
                    </button>
                  </>
                )}
                
                {user?.rol_nombre === USER_ROLES.ADMIN && (
                  <>
                    <button className="btn btn-primary">
                      <i className="bi bi-people me-2"></i>
                      Gestión de Usuarios
                    </button>
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-collection me-2"></i>
                      Gestión de Grupos
                    </button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
