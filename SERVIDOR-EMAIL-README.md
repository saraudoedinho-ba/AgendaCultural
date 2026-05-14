# 📧 Servidor de Email - Agenda Cultural

API simples para enviar notificações por email quando um músico se cadastra.

## 🚀 Configuração no Servidor Debian

### 1. Instalar Node.js (se não tiver)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version
```

### 2. Criar pasta para o servidor
```bash
mkdir -p /var/www/email-server
cd /var/www/email-server
```

### 3. Copiar os arquivos
Transfira estes arquivos para o servidor:
- `server-email.js`
- `server-email-package.json` (renomeie para `package.json`)

```bash
# No servidor
mv server-email-package.json package.json
```

### 4. Instalar dependências
```bash
npm install
```

### 5. Configurar credenciais do Gmail

**Abra o arquivo:**
```bash
nano server-email.js
```

**Edite as linhas 18-19:**
```javascript
auth: {
  user: 'SEU_EMAIL@gmail.com',      // Troque aqui
  pass: 'sua_senha_app_do_gmail'    // Troque aqui
}
```

**Também na linha 30:**
```javascript
from: '"Agenda Cultural" <SEU_EMAIL@gmail.com>',
```

Salve com `Ctrl+O`, `Enter`, `Ctrl+X`.

### 6. Como gerar senha de app do Gmail

1. Acesse: https://myaccount.google.com/security
2. Ative **Verificação em duas etapas**
3. Vá em: https://myaccount.google.com/apppasswords
4. Crie uma senha para "Agenda Cultural"
5. Copie a senha gerada e cole no arquivo `server-email.js`

### 7. Testar localmente
```bash
node server-email.js
```

Deve aparecer:
```
🚀 Servidor de email rodando na porta 3001
📧 Endpoint: http://localhost:3001/server-email
```

### 8. Testar envio de email
```bash
curl -X POST http://localhost:3001/server-email \
  -H "Content-Type: application/json" \
  -d '{
    "nomeArtistico": "Teste",
    "email": "teste@exemplo.com",
    "telefone": "11999999999",
    "cidade": "São Paulo",
    "estado": "SP"
  }'
```

Se funcionar, você receberá um email em `ba.edison@gmail.com`.

### 9. Rodar em produção com PM2

```bash
# Instalar PM2
sudo npm install -g pm2

# Iniciar o servidor
pm2 start server-email.js --name email-server

# Iniciar automaticamente ao reiniciar o servidor
pm2 startup
pm2 save

# Ver logs
pm2 logs email-server

# Status
pm2 status
```

### 10. Configurar proxy reverso com Nginx

```bash
sudo nano /etc/nginx/sites-available/agendamusical.net.br
```

Adicione dentro do bloco `server`:
```nginx
location /server-email {
    proxy_pass http://localhost:3001/server-email;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

Reinicie o Nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 11. Testar pela URL pública
```bash
curl -X POST https://agendamusical.net.br/server-email \
  -H "Content-Type: application/json" \
  -d '{
    "nomeArtistico": "Teste Produção",
    "email": "teste@exemplo.com"
  }'
```

## 🔧 Comandos úteis

```bash
# Parar o servidor
pm2 stop email-server

# Reiniciar
pm2 restart email-server

# Ver logs em tempo real
pm2 logs email-server --lines 50

# Remover do PM2
pm2 delete email-server
```

## 🐛 Troubleshooting

**Email não está sendo enviado:**
1. Verifique se a senha de app do Gmail está correta
2. Confirme que a verificação em duas etapas está ativa
3. Veja os logs: `pm2 logs email-server`

**Erro de CORS:**
- O servidor já está configurado para aceitar requisições de qualquer origem
- Se necessário, edite a linha 8 do `server-email.js`

**Porta 3001 já em uso:**
- Troque a variável `PORT` no início do arquivo
- Ou mate o processo: `sudo lsof -ti:3001 | xargs kill -9`

## 📝 API Endpoints

### POST /server-email
Envia notificação de cadastro.

**Body (JSON):**
```json
{
  "nomeArtistico": "Nome do Artista",
  "email": "email@exemplo.com",
  "telefone": "11999999999",
  "cidade": "São Paulo",
  "estado": "SP"
}
```

**Resposta sucesso:**
```json
{
  "success": true,
  "message": "Email enviado com sucesso!"
}
```

### GET /health
Verifica se o servidor está funcionando.

**Resposta:**
```json
{
  "status": "OK",
  "service": "server-email",
  "timestamp": "2026-04-13T..."
}
```
