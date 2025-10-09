# Sistema de Gestión de Tareas - Backend API

Backend API REST desarrollado con Node.js, Express y TypeScript para el sistema de gestión de tareas escolares.

## 🚀 Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **TypeScript** - Tipado estático
- **MySQL2** - Cliente de base de datos
- **JWT** - Autenticación con tokens
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Control de acceso entre orígenes

## 📁 Estructura del Proyecto

```
src/
├── config/           # Configuraciones (BD, etc.)
├── controllers/      # Controladores de rutas
├── middleware/       # Middleware personalizado
├── models/          # Modelos de datos
├── routes/          # Definición de rutas
├── types/           # Tipos de TypeScript
├── utils/           # Utilidades
└── server.ts        # Punto de entrada
```

## 🛠️ Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   
   Crea un archivo `.env` en la raíz del backend:
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=gestion_tareas_escolares

   # JWT Configuration
   JWT_SECRET=sistema-gestion-tareas-secret-key-2024
   JWT_EXPIRES_IN=7d

   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Asegurarse de que la base de datos esté creada:**
   ```bash
   # Ejecutar el script schema.sql en MySQL
   mysql -u root -p < ../app/models/database/schema.sql
   ```

## 🚀 Uso

### Modo Desarrollo
```bash
npm run dev
```

### Compilar
```bash
npm run build
```

### Producción
```bash
npm start
```

## 📡 Endpoints de la API

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual
- `POST /api/auth/logout` - Cerrar sesión

### Usuarios (Solo administradores)
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Tareas
- `GET /api/tasks` - Obtener tareas (según rol)
- `GET /api/tasks/:id` - Obtener tarea por ID
- `POST /api/tasks` - Crear tarea (profesor/admin)
- `PUT /api/tasks/:id` - Actualizar tarea (profesor/admin)
- `DELETE /api/tasks/:id` - Eliminar tarea (profesor/admin)

### Dashboard
- `GET /api/dashboard/stats` - Obtener estadísticas

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Incluye el token en el header de las peticiones:

```
Authorization: Bearer <token>
```

## 👥 Roles de Usuario

- **Administrador** (rol_id: 1) - Acceso completo
- **Profesor** (rol_id: 2) - Gestión de tareas
- **Estudiante** (rol_id: 3) - Visualización de tareas

## 🧪 Ejemplo de Uso

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@escuela.edu",
    "password": "admin123"
  }'
```

### Obtener Usuario Actual
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer <tu-token>"
```

### Crear Tarea (Profesor)
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu-token>" \
  -d '{
    "titulo": "Tarea de Matemáticas",
    "descripcion": "Resolver ejercicios del capítulo 5",
    "fecha_entrega": "2024-12-31",
    "materia_id": 1,
    "grupo_id": 1
  }'
```

## 📝 Respuesta de la API

Todas las respuestas siguen el formato:

### Éxito
```json
{
  "success": true,
  "data": { ... },
  "message": "Mensaje opcional"
}
```

### Error
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles del error"
}
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo con hot-reload
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Inicia el servidor en producción
- `npm test` - Ejecuta tests (pendiente)

## 🌐 CORS

El servidor acepta peticiones desde:
- `http://localhost:3000` (Frontend en desarrollo)

Configurable en la variable de entorno `CORS_ORIGIN`.
