<?php
require_once(__DIR__ . '/../config/dirs.php');
require_once(__DIR__ . '/../config/DbConfig.php');

// Verificar sesión
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['rol'] != 'profesor') {
    echo json_encode(['error' => 'Acceso no autorizado']);
    exit;
}

// Verificar parámetro
if (!isset($_GET['entrega_id']) || !is_numeric($_GET['entrega_id'])) {
    echo json_encode(['error' => 'ID de entrega no válido']);
    exit;
}

$entregaId = intval($_GET['entrega_id']);
$profesorId = $_SESSION['user_id'];

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$conn->set_charset("utf8mb4");

// Obtener la calificación y comentarios actuales
$sqlEntrega = "SELECT et.calificacion, et.comentarios, et.tarea_id
              FROM entregas_tarea et
              INNER JOIN tareas t ON et.tarea_id = t.id
              WHERE et.id = ? AND t.profesor_id = ?";
$stmt = $conn->prepare($sqlEntrega);
$stmt->bind_param("ii", $entregaId, $profesorId);
$stmt->execute();
$resultEntrega = $stmt->get_result();

if ($resultEntrega->num_rows === 0) {
    echo json_encode(['error' => 'Entrega no encontrada o no autorizada']);
    exit;
}

$entrega = $resultEntrega->fetch_assoc();

// Convertir datos a UTF-8 para evitar problemas con caracteres especiales
array_walk_recursive($entrega, function(&$item) {
    if (is_string($item)) {
        $item = utf8_encode($item);
    }
});

echo json_encode(['success' => true, 'data' => $entrega]);
?>
