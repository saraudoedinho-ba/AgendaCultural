const db = require('./db');

db.query('DESCRIBE musicos', (err, results) => {
  if (err) {
    console.error('❌ Erro:', err);
    process.exit(1);
  }
  
  console.log('\n📋 Estrutura da tabela musicos:\n');
  results.forEach(col => {
    console.log(`- ${col.Field} (${col.Type}) ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'}`);
  });
  
  console.log('\n✅ Verificação concluída!\n');
  process.exit(0);
});
