/**
 * Componente de barra lateral con navegación
 */

import React from 'react';
import { Nav } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { ROUTES, USER_ROLES } from '../../utils/constants';
import { formatFullName, getInitials, generateAvatarColor } from '../../utils/helpers';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getNavigationItems = () => {
    const baseItems = [
      { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: 'bi-house' },
    ];

    switch (user.rol_nombre) {
      case USER_ROLES.ADMIN:
        return [
          ...baseItems,
          { path: ROUTES.USERS, label: 'Gestión de Usuarios', icon: 'bi-people' },
          { path: ROUTES.GROUPS, label: 'Gestión de Grupos', icon: 'bi-collection' },
          { path: ROUTES.SUBJECTS, label: 'Gestión de Materias', icon: 'bi-book' },
        ];

      case USER_ROLES.TEACHER:
        return [
          ...baseItems,
          { path: `${ROUTES.TASKS}/manage`, label: 'Gestión de Tareas', icon: 'bi-clipboard-check' },
          { path: `${ROUTES.SUBMISSIONS}/all`, label: 'Entregas de Estudiantes', icon: 'bi-file-earmark-text' },
          { path: ROUTES.GROUPS, label: 'Mis Grupos', icon: 'bi-collection' },
        ];

      case USER_ROLES.STUDENT:
        return [
          ...baseItems,
          { path: `${ROUTES.TASKS}/assigned`, label: 'Mis Tareas', icon: 'bi-list-task' },
          { path: `${ROUTES.SUBMISSIONS}/my`, label: 'Mis Entregas', icon: 'bi-file-earmark-arrow-up' },
          { path: `${ROUTES.TASKS}/completed`, label: 'Tareas Completadas', icon: 'bi-check-circle' },
        ];

      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="sidebar bg-dark text-white" style={{ minHeight: '100vh', width: '250px' }}>
      {/* Información del usuario */}
      <div className="p-3 border-bottom border-secondary">
        <div className="d-flex align-items-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: generateAvatarColor(user.email),
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {getInitials(user.nombre, user.apellidos)}
          </div>
          <div>
            <div className="fw-bold">{formatFullName(user.nombre, user.apellidos)}</div>
            <small className="text-muted">{user.rol_nombre}</small>
          </div>
        </div>
      </div>

      {/* Navegación */}
      <Nav className="flex-column p-3">
        {navigationItems.map((item) => (
          <Nav.Item key={item.path}>
            <Nav.Link 
              href={item.path}
              className="text-white d-flex align-items-center py-2"
              style={{ 
                borderRadius: '8px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <i className={`${item.icon} me-3`}></i>
              {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Footer */}
      <div className="position-absolute bottom-0 start-0 end-0 p-3 border-top border-secondary">
        <small className="text-muted">
          Sistema de Gestión de Tareas
          <br />
          Versión 2.0
        </small>
      </div>
    </div>
  );
};

export default Sidebar;
