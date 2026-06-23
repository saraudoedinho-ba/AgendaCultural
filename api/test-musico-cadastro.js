// Configuração da API
const API_URL = 'http://localhost:3000/musicos';

// Dados de teste no formato esperado
const dadosTeste = {
  "nome": "EDISON BARBOSA DA ROCHA",
  "email": `teste_${Date.now()}@gmail.com`,
  "telefone": "11913227557",
  "tipoServico": "Banda de Rock",
  "localizacao": "Salvador",
  "descricao": "teste",
  "site": "ewre",
  "redesSociais": {
    "facebook": "werwer",
    "instagram": "werwer",
    "tiktok": "werwerw"
  },
  "drive": "werwer",
  "videos": [
    "werwe",
    "rwerwer",
    "werwer",
    "wer"
  ]
};

async function testarCadastro() {
  console.log('🧪 Testando cadastro de músico...\n');
  console.log('Dados enviados:');
  console.log(JSON.stringify(dadosTeste, null, 2));
  console.log('\n---\n');

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosTeste)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Sucesso!');
      console.log('Status:', response.status);
      console.log('Resposta:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.error('❌ Erro ao cadastrar:');
      console.error('Status:', response.status);
      console.error('Dados:', data);
    }
  } catch (error) {
    console.error('❌ Erro na requisição:');
    console.error(error.message);
    console.error('\n⚠️  Certifique-se de que o servidor está rodando em', API_URL);
  }
}

// Executar teste
testarCadastro();
