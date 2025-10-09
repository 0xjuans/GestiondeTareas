/**
 * Componente de carga/spinner
 */

import React from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingSpinnerProps {
  size?: 'sm';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  className?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'sm',
  variant = 'primary',
  className = '',
  text = 'Cargando...'
}) => {
  return (
    <div className={`d-flex align-items-center justify-content-center ${className}`}>
      <Spinner 
        animation="border" 
        size={size} 
        variant={variant}
        className="me-2"
      />
      <span className="text-muted">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
