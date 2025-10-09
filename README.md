# Sistema de Gestión de Tareas Escolares

Sistema moderno de gestión de tareas para instituciones educativas, desarrollado con tecnologías web modernas.

## 🏗️ Arquitectura

Este proyecto está migrando de una arquitectura PHP tradicional a una arquitectura moderna con:

- **Frontend**: React + TypeScript + Bootstrap
- **Backend**: Node.js + Express + TypeScript (en desarrollo)
- **Base de Datos**: MySQL
- **Backend Python**: Para procesamiento de datos y ML (futuro)

## 📁 Estructura del Proyecto

```
├── frontend/           # Aplicación React + TypeScript
├── backend/           # API Node.js + Express (próximamente)
├── database/          # Scripts de base de datos
└── docs/             # Documentación del proyecto
```

## 🚀 Inicio Rápido

### Frontend (React + TypeScript)

```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en: `http://localhost:3000`

### Requisitos

- Node.js 16+
- npm o yarn
- MySQL 8.0+

## 👥 Roles de Usuario

- **👨‍💼 Administrador**: Gestión completa del sistema
- **👨‍🏫 Profesor**: Gestión de tareas y calificaciones
- **👨‍🎓 Estudiante**: Visualización y entrega de tareas

## 📋 Funcionalidades

### ✅ Implementadas (Frontend)
- Sistema de autenticación con JWT
- Dashboard dinámico por rol
- Navegación responsive
- Gestión de notificaciones
- Interfaz moderna con Bootstrap

### 🔄 En Desarrollo
- Backend API con Node.js + Express
- Conexión con base de datos MySQL
- Endpoints de autenticación y tareas

### 📅 Próximas
- Sistema de archivos adjuntos
- Notificaciones en tiempo real
- Reportes y estadísticas avanzadas

## 🛠️ Tecnologías

### Frontend
- React 18 + TypeScript
- Bootstrap 5 + React Bootstrap
- React Router DOM
- Axios + React Hook Form
- React Toastify

### Backend (En desarrollo)
- Node.js + Express + TypeScript
- JWT Authentication
- MySQL + Sequelize/TypeORM
- Socket.io (futuro)

## 📖 Documentación

- [Frontend Documentation](./frontend/README.md)
- [API Documentation](./docs/api.md) (próximamente)
- [Database Schema](./docs/database.md) (próximamente)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas de Migración

Este proyecto está siendo migrado desde una aplicación PHP existente. El frontend ya está completamente migrado a React + TypeScript. El backend está en proceso de migración a Node.js + Express.

### Estado Actual
- ✅ Frontend React + TypeScript (Completado)
- 🔄 Backend Node.js + Express (En desarrollo)
- ⏳ Base de datos (Migración pendiente)
- ⏳ Backend Python (Planificado)

## 📞 Contacto

Para preguntas sobre el proyecto, contacta al equipo de desarrollo.
