/**
 * Servidor principal de la aplicación
 */

import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de salud
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

// Rutas de la API
app.use('/api', routes);

// Middleware de manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║  🚀 Servidor iniciado exitosamente    ║
║  📍 Puerto: ${PORT}                      ║
║  🌍 Entorno: ${process.env.NODE_ENV || 'development'}          ║
║  📡 API: http://localhost:${PORT}/api   ║
╚═══════════════════════════════════════╝
  `);
});

export default app;
