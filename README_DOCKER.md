# 🐳 Gestión de Tareas Escolares - Docker

Sistema completo de gestión de tareas escolares containerizado con Docker.

## 🚀 Características

- **Base de datos profesional** con estructura completa y escalable
- **22 usuarios de ejemplo** (2 administradores, 5 profesores, 15 estudiantes)
- **3 grupos escolares** (1°A, 2°B, 3°C Secundaria)
- **7 materias académicas** con áreas específicas
- **30 tareas de ejemplo** distribuidas en todas las materias
- **Sistema de notificaciones** sin duplicados
- **Gestión completa** de tareas, entregas y calificaciones

## 🛠️ Requisitos

- Docker Desktop
- Docker Compose
- Puerto 8080 disponible para la aplicación web
- Puerto 8081 disponible para phpMyAdmin

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd GestiondeTareas
```

### 2. Construir y ejecutar
```bash
docker compose up -d --build
```

### 3. Esperar inicialización
La base de datos se inicializa automáticamente con todos los datos de ejemplo.

## 🌐 Acceso

- **Aplicación Web**: http://localhost:8080
- **phpMyAdmin**: http://localhost:8081

## 👥 Usuarios de Prueba

### 🔐 Administradores
| Usuario | Contraseña | Rol |
|---------|------------|-----|
| `admin` | `admin123` | Administrador Principal |
| `director` | `director123` | Director del Colegio |

### 👨‍🏫 Profesores
| Usuario | Contraseña | Materia Principal |
|---------|------------|-------------------|
| `profesor1` | `prof123` | Matemáticas y Español |
| `profesor2` | `prof123` | Ciencias y Matemáticas |
| `profesor3` | `prof123` | Español y Ciencias |

### 👨‍🎓 Estudiantes
| Usuario | Contraseña | Grupo |
|---------|------------|-------|
| `estudiante1` a `estudiante3` | `est123` | 1°A Secundaria |
| `estudiante4` a `estudiante5` | `est123` | 2°B Secundaria |

## 🗄️ Estructura de la Base de Datos

### Tablas Principales
- **usuarios**: Gestión de usuarios del sistema
- **roles**: Roles y permisos (administrador, profesor, estudiante)
- **grupos**: Grupos escolares organizados por grado y sección
- **materias**: Materias académicas con áreas específicas
- **tareas**: Tareas asignadas por los profesores
- **entregas_tarea**: Entregas realizadas por los estudiantes
- **notificaciones**: Sistema de notificaciones del sistema

### Relaciones
- **profesor_grupo**: Asignación de profesores a grupos
- **estudiante_grupo**: Matrícula de estudiantes en grupos
- **profesor_materia**: Especialidades de los profesores
- **grupo_materia**: Horarios y aulas de las materias por grupo

## 📚 Materias Disponibles

1. **Matemáticas I** - Curso básico de matemáticas
2. **Español** - Lengua y literatura española
3. **Ciencias Naturales** - Introducción a las ciencias naturales
4. **Historia y Geografía** - Historia universal y geografía
5. **Arte y Cultura** - Arte, música y expresión cultural
6. **Educación Física** - Deportes y actividad física
7. **Tecnología e Informática** - Computación y tecnología

## 🎯 Estructura de Tareas

- **Título**: Nombre descriptivo de la tarea
- **Descripción**: Instrucciones detalladas para completar la tarea
- **Fecha de Entrega**: Fecha límite para entregar la tarea
- **Materia**: Asignatura a la que pertenece la tarea
- **Grupo**: Grupo escolar al que se asigna la tarea
- **Profesor**: Docente responsable de la tarea
- **Estado**: Estado actual de la tarea (pendiente, en progreso, completada, vencida, calificada)

## 🔧 Comandos Útiles

### Ver logs
```bash
# Logs de la aplicación web
docker logs gestion_tareas_web

# Logs de la base de datos
docker logs gestion_tareas_db

# Logs de phpMyAdmin
docker logs gestion_tareas_phpmyadmin
```

### Reiniciar servicios
```bash
# Reiniciar solo la aplicación web
docker compose restart web

# Reiniciar solo la base de datos
docker compose restart db

# Reiniciar todo
docker compose restart
```

### Detener y limpiar
```bash
# Detener servicios
docker compose down

# Detener y eliminar volúmenes (¡CUIDADO! Esto elimina todos los datos)
docker compose down -v
```

## 📊 Volúmenes Docker

- **db_data**: Datos persistentes de la base de datos
- **uploads**: Archivos subidos por los usuarios

## 🚨 Solución de Problemas

### Base de datos no se conecta
```bash
# Verificar que MySQL esté ejecutándose
docker logs gestion_tareas_db

# Reiniciar la base de datos
docker compose restart db
```

### Cambios en el código no se reflejan
```bash
# Reconstruir la imagen
docker compose up -d --build
```

### Problemas de permisos
```bash
# Verificar permisos de archivos
docker exec gestion_tareas_web ls -la /var/www/html/GestiondeTareas
```

## 📝 Notas Importantes

- **Contraseñas**: Las contraseñas están simplificadas para facilitar las pruebas (admin123, prof123, est123)
- **Notificaciones**: El sistema de notificaciones está optimizado para evitar duplicados
- **Caracteres especiales**: La base de datos está configurada para manejar correctamente tildes y ñ
- **Zona horaria**: Configurada para Colombia (UTC-5)
- **Estructura**: Las tablas coinciden exactamente con el dump de phpMyAdmin proporcionado

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para la gestión educativa moderna**

