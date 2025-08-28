<?php
require_once(__DIR__ . '/../models/MateriaModel.php');

class MateriaModelController {
    private $materiaModel;

    public function __construct() {
        $this->materiaModel = new MateriaModel();
    }

    public function obtenerMateriasEstudiante($estudiante_id) {
        return $this->materiaModel->obtenerMateriasPorEstudiante($estudiante_id); // ✅ Nombre correcto
    }
}
?>