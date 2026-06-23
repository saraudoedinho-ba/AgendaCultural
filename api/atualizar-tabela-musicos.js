const db = require('./db');
const fs = require('fs');
const path = require('path');

async function atualizarTabelaMusicos() {
  try {
    console.log('🔄 Iniciando atualização da tabela musicos...\n');

    // Verificar colunas existentes
    const [colunas] = await db.promise().query('SHOW COLUMNS FROM musicos');
    const colunasExistentes = colunas.map(col => col.Field);
    
    console.log('Colunas existentes:', colunasExistentes.join(', '));
    console.log('\n---\n');

    // Lista de colunas a adicionar
    const novasColunas = [
      { nome: 'musTipoServico', tipo: 'VARCHAR(100)' },
      { nome: 'musSiteArtista', tipo: 'VARCHAR(255)' },
      { nome: 'musFacebook', tipo: 'VARCHAR(255)' },
      { nome: 'musInstagram', tipo: 'VARCHAR(255)' },
      { nome: 'musTiktok', tipo: 'VARCHAR(255)' },
      { nome: 'musDriveGoogle', tipo: 'TEXT' },
      { nome: 'musVideo01Youtube', tipo: 'VARCHAR(255)' },
      { nome: 'musVideo02Youtube', tipo: 'VARCHAR(255)' },
      { nome: 'musVideo03Youtube', tipo: 'VARCHAR(255)' },
      { nome: 'musVideo04Youtube', tipo: 'VARCHAR(255)' },
      { nome: 'musLocalizacao', tipo: 'VARCHAR(255)' },
      { nome: 'musDescricaoBreve', tipo: 'TEXT' }
    ];

    // Adicionar apenas colunas que não existem
    let adicionadas = 0;
    let jaExistentes = 0;

    for (const coluna of novasColunas) {
      if (!colunasExistentes.includes(coluna.nome)) {
        console.log(`➕ Adicionando coluna: ${coluna.nome}`);
        await db.promise().query(`ALTER TABLE musicos ADD COLUMN ${coluna.nome} ${coluna.tipo}`);
        adicionadas++;
      } else {
        console.log(`✓ Coluna já existe: ${coluna.nome}`);
        jaExistentes++;
      }
    }

    console.log('\n---\n');
    console.log(`✅ Atualização concluída!`);
    console.log(`   ${adicionadas} colunas adicionadas`);
    console.log(`   ${jaExistentes} colunas já existiam`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao atualizar tabela:', error);
    process.exit(1);
  }
}

// Executar atualização
atualizarTabelaMusicos();
