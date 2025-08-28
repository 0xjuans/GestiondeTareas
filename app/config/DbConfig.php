<?php
/**
 * Configuración de la base de datos
 * 
 * Este archivo contiene las constantes necesarias para la conexión
 * con la base de datos MySQL.
 */

if (!defined('ROOT_PATH')) {
    require_once(__DIR__ . '/dirs.php');
}

// Definir constantes de conexión leyendo primero variables de entorno para soportar Docker
// Valores por defecto mantienen compatibilidad con entorno local (XAMPP)
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_NAME', getenv('DB_NAME') ?: 'gestion_tareas_escolares');
?>