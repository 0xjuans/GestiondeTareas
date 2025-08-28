<?php
/**
 * Configuración de Base de Datos - Archivo de Ejemplo
 * 
 * Copia este archivo a DbConfig.php y ajusta los valores según tu entorno
 */

// Configuración de la base de datos
define('DB_HOST', 'localhost');           // Host de la base de datos
define('DB_USER', 'root');                // Usuario de la base de datos
define('DB_PASS', '');                    // Contraseña de la base de datos
define('DB_NAME', 'gestion_tareas_escolares'); // Nombre de la base de datos
define('DB_CHARSET', 'utf8mb4');         // Charset de la base de datos

// Configuración de conexión
define('DB_PORT', 3306);                 // Puerto de MySQL (por defecto 3306)
define('DB_OPTIONS', [                   // Opciones de PDO
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
]);

// Configuración de timezone
define('TIMEZONE', 'America/Bogota');    // Zona horaria (Colombia)

// Configuración de debug
define('DEBUG_MODE', true);              // Modo debug (true para desarrollo, false para producción)
define('LOG_QUERIES', true);             // Log de consultas SQL (solo en debug)

// Configuración de sesión
define('SESSION_LIFETIME', 3600);        // Tiempo de vida de la sesión en segundos
define('SESSION_NAME', 'GESTION_TAREAS'); // Nombre de la sesión

// Configuración de seguridad
define('HASH_COST', 12);                 // Costo del hash de contraseñas
define('TOKEN_EXPIRY', 3600);           // Tiempo de expiración de tokens en segundos

// Configuración de archivos
define('MAX_FILE_SIZE', 10 * 1024 * 1024); // Tamaño máximo de archivo (10MB)
define('ALLOWED_EXTENSIONS', ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png']); // Extensiones permitidas

// Configuración de paginación
define('ITEMS_PER_PAGE', 20);            // Elementos por página por defecto

// Configuración de notificaciones
define('NOTIFICATION_LIMIT', 50);        // Límite de notificaciones mostradas
define('AUTO_DELETE_NOTIFICATIONS', 30); // Días para auto-eliminar notificaciones antiguas

// Configuración de backup
define('BACKUP_ENABLED', true);          // Habilitar backups automáticos
define('BACKUP_RETENTION_DAYS', 7);      // Días de retención de backups

// Configuración de email (futuro)
define('SMTP_HOST', 'smtp.gmail.com');   // Servidor SMTP
define('SMTP_PORT', 587);                // Puerto SMTP
define('SMTP_USER', '');                 // Usuario SMTP
define('SMTP_PASS', '');                 // Contraseña SMTP
define('SMTP_SECURE', 'tls');            // Tipo de seguridad SMTP

// Configuración de la aplicación
define('APP_NAME', 'Gestión de Tareas Escolares');
define('APP_VERSION', '1.0.0');
define('APP_URL', 'http://localhost:8080'); // URL base de la aplicación

// Configuración de Docker (para desarrollo)
if (getenv('DB_HOST')) {
    define('DB_HOST', getenv('DB_HOST'));
    define('DB_USER', getenv('DB_USER'));
    define('DB_PASS', getenv('DB_PASS'));
    define('DB_NAME', getenv('DB_NAME'));
    define('APP_URL', getenv('BASE_URL') ?: 'http://localhost:8080');
}

// Validación de configuración
if (!defined('DB_HOST') || !defined('DB_USER') || !defined('DB_NAME')) {
    die('Error: Configuración de base de datos incompleta. Verifica DbConfig.php');
}

// Configurar timezone
if (defined('TIMEZONE')) {
    date_default_timezone_set(TIMEZONE);
}

// Configurar manejo de errores según modo debug
if (defined('DEBUG_MODE')) {
    if (DEBUG_MODE) {
        error_reporting(E_ALL);
        ini_set('display_errors', 1);
        ini_set('log_errors', 1);
    } else {
        error_reporting(0);
        ini_set('display_errors', 0);
        ini_set('log_errors', 1);
    }
}
?>
