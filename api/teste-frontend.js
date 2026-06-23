// Script para testar o cadastro via fetch direto do navegador
// Cole este código no console do navegador (F12)

const testeCadastro = async () => {
  console.log('🧪 Iniciando teste de cadastro...');
  
  const dados = {
    musNomeArtistico: "Banda Teste Frontend",
    musEmail: "bandarock" + Date.now() + "@teste.com",
    musSenha: "123456",
    musTelefone: "11999999999",
    musEstado: "SP",
    musCidade: "São Paulo",
    musBairro: "Centro",
    musGeneros: "Rock",
    musValorHora: "150",
    musValorDoSom: "600",
    musContato: "11999999999",
    musDescricao: "Teste automatizado",
    musRedesSociais: ""
  };

  console.log('📦 Dados a serem enviados:', dados);

  try {
    const response = await fetch('http://localhost:3000/api/musicos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    console.log('📡 Status da resposta:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro na resposta:', errorText);
      return;
    }

    const resultado = await response.json();
    console.log('✅ Sucesso! Resposta da API:', resultado);
    console.log('📢 Mensagem:', resultado.mensagem);
    console.log('🆔 ID do músico:', resultado.id);
    
  } catch (error) {
    console.error('❌ Erro na requisição:', error);
  }
};

// Executar o teste
testeCadastro();
