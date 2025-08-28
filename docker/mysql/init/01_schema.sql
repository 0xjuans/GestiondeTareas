-- =====================================================
-- ESQUEMA DE BASE DE DATOS - GESTIÓN DE TAREAS ESCOLARES
-- Versión: 3.0 - Estructura Exacta de Tablas
-- =====================================================

-- Eliminar base de datos si existe
DROP DATABASE IF EXISTS gestion_tareas_escolares;

-- Crear base de datos con configuración UTF-8
CREATE DATABASE gestion_tareas_escolares
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE gestion_tareas_escolares;

-- Configurar codificación para esta sesión y futuras conexiones
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;
SET character_set_database = utf8mb4;
SET character_set_server = utf8mb4;

-- =====================================================
-- TABLAS PRINCIPALES
-- =====================================================

-- Tabla de roles de usuario
CREATE TABLE roles (
    id int(11) NOT NULL,
    nombre varchar(50) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

-- Tabla de usuarios del sistema
CREATE TABLE usuarios (
    id int(11) NOT NULL,
    username varchar(50) NOT NULL,
    password varchar(255) NOT NULL,
    email varchar(100) NOT NULL,
    nombre varchar(100) NOT NULL,
    apellidos varchar(100) NOT NULL,
    rol_id int(11) NOT NULL,
    activo tinyint(1) DEFAULT 1,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

-- Tabla de grupos escolares
CREATE TABLE grupos (
    id int(11) NOT NULL,
    nombre varchar(50) NOT NULL,
    descripcion text DEFAULT NULL,
    activo tinyint(1) DEFAULT 1,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

-- Tabla de materias académicas
CREATE TABLE materias (
    id int(11) NOT NULL,
    nombre varchar(100) NOT NULL,
    codigo varchar(20) NOT NULL,
    descripcion text DEFAULT NULL,
    activo tinyint(1) DEFAULT 1,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

-- Tabla de estados de tareas
CREATE TABLE estados_tarea (
    id int(11) NOT NULL,
    nombre varchar(50) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp()
);

-- =====================================================
-- TABLAS DE RELACIONES
-- =====================================================

-- Relación profesor-grupo
CREATE TABLE profesor_grupo (
    profesor_id int(11) NOT NULL,
    grupo_id int(11) NOT NULL,
    activo tinyint(1) DEFAULT 1,
    created_at timestamp NOT NULL DEFAULT current_timestamp()
);

-- Relación estudiante-grupo
CREATE TABLE estudiante_grupo (
    estudiante_id int(11) NOT NULL,
    grupo_id int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp()
);

-- Relación profesor-materia
CREATE TABLE profesor_materia (
    profesor_id int(11) NOT NULL,
    materia_id int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp()
);

-- Relación grupo-materia
CREATE TABLE grupo_materia (
    grupo_id int(11) NOT NULL,
    materia_id int(11) NOT NULL,
    profesor_id int(11) DEFAULT NULL,
    activo tinyint(1) DEFAULT 1,
    created_at timestamp NOT NULL DEFAULT current_timestamp()
);

-- =====================================================
-- TABLAS DE TAREAS Y ENTREGAS
-- =====================================================

-- Tabla de tareas académicas
CREATE TABLE tareas (
    id int(11) NOT NULL,
    titulo varchar(200) NOT NULL,
    descripcion text DEFAULT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT current_timestamp(),
    fecha_entrega datetime NOT NULL,
    materia_id int(11) NOT NULL,
    grupo_id int(11) NOT NULL,
    profesor_id int(11) NOT NULL,
    estado_id int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

-- Tabla de entregas de tareas
CREATE TABLE entregas_tarea (
    id int(11) NOT NULL,
    tarea_id int(11) NOT NULL,
    estudiante_id int(11) NOT NULL,
    estado_id int(11) NOT NULL,
    fecha_entrega timestamp NULL DEFAULT NULL,
    calificacion decimal(5,2) DEFAULT NULL,
    comentarios text DEFAULT NULL,
    archivo_adjunto varchar(255) DEFAULT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

-- =====================================================
-- TABLA DE NOTIFICACIONES
-- =====================================================

-- Tabla de notificaciones del sistema
CREATE TABLE notificaciones (
    id int(11) NOT NULL,
    usuario_id int(11) NOT NULL,
    titulo varchar(200) NOT NULL,
    mensaje text NOT NULL,
    tarea_id int(11) DEFAULT NULL,
    leida tinyint(1) DEFAULT 0,
    created_at timestamp NOT NULL DEFAULT current_timestamp()
);

-- =====================================================
-- ÍNDICES PARA TABLAS
-- =====================================================

-- Índices de la tabla entregas_tarea
ALTER TABLE entregas_tarea
  ADD PRIMARY KEY (id),
  ADD KEY tarea_id (tarea_id),
  ADD KEY estudiante_id (estudiante_id),
  ADD KEY idx_entregas_tarea_estado (estado_id);

-- Índices de la tabla estados_tarea
ALTER TABLE estados_tarea
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY nombre (nombre);

-- Índices de la tabla estudiante_grupo
ALTER TABLE estudiante_grupo
  ADD PRIMARY KEY (estudiante_id,grupo_id),
  ADD KEY grupo_id (grupo_id);

-- Índices de la tabla grupos
ALTER TABLE grupos
  ADD PRIMARY KEY (id);

-- Índices de la tabla grupo_materia
ALTER TABLE grupo_materia
  ADD PRIMARY KEY (grupo_id,materia_id),
  ADD KEY materia_id (materia_id),
  ADD KEY profesor_id (profesor_id);

-- Índices de la tabla materias
ALTER TABLE materias
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY codigo (codigo),
  ADD KEY idx_materias_nombre (nombre);

-- Índices de la tabla notificaciones
ALTER TABLE notificaciones
  ADD PRIMARY KEY (id),
  ADD KEY idx_notificaciones_usuario (usuario_id,leida),
  ADD KEY fk_notificaciones_tarea (tarea_id);

-- Índices de la tabla profesor_grupo
ALTER TABLE profesor_grupo
  ADD PRIMARY KEY (profesor_id,grupo_id),
  ADD KEY grupo_id (grupo_id);

-- Índices de la tabla profesor_materia
ALTER TABLE profesor_materia
  ADD PRIMARY KEY (profesor_id,materia_id),
  ADD KEY materia_id (materia_id);

-- Índices de la tabla roles
ALTER TABLE roles
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY nombre (nombre);

-- Índices de la tabla tareas
ALTER TABLE tareas
  ADD PRIMARY KEY (id),
  ADD KEY materia_id (materia_id),
  ADD KEY grupo_id (grupo_id),
  ADD KEY profesor_id (profesor_id),
  ADD KEY idx_tareas_fecha_entrega (fecha_entrega),
  ADD KEY idx_tareas_estado (estado_id);

-- Índices de la tabla usuarios
ALTER TABLE usuarios
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY username (username),
  ADD UNIQUE KEY email (email),
  ADD KEY rol_id (rol_id);

-- =====================================================
-- AUTO_INCREMENT DE LAS TABLAS
-- =====================================================

-- AUTO_INCREMENT de la tabla entregas_tarea
ALTER TABLE entregas_tarea
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- AUTO_INCREMENT de la tabla estados_tarea
ALTER TABLE estados_tarea
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

-- AUTO_INCREMENT de la tabla grupos
ALTER TABLE grupos
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- AUTO_INCREMENT de la tabla materias
ALTER TABLE materias
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- AUTO_INCREMENT de la tabla notificaciones
ALTER TABLE notificaciones
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

-- AUTO_INCREMENT de la tabla roles
ALTER TABLE roles
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- AUTO_INCREMENT de la tabla tareas
ALTER TABLE tareas
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- AUTO_INCREMENT de la tabla usuarios
ALTER TABLE usuarios
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

-- =====================================================
-- RESTRICCIONES PARA TABLAS
-- =====================================================

-- Filtros para la tabla entregas_tarea
ALTER TABLE entregas_tarea
  ADD CONSTRAINT entregas_tarea_ibfk_1 FOREIGN KEY (tarea_id) REFERENCES tareas (id),
  ADD CONSTRAINT entregas_tarea_ibfk_2 FOREIGN KEY (estudiante_id) REFERENCES usuarios (id),
  ADD CONSTRAINT entregas_tarea_ibfk_3 FOREIGN KEY (estado_id) REFERENCES estados_tarea (id);

-- Filtros para la tabla estudiante_grupo
ALTER TABLE estudiante_grupo
  ADD CONSTRAINT estudiante_grupo_ibfk_1 FOREIGN KEY (estudiante_id) REFERENCES usuarios (id),
  ADD CONSTRAINT estudiante_grupo_ibfk_2 FOREIGN KEY (grupo_id) REFERENCES grupos (id);

-- Filtros para la tabla grupo_materia
ALTER TABLE grupo_materia
  ADD CONSTRAINT grupo_materia_ibfk_1 FOREIGN KEY (grupo_id) REFERENCES grupos (id),
  ADD CONSTRAINT grupo_materia_ibfk_2 FOREIGN KEY (materia_id) REFERENCES materias (id),
  ADD CONSTRAINT grupo_materia_ibfk_3 FOREIGN KEY (profesor_id) REFERENCES usuarios (id);

-- Filtros para la tabla notificaciones
ALTER TABLE notificaciones
  ADD CONSTRAINT fk_notificaciones_tarea FOREIGN KEY (tarea_id) REFERENCES tareas (id),
  ADD CONSTRAINT notificaciones_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
  ADD CONSTRAINT notificaciones_ibfk_2 FOREIGN KEY (tarea_id) REFERENCES tareas (id);

-- Filtros para la tabla profesor_grupo
ALTER TABLE profesor_grupo
  ADD CONSTRAINT profesor_grupo_ibfk_1 FOREIGN KEY (profesor_id) REFERENCES usuarios (id),
  ADD CONSTRAINT profesor_grupo_ibfk_2 FOREIGN KEY (grupo_id) REFERENCES grupos (id);

-- Filtros para la tabla profesor_materia
ALTER TABLE profesor_materia
  ADD CONSTRAINT profesor_materia_ibfk_1 FOREIGN KEY (profesor_id) REFERENCES usuarios (id),
  ADD CONSTRAINT profesor_materia_ibfk_2 FOREIGN KEY (materia_id) REFERENCES materias (id);

-- Filtros para la tabla tareas
ALTER TABLE tareas
  ADD CONSTRAINT tareas_ibfk_1 FOREIGN KEY (materia_id) REFERENCES materias (id),
  ADD CONSTRAINT tareas_ibfk_2 FOREIGN KEY (grupo_id) REFERENCES grupos (id),
  ADD CONSTRAINT tareas_ibfk_3 FOREIGN KEY (profesor_id) REFERENCES usuarios (id),
  ADD CONSTRAINT tareas_ibfk_4 FOREIGN KEY (estado_id) REFERENCES estados_tarea (id);

-- Filtros para la tabla usuarios
ALTER TABLE usuarios
  ADD CONSTRAINT usuarios_ibfk_1 FOREIGN KEY (rol_id) REFERENCES roles (id);

-- =====================================================
-- COMENTARIOS FINALES
-- =====================================================

-- Esta base de datos ahora tiene la estructura exacta que coincide
-- con el dump de phpMyAdmin proporcionado
-- Optimizada para consultas frecuentes y escalabilidad


