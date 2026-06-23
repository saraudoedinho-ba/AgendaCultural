const mysql = require('mysql2');

// Conectar sem especificar o banco
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: ''
});

console.log('🔧 Movendo tabela musicos para o banco agendamusical...\n');

connection.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err);
    process.exit(1);
  }
  
  console.log('✅ Conectado ao MySQL!\n');
  
  // Verificar se o banco agendamusical existe
  connection.query('SHOW DATABASES LIKE "agendamusical"', (err, results) => {
    if (err) {
      console.error('❌ Erro:', err);
      connection.end();
      process.exit(1);
    }
    
    if (results.length === 0) {
      console.log('📦 Criando banco agendamusical...');
      connection.query('CREATE DATABASE agendamusical CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci', (err) => {
        if (err) {
          console.error('❌ Erro ao criar banco:', err);
          connection.end();
          process.exit(1);
        }
        console.log('✅ Banco agendamusical criado!\n');
        criarTabela();
      });
    } else {
      console.log('✅ Banco agendamusical já existe!\n');
      
      // Verificar se a tabela já existe no banco correto
      connection.query('USE agendamusical', (err) => {
        if (err) {
          console.error('❌ Erro ao usar banco:', err);
          connection.end();
          process.exit(1);
        }
        
        connection.query('SHOW TABLES LIKE "musicos"', (err, results) => {
          if (err) {
            console.error('❌ Erro:', err);
            connection.end();
            process.exit(1);
          }
          
          if (results.length > 0) {
            console.log('✅ Tabela musicos já existe no banco agendamusical!\n');
            mostrarEstrutura();
          } else {
            console.log('⚠️  Tabela musicos não existe no agendamusical. Criando...\n');
            criarTabela();
          }
        });
      });
    }
  });
});

function criarTabela() {
  connection.query('USE agendamusical', (err) => {
    if (err) {
      console.error('❌ Erro ao usar banco:', err);
      connection.end();
      process.exit(1);
    }
    
    const createTableSQL = `
      CREATE TABLE musicos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        musNomeArtistico VARCHAR(255) NOT NULL,
        musEmail VARCHAR(255) NOT NULL UNIQUE,
        musSenha VARCHAR(255) NOT NULL,
        musTelefone VARCHAR(20),
        musEstado VARCHAR(100),
        musCidade VARCHAR(100),
        musGeneros TEXT,
        musContato VARCHAR(100),
        musDescricao TEXT,
        musRedesSociais TEXT,
        dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        dataAtualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    connection.query(createTableSQL, (err) => {
      if (err) {
        console.error('❌ Erro ao criar tabela:', err);
        connection.end();
        process.exit(1);
      }
      
      console.log('✅ Tabela musicos criada no banco agendamusical!\n');
      mostrarEstrutura();
    });
  });
}

function mostrarEstrutura() {
  connection.query('DESCRIBE musicos', (err, columns) => {
    if (!err) {
      console.log('📋 Estrutura da tabela musicos no banco agendamusical:');
      console.table(columns);
    }
    
    console.log('\n✅ Configuração concluída!');
    console.log('🗄️  Banco: agendamusical');
    console.log('📊 Tabela: musicos');
    console.log('🚀 API pronta para uso!\n');
    
    connection.end();
    process.exit(0);
  });
}
