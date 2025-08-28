#!/bin/bash

# Sistema de Gestión de Tareas - Script de Inicio para Desarrollo
# Para Linux y macOS

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================"
echo "    Sistema de Gestión de Tareas"
echo "    Script de Inicio para Desarrollo"
echo -e "========================================${NC}"
echo

# Verificar si Docker está ejecutándose
echo -e "${YELLOW}Verificando Docker...${NC}"
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}ERROR: Docker no está ejecutándose.${NC}"
    echo "Por favor, inicia Docker y vuelve a ejecutar este script."
    echo
    read -p "Presiona Enter para continuar..."
    exit 1
fi

echo -e "${GREEN}Docker está ejecutándose.${NC}"
echo

# Verificar si Docker Compose está disponible
if ! command -v docker compose &> /dev/null; then
    echo -e "${RED}ERROR: Docker Compose no está disponible.${NC}"
    echo "Por favor, instala Docker Compose y vuelve a ejecutar este script."
    echo
    read -p "Presiona Enter para continuar..."
    exit 1
fi

# Verificar si los puertos están disponibles
echo -e "${YELLOW}Verificando puertos disponibles...${NC}"

if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${RED}ADVERTENCIA: El puerto 8080 ya está en uso.${NC}"
    echo "Por favor, libera el puerto o cambia la configuración."
    echo
    read -p "Presiona Enter para continuar..."
    exit 1
fi

if lsof -Pi :8081 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${RED}ADVERTENCIA: El puerto 8081 ya está en uso.${NC}"
    echo "Por favor, libera el puerto o cambia la configuración."
    echo
    read -p "Presiona Enter para continuar..."
    exit 1
fi

echo -e "${GREEN}Puertos disponibles.${NC}"
echo

# Construir y ejecutar los servicios
echo -e "${YELLOW}Iniciando servicios de desarrollo...${NC}"
echo

echo -e "${BLUE}1. Construyendo imágenes...${NC}"
docker compose -f docker-compose.dev.yml build

echo
echo -e "${BLUE}2. Iniciando servicios...${NC}"
docker compose -f docker-compose.dev.yml up -d

echo
echo -e "${BLUE}3. Verificando estado de los servicios...${NC}"
sleep 5

docker compose -f docker-compose.dev.yml ps

echo
echo -e "${GREEN}========================================"
echo "    Servicios Iniciados Exitosamente!"
echo -e "========================================${NC}"
echo
echo -e "${BLUE}URLs de acceso:${NC}"
echo -e "- Aplicación Web: ${GREEN}http://localhost:8080${NC}"
echo -e "- phpMyAdmin:     ${GREEN}http://localhost:8081${NC}"
echo -e "- MailHog:        ${GREEN}http://localhost:8025${NC}"
echo
echo -e "${BLUE}Usuarios de prueba:${NC}"
echo -e "- Admin:     ${YELLOW}admin${NC} / ${YELLOW}admin123${NC}"
echo -e "- Profesor:  ${YELLOW}profesor1${NC} / ${YELLOW}prof123${NC}"
echo -e "- Estudiante: ${YELLOW}estudiante1${NC} / ${YELLOW}est123${NC}"
echo
echo -e "${BLUE}Comandos útiles:${NC}"
echo -e "Para ver logs en tiempo real:"
echo -e "  ${YELLOW}docker compose -f docker-compose.dev.yml logs -f${NC}"
echo
echo -e "Para detener servicios:"
echo -e "  ${YELLOW}docker compose -f docker-compose.dev.yml down${NC}"
echo
echo -e "Para reiniciar un servicio específico:"
echo -e "  ${YELLOW}docker compose -f docker-compose.dev.yml restart web${NC}"
echo

# Preguntar si abrir el navegador
read -p "¿Deseas abrir la aplicación en el navegador? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Abriendo navegador...${NC}"
    
    # Detectar el sistema operativo y abrir el navegador apropiadamente
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v xdg-open &> /dev/null; then
            xdg-open http://localhost:8080
        elif command -v gnome-open &> /dev/null; then
            gnome-open http://localhost:8080
        else
            echo -e "${YELLOW}No se pudo abrir el navegador automáticamente.${NC}"
            echo "Por favor, abre manualmente: http://localhost:8080"
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open http://localhost:8080
    else
        echo -e "${YELLOW}Sistema operativo no reconocido.${NC}"
        echo "Por favor, abre manualmente: http://localhost:8080"
    fi
fi

echo
echo -e "${GREEN}¡Entorno de desarrollo listo!${NC}"
echo -e "${BLUE}¡Disfruta desarrollando!${NC}"
echo

# Mostrar estado final
echo -e "${YELLOW}Estado actual de los servicios:${NC}"
docker compose -f docker-compose.dev.yml ps

echo
echo -e "${BLUE}Para monitorear en tiempo real:${NC}"
echo -e "${YELLOW}docker compose -f docker-compose.dev.yml logs -f --tail=100${NC}"
echo
