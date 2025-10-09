/**
 * Página de inicio de sesión con diseño elegante
 */

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ROUTES } from '../utils/constants';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Login.css';

// Asegurar tipos JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email('Debe ser un email válido')
    .required('El email es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

export const Login: React.FC = () => {
  const { login, isLoading, isAuthenticated } = useAuth();
  const [loginError, setLoginError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  // Redirigir si ya está autenticado
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError('');
      const success = await login(data);
      
      if (success) {
        toast.success('Inicio de sesión exitoso');
      } else {
        setLoginError('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setLoginError('Error al iniciar sesión. Intente nuevamente.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="glass-effect">
        <img 
          src="/images/Logo_colegio.webp" 
          alt="Logo Colegio San Francisco de Asís" 
          className="school-logo"
          onError={(e) => {
            // Fallback si no existe la imagen
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />

        <div className="login-header">
          <h2>Bienvenido</h2>
          <p>Sistema de Gestión de Tareas Escolares</p>
        </div>

        {loginError && (
          <Alert variant="danger" className="mb-3 login-alert">
            {loginError}
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <div className="input-wrapper">
              <i className="bi bi-person form-icon"></i>
              <Form.Control
                type="email"
                placeholder="Correo electrónico"
                {...register('email')}
                className="form-control-custom"
                isInvalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <Form.Control.Feedback type="invalid" className="d-block mt-1">
                {errors.email.message}
              </Form.Control.Feedback>
            )}
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <i className="bi bi-lock form-icon"></i>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                {...register('password')}
                className="form-control-custom"
                isInvalid={!!errors.password}
              />
              <i 
                className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} password-toggle`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            {errors.password && (
              <Form.Control.Feedback type="invalid" className="d-block mt-1">
                {errors.password.message}
              </Form.Control.Feedback>
            )}
          </div>

          <Button
            type="submit"
            className="btn-login"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" variant="light" text="" />
            ) : (
              'Iniciar Sesión'
            )}
          </Button>
        </Form>

        <div className="forgot-password">
          <small>
            ¿Problemas para acceder? Contacta al administrador
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;