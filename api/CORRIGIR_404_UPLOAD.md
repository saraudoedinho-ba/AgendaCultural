# 🔄 INSTRUÇÕES PARA CORRIGIR O ERRO 404 NO UPLOAD

## Problema Identificado
O endpoint `/api/posImg` retorna 404 porque o servidor em produção não tem a rota registrada ou foi carregado antes das correções.

## ✅ Correções Aplicadas no Código

1. **dagratidao.js:**
   - Adicionado `express.urlencoded({ extended: true })`
   - Movida a rota `posImg` para ser carregada PRIMEIRO
   - Adicionados logs detalhados de Content-Type

## 🚀 PRÓXIMOS PASSOS (EXECUTE NO SERVIDOR)

### 1️⃣ Faça upload dos arquivos atualizados para o servidor:

```bash
# No servidor de produção, navegue até a pasta da API
cd /caminho/para/api

# Faça backup do arquivo atual
cp dagratidao.js dagratidao.js.backup

# Substitua pelo arquivo atualizado (usando FTP, SCP, ou seu método preferido)
```

### 2️⃣ Reinicie o servidor Node.js:

```bash
# Encontre o processo Node.js rodando
pm2 list
# OU
ps aux | grep node

# Reinicie usando PM2 (se estiver usando):
pm2 restart dagratidao
pm2 logs dagratidao

# OU mate o processo e inicie novamente:
pkill -f dagratidao.js
node dagratidao.js

# OU se estiver usando systemd:
sudo systemctl restart dagratidao
```

### 3️⃣ Verifique os logs após reiniciar:

Você deve ver esta mensagem no console:
```
✅ Rota POST /api/posImg registrada!
```

### 4️⃣ Teste o endpoint:

```bash
curl -X POST https://dagratidao.com.br/api/posImg \
  -H "Content-Type: multipart/form-data" \
  -v
```

**Resposta esperada:**
- Status: `400 Bad Request` (porque não enviamos imagem)
- Mensagem: `"Nenhuma imagem foi enviada"`

Isso confirma que a rota está funcionando!

### 5️⃣ Teste no app:

Depois que o servidor estiver reiniciado, tente postar novamente no aplicativo.

---

## 🔍 Debug Adicional

Se o erro persistir após reiniciar:

1. **Verifique se a rota foi carregada:**
   ```bash
   # Nos logs do servidor, procure por:
   "✅ Rota POST /api/posImg registrada!"
   ```

2. **Verifique se há erro de require:**
   ```bash
   # Procure por:
   "❌ ERRO ao carregar rota posImg:"
   ```

3. **Teste diretamente no servidor:**
   ```bash
   cd /caminho/para/api
   node -e "console.log(require('./routes/posImg.routes'))"
   ```

---

## 📝 Alterações Feitas

### Arquivo: `api/dagratidao.js`
- Linha ~14: Adicionado `app.use(express.urlencoded({ extended: true }))`
- Linha ~18: Adicionado log de Content-Type
- Linha ~40-48: Movida rota posImg para primeiro lugar
- Melhorada mensagem de log de sucesso

---

## ⚠️ IMPORTANTE

**NÃO ESQUEÇA DE:**
1. Fazer upload do arquivo `dagratidao.js` atualizado
2. Reiniciar o servidor Node.js
3. Verificar os logs após reiniciar
