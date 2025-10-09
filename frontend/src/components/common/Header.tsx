/**
 * Componente de encabezado
 */

import React from 'react';
import { Navbar, Nav, Dropdown, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { formatFullName, getInitials, generateAvatarColor } from '../../utils/helpers';
import { ROUTES } from '../../utils/constants';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { unreadCount, notifications } = useNotifications();

  const handleLogout = () => {
    logout();
  };

  if (!user) return null;

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <div className="container-fluid">
        <Navbar.Brand href="#home">
          <strong>Sistema de Gestión de Tareas</strong>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Notificaciones */}
            <Dropdown className="me-3">
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-notifications">
                <i className="bi bi-bell"></i>
                {unreadCount > 0 && (
                  <Badge bg="danger" className="ms-1">
                    {unreadCount}
                  </Badge>
                )}
              </Dropdown.Toggle>
              
              <Dropdown.Menu align="end" style={{ minWidth: '300px' }}>
                <Dropdown.Header>Notificaciones</Dropdown.Header>
                {notifications.length === 0 ? (
                  <Dropdown.ItemText className="text-muted">
                    No hay notificaciones
                  </Dropdown.ItemText>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <Dropdown.Item 
                      key={notification.id}
                      className={!notification.leida ? 'bg-light' : ''}
                    >
                      <div>
                        <div className="fw-bold">{notification.titulo}</div>
                        <small className="text-muted">
                          {notification.mensaje.substring(0, 50)}...
                        </small>
                      </div>
                    </Dropdown.Item>
                  ))
                )}
                <Dropdown.Divider />
                <Dropdown.Item href={ROUTES.NOTIFICATIONS}>
                  Ver todas las notificaciones
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Perfil de usuario */}
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-profile">
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-2"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: generateAvatarColor(user.email),
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {getInitials(user.nombre, user.apellidos)}
                  </div>
                  <span className="d-none d-md-inline">
                    {formatFullName(user.nombre, user.apellidos)}
                  </span>
                </div>
              </Dropdown.Toggle>
              
              <Dropdown.Menu align="end">
                <Dropdown.Header>
                  <div className="fw-bold">{formatFullName(user.nombre, user.apellidos)}</div>
                  <small className="text-muted">{user.email}</small>
                  <Badge bg="secondary" className="ms-2">
                    {user.rol_nombre}
                  </Badge>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item href={ROUTES.PROFILE}>
                  <i className="bi bi-person me-2"></i>
                  Mi Perfil
                </Dropdown.Item>
                <Dropdown.Item href={ROUTES.NOTIFICATIONS}>
                  <i className="bi bi-bell me-2"></i>
                  Notificaciones
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
