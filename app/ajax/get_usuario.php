<?php
require_once(__DIR__ . '/../config/dirs.php');
require_once(MODELS_PATH . '/Usuario.php');

// Verificar sesión
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['rol'] != 'administrador') {
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

// Verificar parámetro
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo json_encode(['error' => 'ID de usuario no válido']);
    exit;
}

$usuarioId = intval($_GET['id']);
$usuario = new Usuario();

try {
    $userData = $usuario->getUserById($usuarioId);
    
    if ($userData) {
        // Eliminar la contraseña del resultado por seguridad
        unset($userData['password']);
        
        echo json_encode([
            'success' => true,
            'data' => $userData
        ]);
    } else {
        echo json_encode(['error' => 'Usuario no encontrado']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Error al obtener usuario: ' . $e->getMessage()]);
}
?>
