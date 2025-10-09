/**
 * Componente de layout principal
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';

export const Layout: React.FC = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header />
      
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-grow-1 bg-light">
          <Container fluid className="py-4">
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Layout;
