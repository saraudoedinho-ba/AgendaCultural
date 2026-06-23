const db = require('./db');

const createTableSQL = `
CREATE TABLE IF NOT EXISTS musicos (
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
);
`;

const createIndexes = [
  'CREATE INDEX IF NOT EXISTS idx_musicos_email ON musicos(musEmail);',
  'CREATE INDEX IF NOT EXISTS idx_musicos_estado_cidade ON musicos(musEstado, musCidade);'
];

console.log('Criando tabela de músicos...');

db.query(createTableSQL, (err, result) => {
  if (err) {
    console.error('❌ Erro ao criar tabela:', err);
    process.exit(1);
  }
  
  console.log('✅ Tabela musicos criada com sucesso!');
  
  // Criar índices
  let indexCount = 0;
  createIndexes.forEach((indexSQL, i) => {
    db.query(indexSQL, (err, result) => {
      if (err) {
        console.error(`❌ Erro ao criar índice ${i + 1}:`, err);
      } else {
        console.log(`✅ Índice ${i + 1} criado com sucesso!`);
      }
      
      indexCount++;
      if (indexCount === createIndexes.length) {
        console.log('\n✅ Configuração do banco de dados concluída!');
        process.exit(0);
      }
    });
  });
});
