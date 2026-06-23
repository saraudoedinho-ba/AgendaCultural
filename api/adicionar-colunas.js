const db = require('./db');

const alteracoes = [
  "ALTER TABLE musicos ADD COLUMN musBairro VARCHAR(100) NULL AFTER musCidade",
  "ALTER TABLE musicos ADD COLUMN musValorHora DECIMAL(10,2) NULL AFTER musGeneros",
  "ALTER TABLE musicos ADD COLUMN musValorDoSom DECIMAL(10,2) NULL AFTER musValorHora"
];

function executarAlteracao(index) {
  if (index >= alteracoes.length) {
    console.log('\n✅ Todas as colunas foram adicionadas com sucesso!\n');
    process.exit(0);
    return;
  }

  const sql = alteracoes[index];
  console.log(`\nExecutando: ${sql}`);
  
  db.query(sql, (err) => {
    if (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('⚠️  Coluna já existe, pulando...');
      } else {
        console.error('❌ Erro:', err.message);
        process.exit(1);
        return;
      }
    } else {
      console.log('✅ Coluna adicionada!');
    }
    
    executarAlteracao(index + 1);
  });
}

console.log('🔧 Adicionando colunas na tabela musicos...\n');
executarAlteracao(0);
