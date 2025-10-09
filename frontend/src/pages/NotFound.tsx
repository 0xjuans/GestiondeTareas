/**
 * Página 404 - No encontrado
 */

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col md={6}>
          <div className="py-5">
            <h1 className="display-1 text-muted">404</h1>
            <h2 className="h3 mb-3">Página no encontrada</h2>
            <p className="text-muted mb-4">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            <Button variant="primary" onClick={handleGoHome}>
              Volver al Dashboard
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
