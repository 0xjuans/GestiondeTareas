-- =====================================================
-- DATOS INICIALES - GESTIÓN DE TAREAS ESCOLARES
-- Versión: 4.2 - Datos con IDs Reales Corregidos
-- =====================================================

USE gestion_tareas_escolares;

-- Configurar codificación para esta sesión
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

-- =====================================================
-- INSERTAR ROLES DEL SISTEMA
-- =====================================================

INSERT INTO roles (nombre) VALUES
('administrador'),
('profesor'),
('estudiante');

-- =====================================================
-- INSERTAR ESTADOS DE TAREAS
-- =====================================================

INSERT INTO estados_tarea (nombre) VALUES
('pendiente'),
('en_progreso'),
('completada'),
('vencida'),
('calificada');

-- =====================================================
-- INSERTAR GRUPOS ESCOLARES
-- =====================================================

INSERT INTO grupos (nombre, descripcion) VALUES
('1°A Secundaria', 'Primer año de secundaria, sección A'),
('2°B Secundaria', 'Segundo año de secundaria, sección B'),
('3°C Secundaria', 'Tercer año de secundaria, sección C');

-- =====================================================
-- INSERTAR MATERIAS ACADÉMICAS
-- =====================================================

INSERT INTO materias (nombre, codigo, descripcion) VALUES
('Matemáticas I', 'MAT101', 'Curso básico de matemáticas'),
('Español', 'ESP101', 'Lengua y literatura española'),
('Ciencias Naturales', 'CN101', 'Introducción a las ciencias naturales'),
('Historia y Geografía', 'HIS101', 'Historia universal y geografía'),
('Arte y Cultura', 'ART101', 'Arte, música y expresión cultural'),
('Educación Física', 'EDF101', 'Deportes y actividad física'),
('Tecnología e Informática', 'TEC101', 'Computación y tecnología');

-- =====================================================
-- INSERTAR USUARIOS CON CONTRASEÑAS SIMPLES
-- =====================================================

-- Administradores (rol_id = 5 para 'administrador')
INSERT INTO usuarios (username, password, email, nombre, apellidos, rol_id) VALUES
('admin', 'admin123', 'admin@escuela.edu', 'Administrador', 'Principal', 5),
('director', 'director123', 'director@escuela.edu', 'Juan', 'Pérez', 5);

-- Profesores (rol_id = 6 para 'profesor')
INSERT INTO usuarios (username, password, email, nombre, apellidos, rol_id) VALUES
('profesor1', 'prof123', 'profesor1@escuela.edu', 'Ana', 'Sánchez Pérez', 6),
('profesor2', 'prof123', 'profesor2@escuela.edu', 'Luis', 'Ramírez Torres', 6),
('profesor3', 'prof123', 'profesor3@escuela.edu', 'Carmen', 'Vargas Silva', 6);

-- Estudiantes (rol_id = 7 para 'estudiante')
INSERT INTO usuarios (username, password, email, nombre, apellidos, rol_id) VALUES
('estudiante1', 'est123', 'estudiante1@escuela.edu', 'Ana', 'Martínez', 7),
('estudiante2', 'est123', 'estudiante2@escuela.edu', 'Carlos', 'García', 7),
('estudiante3', 'est123', 'estudiante3@escuela.edu', 'María', 'López', 7),
('estudiante4', 'est123', 'estudiante4@escuela.edu', 'Roberto', 'Pérez', 7),
('estudiante5', 'est123', 'estudiante5@escuela.edu', 'Patricia', 'Silva', 7);

-- =====================================================
-- INSERTAR RELACIONES PROFESOR-GRUPO
-- =====================================================

INSERT INTO profesor_grupo (profesor_id, grupo_id) VALUES
(6, 3),  -- profesor1 en 1°A (ID 3)
(7, 4),  -- profesor2 en 2°B (ID 4)
(8, 5),  -- profesor3 en 3°C (ID 5)
(6, 4),  -- profesor1 también en 2°B
(7, 3);  -- profesor2 también en 1°A

-- =====================================================
-- INSERTAR RELACIONES ESTUDIANTE-GRUPO
-- =====================================================

-- Grupo 1°A (ID 3)
INSERT INTO estudiante_grupo (estudiante_id, grupo_id) VALUES
(9, 3),   -- estudiante1
(10, 3),  -- estudiante2
(11, 3);  -- estudiante3

-- Grupo 2°B (ID 4)
INSERT INTO estudiante_grupo (estudiante_id, grupo_id) VALUES
(12, 4),  -- estudiante4
(13, 4);  -- estudiante5

-- =====================================================
-- INSERTAR RELACIONES PROFESOR-MATERIA
-- =====================================================

INSERT INTO profesor_materia (profesor_id, materia_id) VALUES
(6, 4),  -- profesor1 - Matemáticas (ID 4)
(6, 5),  -- profesor1 - Español (ID 5)
(7, 6),  -- profesor2 - Ciencias (ID 6)
(7, 4),  -- profesor2 - Matemáticas (ID 4)
(8, 5),  -- profesor3 - Español (ID 5)
(8, 6);  -- profesor3 - Ciencias (ID 6)

-- =====================================================
-- INSERTAR RELACIONES GRUPO-MATERIA
-- =====================================================

INSERT INTO grupo_materia (grupo_id, materia_id, profesor_id) VALUES
-- Grupo 1°A (ID 3)
(3, 4, 6),  -- Matemáticas con profesor1
(3, 5, 6),  -- Español con profesor1
(3, 6, 7),  -- Ciencias con profesor2

-- Grupo 2°B (ID 4)
(4, 4, 7),  -- Matemáticas con profesor2
(4, 6, 7),  -- Ciencias con profesor2

-- Grupo 3°C (ID 5)
(5, 5, 8),  -- Español con profesor3
(5, 6, 8);  -- Ciencias con profesor3

-- =====================================================
-- COMENTARIOS FINALES
-- =====================================================

-- Esta base de datos ahora contiene:
-- * 2 Administradores con contraseñas simples: admin/admin123, director/director123
-- * 3 Profesores con contraseña simple: profesor1/prof123, etc.
-- * 5 Estudiantes con contraseña simple: estudiante1/est123, etc.
-- * 3 Grupos escolares
-- * 7 Materias académicas
-- * Relaciones completas entre usuarios, grupos y materias
-- * Estructura exacta que coincide con el dump de phpMyAdmin
-- * Codificación UTF-8 completa para caracteres especiales
-- * IDs corregidos para evitar errores de clave foránea
-- * Mapeo correcto de IDs reales generados por la base de datos


