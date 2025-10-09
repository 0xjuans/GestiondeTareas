/**
 * Configuración de base de datos MySQL
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gestion_tareas_escolares',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Probar la conexión
pool.getConnection()
  .then((connection) => {
    console.log('✅ Base de datos MySQL conectada exitosamente');
    connection.release();
  })
  .catch((error) => {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    process.exit(1);
  });

export default pool;
