-- =====================================================
-- TAREAS DE EJEMPLO - GESTIÓN DE TAREAS ESCOLARES
-- Versión: 3.2 - Tareas con IDs Reales Corregidos
-- =====================================================

USE gestion_tareas_escolares;

-- Configurar codificación para esta sesión
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

-- =====================================================
-- INSERTAR TAREAS DE MATEMÁTICAS
-- =====================================================

-- Tareas para 1°A Secundaria (grupo_id = 3, profesor_id = 6, materia_id = 4)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Ejercicios de Álgebra Básica', 'Resolver problemas de ecuaciones lineales simples. Leer el capítulo 3 del libro de texto, resolver ejercicios 1-20 de la página 45, mostrar todo el procedimiento paso a paso, entregar en hoja de papel cuadriculado', DATE_ADD(NOW(), INTERVAL 7 DAY), 4, 3, 6, 6),
('Proyecto de Geometría', 'Crear un diseño geométrico usando figuras básicas. Usar regla y compás para crear un diseño, incluir al menos 5 tipos de figuras geométricas, calcular el área y perímetro de cada figura, presentar en cartulina tamaño A3', DATE_ADD(NOW(), INTERVAL 14 DAY), 4, 3, 6, 6),
('Examen de Fracciones', 'Evaluación sobre operaciones con fracciones. Estudiar capítulos 5 y 6 del libro, repasar ejercicios de clase, el examen será individual y sin calculadora, duración: 60 minutos', DATE_ADD(NOW(), INTERVAL 3 DAY), 4, 3, 6, 6);

-- Tareas para 2°B Secundaria (grupo_id = 4, profesor_id = 7, materia_id = 4)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Sistema de Ecuaciones', 'Resolver sistemas de ecuaciones lineales. Estudiar métodos de sustitución y eliminación, resolver problemas 1-15 de la página 78, usar GeoGebra para verificar resultados, entregar en formato digital', DATE_ADD(NOW(), INTERVAL 10 DAY), 4, 4, 7, 6),
('Trabajo Grupal de Estadística', 'Análisis estadístico de datos del colegio. Formar grupos de 3-4 estudiantes, recolectar datos sobre preferencias deportivas, crear gráficos y calcular medidas estadísticas, presentar en PowerPoint', DATE_ADD(NOW(), INTERVAL 21 DAY), 4, 4, 7, 6);

-- Tareas para 3°C Secundaria (grupo_id = 5, profesor_id = 8, materia_id = 4)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Funciones Cuadráticas', 'Análisis completo de funciones cuadráticas. Estudiar transformaciones de funciones, resolver ejercicios de aplicación, usar Desmos para graficar, entregar reporte escrito', DATE_ADD(NOW(), INTERVAL 12 DAY), 4, 5, 8, 6);

-- =====================================================
-- INSERTAR TAREAS DE CIENCIAS NATURALES
-- =====================================================

-- Tareas para 1°A Secundaria (grupo_id = 3, profesor_id = 7, materia_id = 6)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Experimento de Fotosíntesis', 'Demostrar el proceso de fotosíntesis. Usar una planta pequeña y una bolsa transparente, colocar en diferentes condiciones de luz, observar cambios durante 5 días, documentar con fotos y notas', DATE_ADD(NOW(), INTERVAL 8 DAY), 6, 3, 7, 6),
('Reporte de Laboratorio', 'Análisis de reacciones químicas simples. Realizar experimentos de clase, anotar observaciones detalladas, escribir conclusiones, entregar en formato de laboratorio', DATE_ADD(NOW(), INTERVAL 5 DAY), 6, 3, 7, 6);

-- Tareas para 2°B Secundaria (grupo_id = 4, profesor_id = 7, materia_id = 6)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Investigación sobre Ecosistemas', 'Estudio de un ecosistema local. Elegir un ecosistema cercano, identificar flora y fauna, analizar interacciones, presentar en formato de póster', DATE_ADD(NOW(), INTERVAL 15 DAY), 6, 4, 7, 6);

-- Tareas para 3°C Secundaria (grupo_id = 5, profesor_id = 8, materia_id = 6)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Proyecto de Energía Renovable', 'Diseño de un sistema de energía renovable. Investigar tipos de energía renovable, diseñar un sistema para el colegio, calcular costos y beneficios, presentar en formato de proyecto', DATE_ADD(NOW(), INTERVAL 25 DAY), 6, 5, 8, 6);

-- =====================================================
-- INSERTAR TAREAS DE LENGUAJE Y COMUNICACIÓN
-- =====================================================

-- Tareas para 1°A Secundaria (grupo_id = 3, profesor_id = 6, materia_id = 5)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Ensayo sobre Don Quijote', 'Análisis del personaje principal. Leer capítulos 1-5 de Don Quijote, analizar características del personaje, escribir ensayo de 3 páginas, incluir citas del texto', DATE_ADD(NOW(), INTERVAL 9 DAY), 5, 3, 6, 6),
('Presentación Oral', 'Exponer un tema de interés personal. Elegir un tema de interés, preparar presentación de 5 minutos, usar material visual, practicar la exposición', DATE_ADD(NOW(), INTERVAL 6 DAY), 5, 3, 6, 6);

-- Tareas para 2°B Secundaria (grupo_id = 4, profesor_id = 6, materia_id = 5)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Análisis de Poesía', 'Interpretación de poemas del siglo XX. Seleccionar 3 poemas del siglo XX, analizar elementos literarios, escribir interpretación personal, crear un poema original', DATE_ADD(NOW(), INTERVAL 11 DAY), 5, 4, 6, 6);

-- Tareas para 3°C Secundaria (grupo_id = 5, profesor_id = 8, materia_id = 5)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Novela Corta', 'Escribir una novela corta. Desarrollar personajes y trama, escribir mínimo 20 páginas, incluir diálogos y descripciones, entregar manuscrito impreso', DATE_ADD(NOW(), INTERVAL 30 DAY), 5, 5, 8, 6);

-- =====================================================
-- INSERTAR TAREAS DE HISTORIA Y GEOGRAFÍA
-- =====================================================

-- Tareas para 1°A Secundaria (grupo_id = 3, profesor_id = 6, materia_id = 7)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Línea de Tiempo', 'Crear línea de tiempo de la Edad Media. Investigar eventos importantes, usar cartulina o software digital, incluir fechas y descripciones, presentar en clase', DATE_ADD(NOW(), INTERVAL 7 DAY), 7, 3, 6, 6);

-- Tareas para 2°B Secundaria (grupo_id = 4, profesor_id = 6, materia_id = 7)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Mapa de América', 'Crear mapa político de América. Dibujar mapa a mano, identificar países y capitales, incluir ríos principales, usar colores para diferenciar regiones', DATE_ADD(NOW(), INTERVAL 8 DAY), 7, 4, 6, 6);

-- Tareas para 3°C Secundaria (grupo_id = 5, profesor_id = 6, materia_id = 7)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Investigación Histórica', 'Estudio de un evento histórico. Elegir un evento histórico, investigar causas y consecuencias, entrevistar a personas mayores, presentar en formato de documental', DATE_ADD(NOW(), INTERVAL 20 DAY), 7, 5, 6, 6);

-- =====================================================
-- INSERTAR TAREAS DE ARTE Y CULTURA
-- =====================================================

-- Tareas para 1°A Secundaria (grupo_id = 3, profesor_id = 6, materia_id = 8)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Autorretrato', 'Crear autorretrato usando diferentes técnicas. Usar lápiz, carboncillo o acuarela, incluir elementos personales, escribir reflexión sobre el proceso, presentar en clase', DATE_ADD(NOW(), INTERVAL 10 DAY), 8, 3, 6, 6);

-- Tareas para 2°B Secundaria (grupo_id = 4, profesor_id = 6, materia_id = 8)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Mural Colectivo', 'Crear mural sobre valores del colegio. Trabajar en grupos de 4, diseñar boceto conjunto, pintar en pared asignada, documentar proceso con fotos', DATE_ADD(NOW(), INTERVAL 18 DAY), 8, 4, 6, 6);

-- Tareas para 3°C Secundaria (grupo_id = 5, profesor_id = 6, materia_id = 8)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Exposición de Arte', 'Organizar exposición individual. Crear 5 obras originales, escribir catálogo de exposición, organizar espacio expositivo, presentar a la comunidad', DATE_ADD(NOW(), INTERVAL 28 DAY), 8, 5, 6, 6);

-- =====================================================
-- INSERTAR TAREAS DE EDUCACIÓN FÍSICA
-- =====================================================

-- Tareas para 1°A Secundaria (grupo_id = 3, profesor_id = 6, materia_id = 9)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Rutina de Ejercicios', 'Crear y ejecutar rutina de ejercicios. Diseñar rutina de 20 minutos, incluir ejercicios de fuerza y cardio, ejecutar 3 veces por semana, registrar progreso', DATE_ADD(NOW(), INTERVAL 14 DAY), 9, 3, 6, 6);

-- Tareas para 2°B Secundaria (grupo_id = 4, profesor_id = 6, materia_id = 9)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Investigación Deportiva', 'Estudio de un deporte olímpico. Investigar historia y reglas, analizar técnicas básicas, crear presentación multimedia, presentar en clase', DATE_ADD(NOW(), INTERVAL 16 DAY), 9, 4, 6, 6);

-- =====================================================
-- INSERTAR TAREAS DE TECNOLOGÍA E INFORMÁTICA
-- =====================================================

-- Tareas para 1°A Secundaria (grupo_id = 3, profesor_id = 7, materia_id = 10)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Presentación Digital', 'Crear presentación sobre tecnología. Usar PowerPoint o similar, incluir 10 diapositivas, usar imágenes y animaciones, presentar en clase', DATE_ADD(NOW(), INTERVAL 12 DAY), 10, 3, 7, 6);

-- Tareas para 2°B Secundaria (grupo_id = 4, profesor_id = 7, materia_id = 10)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Página Web Simple', 'Diseñar página web básica. Usar HTML y CSS, incluir 3 secciones, usar colores y fuentes apropiadas, subir a servidor gratuito', DATE_ADD(NOW(), INTERVAL 22 DAY), 10, 4, 7, 6);

-- Tareas para 3°C Secundaria (grupo_id = 5, profesor_id = 7, materia_id = 10)
INSERT INTO tareas (titulo, descripcion, fecha_entrega, materia_id, grupo_id, profesor_id, estado_id) VALUES
('Aplicación Móvil', 'Diseñar prototipo de app. Usar App Inventor o similar, crear 3 pantallas funcionales, incluir base de datos simple, presentar demo en clase', DATE_ADD(NOW(), INTERVAL 35 DAY), 10, 5, 7, 6);

-- =====================================================
-- COMENTARIOS FINALES
-- =====================================================

-- Esta base de datos ahora contiene:
-- * 30 tareas de ejemplo distribuidas en 7 materias
-- * Tareas para 3 grupos escolares diferentes
-- * Diferentes niveles de complejidad y duración
-- * Estructura exacta que coincide con el dump de phpMyAdmin
-- * Codificación UTF-8 completa para caracteres especiales
-- * Tareas realistas y educativas para el entorno escolar
-- * IDs corregidos para evitar errores de clave foránea
-- * Mapeo correcto de IDs reales generados por la base de datos
