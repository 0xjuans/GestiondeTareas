# 📚 Sistema de Gestión de Tareas Escolares

Sistema web completo para la gestión de tareas escolares desarrollado en PHP con arquitectura MVC, base de datos MySQL y despliegue automatizado con Docker.

## 🚀 Características Principales

- **🔐 Sistema de Autenticación** con roles diferenciados (Administrador, Profesor, Estudiante)
- **👥 Gestión de Usuarios** completa con perfiles personalizables
- **📚 Gestión de Materias** y asignación de profesores
- **👨‍🏫 Gestión de Grupos** escolares con matrícula de estudiantes
- **📝 Sistema de Tareas** con asignación, seguimiento y calificación
- **📤 Sistema de Entregas** con archivos adjuntos
- **🔔 Notificaciones** en tiempo real
- **📊 Dashboard** con estadísticas y métricas
- **🌙 Modo Oscuro** para mejor experiencia de usuario
- **📱 Diseño Responsivo** para todos los dispositivos

## 🛠️ Tecnologías Utilizadas

- **Backend**: PHP 8.2 con arquitectura MVC
- **Base de Datos**: MySQL 8.0
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Servidor Web**: Apache con mod_rewrite
- **Containerización**: Docker y Docker Compose
- **Gestión de Dependencias**: Composer (preparado)

## 📋 Requisitos del Sistema

### Para Desarrollo Local
- PHP 8.2 o superior
- MySQL 8.0 o superior
- Apache con mod_rewrite habilitado
- Composer (opcional)

### Para Docker (Recomendado)
- Docker Desktop
- Docker Compose
- 4GB RAM mínimo
- 2GB espacio en disco

## 🐳 Instalación con Docker (Recomendado)

### 1. Clonar el Repositorio
```bash
git clone https://github.com/0xjuans/GestiondeTareas.git
cd GestiondeTareas
```

### 2. Ejecutar con Docker Compose
```bash
# Construir y ejecutar todos los servicios
docker compose up -d --build

# Ver logs en tiempo real
docker compose logs -f
```

### 3. Acceder a la Aplicación
- **🌐 Aplicación Web**: http://localhost:8080
- **🗄️ phpMyAdmin**: http://localhost:8081

## 🔧 Instalación Manual (Desarrollo)

### 1. Configurar Base de Datos
```sql
-- Crear base de datos
CREATE DATABASE gestion_tareas_escolares CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Importar esquema
mysql -u root -p gestion_tareas_escolares < app/models/database/schema.sql

-- Importar datos iniciales
mysql -u root -p gestion_tareas_escolares < app/models/database/initial_data.sql
```

### 2. Configurar Variables de Entorno
```bash
# Copiar archivo de configuración
cp app/config/DbConfig.example.php app/config/DbConfig.php

# Editar configuración de base de datos
nano app/config/DbConfig.php
```

### 3. Configurar Servidor Web
```apache
# Habilitar mod_rewrite
a2enmod rewrite

# Configurar DocumentRoot
DocumentRoot /ruta/a/tu/proyecto
<Directory /ruta/a/tu/proyecto>
    AllowOverride All
    Require all granted
</Directory>
```

## 👥 Usuarios de Prueba

### 🔐 Administradores
| Usuario | Contraseña | Descripción |
|---------|------------|-------------|
| `admin` | `admin123` | Administrador Principal |
| `director` | `director123` | Director del Colegio |

### 👨‍🏫 Profesores
| Usuario | Contraseña | Materias |
|---------|------------|----------|
| `profesor1` | `prof123` | Matemáticas, Español |
| `profesor2` | `prof123` | Ciencias, Matemáticas |
| `profesor3` | `prof123` | Español, Ciencias |

### 👨‍🎓 Estudiantes
| Usuario | Contraseña | Grupo |
|---------|------------|-------|
| `estudiante1` | `est123` | 1°A Secundaria |
| `estudiante2` | `est123` | 1°A Secundaria |
| `estudiante3` | `est123` | 1°A Secundaria |

## 🏗️ Estructura del Proyecto

```
GestiondeTareas/
├── app/                          # Código de la aplicación
│   ├── config/                   # Configuraciones
│   ├── controllers/              # Controladores MVC
│   ├── models/                   # Modelos de datos
│   ├── views/                    # Vistas y plantillas
│   └── ajax/                     # Endpoints AJAX
├── public/                       # Archivos públicos
│   ├── assets/                   # CSS, JS, imágenes
│   └── uploads/                  # Archivos subidos
├── docker/                       # Configuración Docker
├── tests/                        # Tests automatizados
└── utils/                        # Utilidades del sistema
```

## 🔄 Flujo de Trabajo

### Para Estudiantes
1. **Iniciar Sesión** con credenciales de estudiante
2. **Ver Tareas Asignadas** en el dashboard
3. **Completar Tareas** y subir archivos
4. **Revisar Calificaciones** y feedback
5. **Recibir Notificaciones** de nuevas tareas

### Para Profesores
1. **Gestionar Materias** y grupos asignados
2. **Crear Tareas** con descripción y fecha límite
3. **Revisar Entregas** de los estudiantes
4. **Calificar Tareas** con comentarios
5. **Enviar Notificaciones** a los grupos

### Para Administradores
1. **Gestionar Usuarios** del sistema
2. **Administrar Grupos** y materias
3. **Configurar Permisos** y roles
4. **Monitorear Actividad** del sistema
5. **Generar Reportes** y estadísticas

## 🚨 Solución de Problemas

### Problemas Comunes con Docker

#### Base de datos no se conecta
```bash
# Verificar estado del contenedor
docker ps -a

# Ver logs de MySQL
docker logs gestion_tareas_db

# Reiniciar servicio
docker compose restart db
```

#### Cambios no se reflejan
```bash
# Reconstruir imagen
docker compose up -d --build

# Limpiar cache
docker system prune -f
```

#### Problemas de permisos
```bash
# Verificar permisos
docker exec gestion_tareas_web ls -la /var/www/html/GestiondeTareas

# Corregir permisos
docker exec gestion_tareas_web chown -R www-data:www-data /var/www/html/GestiondeTareas
```

### Problemas Comunes Manuales

#### Error de conexión a base de datos
- Verificar credenciales en `app/config/DbConfig.php`
- Confirmar que MySQL esté ejecutándose
- Verificar que la base de datos exista

#### Página en blanco
- Verificar logs de Apache
- Confirmar que mod_rewrite esté habilitado
- Verificar permisos de archivos

## 📊 Comandos Útiles

### Docker
```bash
# Ver estado de servicios
docker compose ps

# Ver logs específicos
docker compose logs web
docker compose logs db

# Ejecutar comandos en contenedores
docker exec -it gestion_tareas_web bash
docker exec -it gestion_tareas_db mysql -u appuser -p

# Limpiar recursos no utilizados
docker system prune -a
```

### Desarrollo
```bash
# Verificar sintaxis PHP
php -l app/controllers/*.php

# Verificar permisos
ls -la app/config/
ls -la public/uploads/

# Limpiar cache del navegador
# Ctrl+Shift+R o Cmd+Shift+R
```

## 🧪 Testing

El proyecto incluye tests automatizados en Python:

```bash
cd tests/Dashboard
python -m pytest test_Admin1.py -v
python -m pytest test_Admin2.py -v
```

## 📈 Características Avanzadas

- **🔍 Búsqueda Inteligente** de tareas y usuarios
- **📅 Calendario Integrado** para fechas de entrega
- **📊 Gráficos Estadísticos** del rendimiento
- **📱 Notificaciones Push** (preparado)
- **🔒 Sistema de Permisos** granular
- **📝 Historial de Cambios** completo
- **🔄 Backup Automático** de base de datos

## 🤝 Contribuir al Proyecto

1. **Fork** el repositorio
2. **Crea una rama** para tu feature (`git checkout -b feature/NuevaFuncionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/NuevaFuncionalidad`)
5. **Abre un Pull Request**

### Guías de Contribución
- Sigue las convenciones de código del proyecto
- Documenta nuevas funcionalidades
- Incluye tests para código nuevo
- Mantén la compatibilidad con versiones anteriores

## 📝 Changelog

### v1.0.0 (Actual)
- ✅ Sistema de autenticación completo
- ✅ Gestión de usuarios y roles
- ✅ Sistema de tareas y entregas
- ✅ Notificaciones en tiempo real
- ✅ Dashboard responsivo
- ✅ Modo oscuro
- ✅ Dockerización completa

### Próximas Versiones
- 🔄 API REST completa
- 🔄 Sistema de chat en tiempo real
- 🔄 App móvil nativa
- 🔄 Integración con Google Classroom
- 🔄 Sistema de reportes avanzados

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autores

- **Juan Sebastián** - [@JuanSebastian23](https://github.com/JuanSebastian23)
- **Brandon** - [@BrandonB30](https://github.com/BrandonB30)
- **JhRA** - [@JhRA9](https://github.com/JhRA9)
- **Estefanía** - [@EstefaniaMalagon](https://github.com/EstefaniaMalagon)
- **Daniela** - [@RDaniela1](https://github.com/RDaniela1)

## 🙏 Agradecimientos

- Comunidad de desarrolladores PHP
- Equipo de Docker por la excelente herramienta
- Bootstrap por el framework CSS
- Todos los contribuidores del proyecto

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/0xjuans/GestiondeTareas/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/0xjuans/GestiondeTareas/discussions)
- **Wiki**: [Documentación del Proyecto](https://github.com/0xjuans/GestiondeTareas/wiki)

---

**⭐ Si este proyecto te es útil, ¡déjanos una estrella en GitHub!**

**🚀 Desarrollado con ❤️ para la gestión educativa moderna**
