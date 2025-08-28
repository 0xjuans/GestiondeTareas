# 🐳 Configuración Docker - Gestión de Tareas Escolares

Esta carpeta contiene toda la configuración necesaria para ejecutar el proyecto usando Docker.

## 📁 Estructura de Archivos

```
docker/
├── README.md                    # Este archivo
├── mysql/                       # Configuración de MySQL
│   └── init/                    # Scripts de inicialización
│       ├── 00_charset_config.sql    # Configuración de caracteres
│       ├── 01_schema.sql            # Esquema de la base de datos
│       ├── 02_initial_data.sql      # Datos iniciales
│       └── 03_sample_tasks.sql      # Tareas de ejemplo
└── Dockerfile                   # Imagen de la aplicación web
```

## 🚀 Inicio Rápido

### 1. Verificar Docker
```bash
# Verificar que Docker esté instalado
docker --version
docker compose version
```

### 2. Ejecutar el Proyecto
```bash
# Construir y ejecutar
docker compose up -d --build

# Ver logs
docker compose logs -f
```

### 3. Acceder a la Aplicación
- **Web**: http://localhost:8080
- **phpMyAdmin**: http://localhost:8081

## 🔧 Servicios Disponibles

### 🌐 Aplicación Web (Puerto 8080)
- **Imagen**: PHP 8.2 + Apache
- **Características**:
  - PHP 8.2 con extensiones PDO, MySQL
  - Apache con mod_rewrite habilitado
  - DocumentRoot configurado para el proyecto
  - Volumen montado para desarrollo en tiempo real

### 🗄️ Base de Datos MySQL (Puerto 3307)
- **Imagen**: MySQL 8.0.43
- **Características**:
  - Charset UTF8MB4 para soporte completo de caracteres
  - Autenticación nativa de MySQL
  - Inicialización automática con datos de ejemplo
  - Persistencia de datos con volumen Docker

### 🖥️ phpMyAdmin (Puerto 8081)
- **Imagen**: phpMyAdmin 5
- **Características**:
  - Interfaz web para administrar MySQL
  - Conectado automáticamente a la base de datos
  - Usuario: `appuser`, Contraseña: `apppassword`

## 📊 Variables de Entorno

### Aplicación Web
```bash
DB_HOST=db                    # Host de la base de datos
DB_USER=appuser              # Usuario de la base de datos
DB_PASS=apppassword          # Contraseña de la base de datos
DB_NAME=gestion_tareas_escolares  # Nombre de la base de datos
BASE_URL=                     # URL base de la aplicación
APACHE_DOCUMENT_ROOT=/var/www/html/GestiondeTareas  # DocumentRoot de Apache
```

### Base de Datos
```bash
MYSQL_ROOT_PASSWORD=rootpassword      # Contraseña del usuario root
MYSQL_DATABASE=gestion_tareas_escolares  # Base de datos a crear
MYSQL_USER=appuser                    # Usuario de la aplicación
MYSQL_PASSWORD=apppassword            # Contraseña del usuario de la aplicación
```

## 🗄️ Inicialización de la Base de Datos

Los scripts se ejecutan en orden alfabético:

### 1. `00_charset_config.sql`
- Configura el charset y collation del servidor
- Establece UTF8MB4 como charset por defecto
- Configura timezone para Colombia

### 2. `01_schema.sql`
- Crea todas las tablas del sistema
- Establece relaciones y constraints
- Configura índices para optimización

### 3. `02_initial_data.sql`
- Inserta roles del sistema
- Crea usuarios de ejemplo
- Establece grupos y materias

### 4. `03_sample_tasks.sql`
- Crea tareas de ejemplo
- Asigna tareas a grupos y materias
- Genera notificaciones iniciales

## 🔄 Comandos Útiles

### Gestión de Servicios
```bash
# Ver estado
docker compose ps

# Iniciar servicios
docker compose up -d

# Detener servicios
docker compose down

# Reiniciar servicios
docker compose restart

# Ver logs
docker compose logs [servicio]
```

### Base de Datos
```bash
# Acceder a MySQL
docker exec -it gestion_tareas_db mysql -u appuser -p

# Backup de la base de datos
docker exec gestion_tareas_db mysqldump -u appuser -p gestion_tareas_escolares > backup.sql

# Restaurar backup
docker exec -i gestion_tareas_db mysql -u appuser -p gestion_tareas_escolares < backup.sql
```

### Aplicación Web
```bash
# Acceder al contenedor
docker exec -it gestion_tareas_web bash

# Ver logs de Apache
docker exec gestion_tareas_web tail -f /var/log/apache2/error.log

# Verificar permisos
docker exec gestion_tareas_web ls -la /var/www/html/GestiondeTareas
```

## 🚨 Solución de Problemas

### Problema: Base de datos no se inicializa
```bash
# Ver logs de MySQL
docker logs gestion_tareas_db

# Eliminar volumen y recrear
docker compose down -v
docker compose up -d
```

### Problema: Cambios no se reflejan
```bash
# Reconstruir imagen
docker compose up -d --build

# Limpiar cache
docker system prune -f
```

### Problema: Puerto ya en uso
```bash
# Ver qué usa el puerto
netstat -tulpn | grep :8080

# Cambiar puerto en docker-compose.yml
ports:
  - "8081:80"  # Cambiar 8080 por otro puerto
```

### Problema: Permisos de archivos
```bash
# Corregir permisos
docker exec gestion_tareas_web chown -R www-data:www-data /var/www/html/GestiondeTareas
docker exec gestion_tareas_web chmod -R 755 /var/www/html/GestiondeTareas
```

## 📈 Optimización

### Para Producción
```yaml
# En docker-compose.yml
services:
  web:
    restart: unless-stopped
    environment:
      - DEBUG_MODE=false
    volumes:
      - ./:/var/www/html/GestiondeTareas:ro  # Solo lectura en producción
```

### Para Desarrollo
```yaml
# En docker-compose.yml
services:
  web:
    volumes:
      - ./:/var/www/html/GestiondeTareas  # Montaje completo para desarrollo
    environment:
      - DEBUG_MODE=true
```

## 🔒 Seguridad

### Contraseñas por Defecto
- **Root MySQL**: `rootpassword`
- **Usuario App**: `apppassword`
- **Admin Web**: `admin123`

⚠️ **IMPORTANTE**: Cambiar estas contraseñas en producción.

### Puertos Expuestos
- **8080**: Aplicación web (HTTP)
- **8081**: phpMyAdmin (HTTP)
- **3307**: MySQL (TCP)

⚠️ **IMPORTANTE**: En producción, usar HTTPS y limitar acceso a puertos.

## 📝 Personalización

### Cambiar Puertos
```yaml
# En docker-compose.yml
ports:
  - "9000:80"      # Cambiar 8080 por 9000
  - "9001:80"      # Cambiar 8081 por 9001 (phpMyAdmin)
  - "3308:3306"    # Cambiar 3307 por 3308 (MySQL)
```

### Agregar Extensiones PHP
```dockerfile
# En Dockerfile
RUN docker-php-ext-install pdo pdo_mysql mysqli gd mbstring
```

### Cambiar Versión de MySQL
```yaml
# En docker-compose.yml
services:
  db:
    image: mysql:8.0.44  # Cambiar versión
```

## 🤝 Contribuir

Para mejorar la configuración Docker:

1. Modifica los archivos de configuración
2. Prueba los cambios localmente
3. Actualiza esta documentación
4. Crea un Pull Request

## 📚 Recursos Adicionales

- [Documentación oficial de Docker](https://docs.docker.com/)
- [Documentación de Docker Compose](https://docs.docker.com/compose/)
- [Documentación de MySQL Docker](https://hub.docker.com/_/mysql)
- [Documentación de PHP Docker](https://hub.docker.com/_/php)
