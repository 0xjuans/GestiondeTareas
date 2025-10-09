/**
 * Componente principal de la aplicación
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, NotificationProvider } from './context';
import { ProtectedRoute } from './components/auth';
import { Layout } from './components/common';
import { Login, Dashboard, NotFound } from './pages';
import { ROUTES } from './utils/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Ruta pública - Login */}
              <Route path={ROUTES.LOGIN} element={<Login />} />
              
              {/* Rutas protegidas */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                {/* Dashboard */}
                <Route index element={<Dashboard />} />
                
                {/* Rutas específicas por rol se añadirán aquí */}
                {/* Ejemplo:
                <Route path={ROUTES.TASKS} element={<TaskList />} />
                <Route path={`${ROUTES.TASKS}/manage`} element={
                  <ProtectedRoute requiredRole={USER_ROLES.TEACHER}>
                    <TaskManagement />
                  </ProtectedRoute>
                } />
                */}
              </Route>
              
              {/* Ruta 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Container para notificaciones toast */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
