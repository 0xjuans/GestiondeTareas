@echo off
echo ========================================
echo    Sistema de Gestion de Tareas
echo    Script de Inicio para Desarrollo
echo ========================================
echo.

REM Verificar si Docker Desktop está ejecutándose
echo Verificando Docker Desktop...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker Desktop no está ejecutándose.
    echo Por favor, inicia Docker Desktop y vuelve a ejecutar este script.
    echo.
    pause
    exit /b 1
)

echo Docker Desktop está ejecutándose.
echo.

REM Verificar si los puertos están disponibles
echo Verificando puertos disponibles...
netstat -an | findstr ":8080" >nul 2>&1
if %errorlevel% equ 0 (
    echo ADVERTENCIA: El puerto 8080 ya está en uso.
    echo Por favor, libera el puerto o cambia la configuración.
    echo.
    pause
    exit /b 1
)

netstat -an | findstr ":8081" >nul 2>&1
if %errorlevel% equ 0 (
    echo ADVERTENCIA: El puerto 8081 ya está en uso.
    echo Por favor, libera el puerto o cambia la configuración.
    echo.
    pause
    exit /b 1
)

echo Puertos disponibles.
echo.

REM Construir y ejecutar los servicios
echo Iniciando servicios de desarrollo...
echo.

echo 1. Construyendo imágenes...
docker compose -f docker-compose.dev.yml build

echo.
echo 2. Iniciando servicios...
docker compose -f docker-compose.dev.yml up -d

echo.
echo 3. Verificando estado de los servicios...
timeout /t 5 /nobreak >nul

docker compose -f docker-compose.dev.yml ps

echo.
echo ========================================
echo    Servicios Iniciados Exitosamente!
echo ========================================
echo.
echo URLs de acceso:
echo - Aplicacion Web: http://localhost:8080
echo - phpMyAdmin:     http://localhost:8081
echo - MailHog:        http://localhost:8025
echo.
echo Usuarios de prueba:
echo - Admin:     admin / admin123
echo - Profesor:  profesor1 / prof123
echo - Estudiante: estudiante1 / est123
echo.
echo Para ver logs en tiempo real:
echo docker compose -f docker-compose.dev.yml logs -f
echo.
echo Para detener servicios:
echo docker compose -f docker-compose.dev.yml down
echo.
echo Presiona cualquier tecla para abrir la aplicación...
pause >nul

REM Abrir el navegador
start http://localhost:8080

echo.
echo Navegador abierto. ¡Disfruta desarrollando!
echo.
pause
