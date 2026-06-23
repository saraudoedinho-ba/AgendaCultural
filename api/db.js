const mysql = require('mysql2');

// Criar um POOL de conexões (não uma única conexão)
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Ebr715900!',
  database: 'agendamusical',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Testar a conexão
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
    process.exit(1);
  }
  console.log('🟢 Conectado ao MySQL com Pool');
  connection.release(); // Libera a conexão de volta pro pool
});

// Exportar o pool para usar nas queries
module.exports = pool;
