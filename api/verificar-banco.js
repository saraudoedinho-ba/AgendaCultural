const mysql = require('mysql2');

// Conectar sem especificar o banco de dados
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: ''
});

console.log('🔧 Verificando banco de dados...\n');

connection.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err);
    console.log('\n⚠️  Certifique-se de que:');
    console.log('   1. O MySQL está instalado e rodando');
    console.log('   2. O usuário root não tem senha (ou configure a senha em db.js)');
    console.log('   3. O MySQL está rodando na porta padrão 3306');
    process.exit(1);
  }
  
  console.log('✅ Conectado ao MySQL!\n');
  
  // Verificar se o banco agendamusical existe
  connection.query('SHOW DATABASES LIKE "agendamusical"', (err, results) => {
    if (err) {
      console.error('❌ Erro ao verificar banco:', err);
      connection.end();
      process.exit(1);
    }
    
    if (results.length > 0) {
      console.log('✅ Banco de dados "agendamusical" já existe!\n');
      
      // Selecionar o banco
      connection.query('USE agendamusical', (err) => {
        if (err) {
          console.error('❌ Erro ao usar banco:', err);
          connection.end();
          process.exit(1);
        }
        
        // Verificar se a tabela musicos existe
        connection.query('SHOW TABLES LIKE "musicos"', (err, results) => {
          if (err) {
            console.error('❌ Erro ao verificar tabela:', err);
            connection.end();
            process.exit(1);
          }
          
          if (results.length > 0) {
            console.log('✅ Tabela "musicos" já existe!\n');
            
            // Mostrar estrutura
            connection.query('DESCRIBE musicos', (err, columns) => {
              if (!err) {
                console.log('📋 Estrutura da tabela:');
                console.table(columns);
              }
              
              console.log('\n✅ Banco de dados configurado e pronto para uso!');
              console.log('🚀 Você pode iniciar a API com: node agendaMusical.js\n');
              connection.end();
              process.exit(0);
            });
          } else {
            console.log('⚠️  Tabela "musicos" não existe. Criando...\n');
            criarTabela(connection);
          }
        });
      });
    } else {
      console.log('⚠️  Banco de dados "agendamusical" não existe. Criando...\n');
      
      // Criar o banco
      connection.query('CREATE DATABASE agendamusical CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci', (err) => {
        if (err) {
          console.error('❌ Erro ao criar banco:', err);
          connection.end();
          process.exit(1);
        }
        
        console.log('✅ Banco de dados "agendamusical" criado com sucesso!\n');
        
        // Usar o banco recém-criado
        connection.query('USE agendamusical', (err) => {
          if (err) {
            console.error('❌ Erro ao usar banco:', err);
            connection.end();
            process.exit(1);
          }
          
          criarTabela(connection);
        });
      });
    }
  });
});

function criarTabela(connection) {
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
    
    console.log('✅ Tabela "musicos" criada com sucesso!\n');
    
    // Mostrar estrutura criada
    connection.query('DESCRIBE musicos', (err, columns) => {
      if (!err) {
        console.log('📋 Estrutura da tabela criada:');
        console.table(columns);
      }
      
      console.log('\n✅ Banco de dados configurado e pronto para uso!');
      console.log('🚀 Você pode iniciar a API com: node agendaMusical.js\n');
      connection.end();
      process.exit(0);
    });
  });
}
