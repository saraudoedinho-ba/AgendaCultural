#!/bin/bash
# Script para testar a rota de upload no servidor

echo "======================================"
echo "Teste da Rota /api/posImg"
echo "======================================"
echo ""

# 1. Verificar se a rota está registrada
echo "1. Verificando arquivos..."
echo "   - posImg.routes.js existe?"
ls -la routes/posImg.routes.js 2>/dev/null && echo "   ✅ SIM" || echo "   ❌ NÃO"

echo "   - posImg.controller.js existe?"
ls -la controllers/posImg.controller.js 2>/dev/null && echo "   ✅ SIM" || echo "   ❌ NÃO"

echo "   - pasta uploads/postagens existe?"
ls -la uploads/postagens 2>/dev/null && echo "   ✅ SIM" || echo "   ❌ NÃO"

echo ""
echo "2. Verificando se multer está instalado..."
npm list multer 2>/dev/null && echo "   ✅ INSTALADO" || echo "   ❌ NÃO INSTALADO - Execute: npm install multer"

echo ""
echo "3. Testando a rota..."
echo "   Fazendo POST para https://dagratidao.com.br/api/posImg"
echo ""

# Criar uma imagem de teste pequena
echo "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" | base64 -d > test.png

curl -X POST https://dagratidao.com.br/api/posImg \
  -F "image=@test.png" \
  -H "Accept: application/json" \
  -w "\n\nStatus: %{http_code}\n" \
  -s

rm test.png

echo ""
echo "======================================"
echo "Se retornou 404, verifique:"
echo "1. Se o servidor foi reiniciado"
echo "2. Se os logs mostram algum erro"
echo "3. Execute: pm2 logs dagratidao"
echo "======================================"
