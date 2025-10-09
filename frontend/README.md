# Sistema de Gestión de Tareas - Frontend

Frontend moderno del sistema de gestión de tareas escolares desarrollado con React, TypeScript y Bootstrap.

## 🚀 Tecnologías Utilizadas

- **React 18** - Biblioteca para interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **React Bootstrap** - Componentes Bootstrap para React
- **React Router DOM** - Enrutamiento en React
- **React Hook Form** - Manejo de formularios
- **Axios** - Cliente HTTP
- **React Toastify** - Notificaciones toast
- **date-fns** - Manipulación de fechas

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes comunes (Header, Sidebar, Layout)
│   ├── auth/           # Componentes de autenticación
│   ├── admin/          # Componentes para administradores
│   ├── teacher/        # Componentes para profesores
│   └── student/        # Componentes para estudiantes
├── pages/              # Páginas principales
├── context/            # Contextos de React (Auth, Notifications)
├── services/           # Servicios para API
├── types/              # Definiciones de tipos TypeScript
├── utils/              # Utilidades y constantes
└── hooks/              # Hooks personalizados
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   REACT_APP_API_URL=http://localhost:3001/api
   REACT_APP_NAME=Sistema de Gestión de Tareas
   REACT_APP_VERSION=2.0.0
   REACT_APP_DEBUG=true
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm start
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

## 🔧 Scripts Disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Expone la configuración de webpack

## 👥 Roles de Usuario

### 👨‍💼 Administrador
- Gestión completa de usuarios
- Gestión de grupos y materias
- Dashboard con estadísticas globales

### 👨‍🏫 Profesor
- Crear, editar y eliminar tareas
- Calificar entregas de estudiantes
- Ver entregas y progreso de estudiantes
- Dashboard con estadísticas de clases

### 👨‍🎓 Estudiante
- Ver tareas asignadas
- Entregar tareas con archivos adjuntos
- Ver calificaciones y comentarios
- Dashboard con progreso personal

## 🔐 Autenticación

El sistema utiliza un sistema de autenticación basado en tokens JWT:

- Login con email y contraseña
- Tokens almacenados en localStorage
- Protección de rutas por roles
- Logout automático en caso de token expirado

## 🎨 Diseño y UX

- **Diseño responsivo** - Adaptable a todos los dispositivos
- **Tema claro** - Interfaz limpia y moderna
- **Navegación intuitiva** - Sidebar dinámico según el rol
- **Feedback visual** - Notificaciones toast y estados de carga
- **Accesibilidad** - Componentes accesibles con Bootstrap

## 📱 Componentes Principales

### Layout
- **Header** - Barra superior con perfil y notificaciones
- **Sidebar** - Navegación lateral dinámica por rol
- **Layout** - Estructura principal de la aplicación

### Autenticación
- **Login** - Formulario de inicio de sesión
- **ProtectedRoute** - Protección de rutas por autenticación y roles

### Dashboard
- **Dashboard** - Página principal con estadísticas y resumen

## 🔌 Integración con API

El frontend se conecta con el backend a través de:

- **Servicios RESTful** - Endpoints estándar
- **Autenticación JWT** - Tokens en headers
- **Manejo de errores** - Interceptores de Axios
- **Tipado fuerte** - Interfaces TypeScript para todas las respuestas
