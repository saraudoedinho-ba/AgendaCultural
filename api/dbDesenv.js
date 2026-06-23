const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'edison',
  password: '715900',
  database: 'desktop'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    process.exit(1);
  }
  console.log('🟢 Conectado ao MySQL');
});

module.exports = connection;
