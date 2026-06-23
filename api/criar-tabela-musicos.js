const db = require('./db');

console.log('🔧 Criando tabela de músicos no banco de dados...\n');

// Primeiro, verificar se a tabela já existe
db.query('SHOW TABLES LIKE "musicos"', (err, results) => {
  if (err) {
    console.error('❌ Erro ao verificar tabela:', err);
    process.exit(1);
  }
  
  if (results.length > 0) {
    console.log('⚠️  Tabela "musicos" já existe!');
    console.log('Deseja recriá-la? (isso apagará todos os dados)');
    console.log('Execute: DROP TABLE musicos; antes de rodar este script novamente.\n');
    
    // Mostrar estrutura atual
    db.query('DESCRIBE musicos', (err, columns) => {
      if (!err) {
        console.log('📋 Estrutura atual da tabela:');
        console.table(columns);
      }
      db.end();
      process.exit(0);
    });
  } else {
    // Criar a tabela
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
    
    db.query(createTableSQL, (err, result) => {
      if (err) {
        console.error('❌ Erro ao criar tabela:', err);
        process.exit(1);
      }
      
      console.log('✅ Tabela "musicos" criada com sucesso!\n');
      
      // Mostrar estrutura criada
      db.query('DESCRIBE musicos', (err, columns) => {
        if (!err) {
          console.log('📋 Estrutura da tabela criada:');
          console.table(columns);
        }
        
        console.log('\n✅ Banco de dados configurado e pronto para uso!');
        db.end();
        process.exit(0);
      });
    });
  }
});
