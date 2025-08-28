<?php
require_once(__DIR__ . '/../models/EstadoModel.php');

class EstadoController {
    private $estadoModel;

    public function __construct() {
        $this->estadoModel = new EstadoModel();
    }

    public function obtenerEstados() {
        return $this->estadoModel->obtenerTodos();
    }
}
?>
