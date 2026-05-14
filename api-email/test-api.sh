#!/bin/bash
# Script de teste da API de Email (Linux/Mac)
# Execute: chmod +x test-api.sh && ./test-api.sh

echo "🧪 Testando API de Email - Agenda Cultural"
echo "============================================"
echo ""

# Verificar se a API está rodando
echo "1️⃣ Verificando se a API está online..."

if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ API está online!"
    curl -s http://localhost:3001/health | jq '.'
    echo ""
else
    echo "❌ API não está rodando!"
    echo "   Execute primeiro: node server.js"
    echo ""
    exit 1
fi

# Testar envio de email
echo "2️⃣ Enviando email de teste..."

response=$(curl -s -X POST http://localhost:3001/server-email \
  -H "Content-Type: application/json" \
  -d '{
    "nomeArtistico": "Teste Bash",
    "email": "teste@agendamusical.net.br",
    "telefone": "11999999999",
    "cidade": "São Paulo",
    "estado": "SP"
  }')

if echo "$response" | jq -e '.success' > /dev/null 2>&1; then
    echo "✅ Email enviado com sucesso!"
    echo "$response" | jq '.'
    echo ""
    echo "📧 Verifique ba.edison@gmail.com"
else
    echo "❌ Erro ao enviar email!"
    echo "$response" | jq '.'
fi

echo ""
echo "============================================"
echo "Teste concluído!"
