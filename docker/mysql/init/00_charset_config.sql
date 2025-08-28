-- =====================================================
-- CONFIGURACIÓN DE CODIFICACIÓN DE CARACTERES
-- Este archivo debe ejecutarse PRIMERO
-- =====================================================

-- Configurar la codificación del servidor MySQL
SET GLOBAL character_set_server = utf8mb4;
SET GLOBAL collation_server = utf8mb4_unicode_ci;

-- Configurar la codificación de la base de datos
SET GLOBAL character_set_database = utf8mb4;
SET GLOBAL collation_database = utf8mb4_unicode_ci;

-- Configurar la codificación por defecto para nuevas conexiones
SET GLOBAL init_connect = 'SET NAMES utf8mb4';

-- Verificar la configuración
SELECT 
    @@global.character_set_server as server_charset,
    @@global.collation_server as server_collation,
    @@global.character_set_database as db_charset,
    @@global.collation_database as db_collation,
    @@global.init_connect as init_connect;

