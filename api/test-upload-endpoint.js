// Script para testar o endpoint de upload
const https = require('https');
const FormData = require('form-data');
const fs = require('fs');

console.log('🧪 Testando endpoint de upload...\n');

// Criar um teste com FormData vazio primeiro
const form = new FormData();

const options = {
  hostname: 'dagratidao.com.br',
  port: 443,
  path: '/api/posImg',
  method: 'POST',
  headers: form.getHeaders()
};

console.log(`📡 Fazendo requisição para: https://${options.hostname}${options.path}`);
console.log(`📋 Headers:`, form.getHeaders());

const req = https.request(options, (res) => {
  console.log(`\n✅ Status Code: ${res.statusCode}`);
  console.log(`📋 Headers de resposta:`, res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('\n📦 Resposta completa:');
    try {
      console.log(JSON.parse(data));
    } catch (e) {
      console.log(data);
    }
  });
});

req.on('error', (error) => {
  console.error('\n❌ Erro na requisição:', error.message);
});

form.pipe(req);
