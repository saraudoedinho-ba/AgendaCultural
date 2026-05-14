# 📧 API de Email - Agenda Cultural

API para enviar notificações por email quando um músico se cadastra na plataforma.

## 🚀 Configuração no Servidor Debian (ou local)

### 1. Instalar Node.js (se não tiver)
```bash
# Verificar se já tem
node --version

# Se não tiver, instalar
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### 2. Instalar dependências
```bash
cd api-email
npm install
```

### 3. Configurar credenciais do Gmail

**Edite o arquivo `server.js`:**
```bash
nano server.js
```

**Troque as linhas 18-19:**
```javascript
auth: {
  user: 'seu_email@gmail.com',      // ⚠️ TROCAR
  pass: 'sua_senha_app_do_gmail'    // ⚠️ TROCAR
}
```

**E também a linha 38:**
```javascript
from: '"Agenda Cultural" <seu_email@gmail.com>',
```

Salve: `Ctrl+O` → `Enter` → `Ctrl+X`

### 4. Como gerar senha de app do Gmail

1. Acesse: https://myaccount.google.com/security
2. Ative **Verificação em duas etapas**
3. Vá em: https://myaccount.google.com/apppasswords
4. Crie uma senha para "Agenda Cultural"
5. Copie a senha gerada (16 caracteres)
6. Cole no `server.js` linha 19

---

## 🧪 Testar Localmente (Windows/Linux)

### Opção 1 - Direto no Node
```bash
# Iniciar
node server.js

# Deve aparecer:
# 🚀 API de Email rodando na porta 3001
# 📧 Endpoint: http://localhost:3001/server-email
```

### Opção 2 - Com auto-reload (desenvolvimento)
```bash
npm run dev
```

### Testar o endpoint
```bash
# Linux/Mac
curl -X POST http://localhost:3001/server-email \
  -H "Content-Type: application/json" \
  -d '{
    "nomeArtistico": "Teste Local",
    "email": "teste@exemplo.com",
    "telefone": "11999999999",
    "cidade": "São Paulo",
    "estado": "SP"
  }'

# PowerShell (Windows)
$body = @{
    nomeArtistico = "Teste Local"
    email = "teste@exemplo.com"
    telefone = "11999999999"
    cidade = "São Paulo"
    estado = "SP"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/server-email" -Method Post -Body $body -ContentType "application/json"
```

Se funcionar, você receberá email em `ba.edison@gmail.com`.

---

## 🐳 Rodar em Produção com PM2 (recomendado)

### Instalar PM2
```bash
sudo npm install -g pm2
```

### Iniciar a API
```bash
cd api-email
pm2 start server.js --name api-email
```

### Iniciar automaticamente ao reiniciar servidor
```bash
pm2 startup
# Copie e execute o comando que aparecer

pm2 save
```

### Comandos úteis PM2
```bash
# Ver status
pm2 status

# Ver logs em tempo real
pm2 logs api-email

# Parar
pm2 stop api-email

# Reiniciar
pm2 restart api-email

# Remover
pm2 delete api-email

# Monitoramento
pm2 monit
```

---

## 🌐 Configurar Proxy Reverso (Nginx)

Para acessar via `https://agendamusical.net.br/server-email`:

### Editar configuração do Nginx
```bash
sudo nano /etc/nginx/sites-available/agendamusical.net.br
```

### Adicionar dentro do bloco `server {}`
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
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /health {
    proxy_pass http://localhost:3001/health;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
}
```

### Testar e reiniciar Nginx
```bash
# Testar configuração
sudo nginx -t

# Se OK, recarregar
sudo systemctl reload nginx
```

### Testar via URL pública
```bash
curl -X POST https://agendamusical.net.br/server-email \
  -H "Content-Type: application/json" \
  -d '{
    "nomeArtistico": "Teste Produção",
    "email": "teste@exemplo.com"
  }'

# Health check
curl https://agendamusical.net.br/health
```

---

## 📝 API Endpoints

### `POST /server-email`
Envia notificação de cadastro de músico.

**Body (JSON):**
```json
{
  "nomeArtistico": "Nome do Artista",
  "email": "email@exemplo.com",
  "telefone": "11999999999",      // opcional
  "cidade": "São Paulo",           // opcional
  "estado": "SP"                   // opcional
}
```

**Resposta sucesso (200):**
```json
{
  "success": true,
  "message": "Email enviado com sucesso!"
}
```

**Resposta erro validação (400):**
```json
{
  "error": "Campos obrigatórios: nomeArtistico e email"
}
```

**Resposta erro servidor (500):**
```json
{
  "error": "Falha ao enviar email",
  "details": "Mensagem do erro"
}
```

### `GET /health`
Verifica se a API está funcionando.

**Resposta:**
```json
{
  "status": "OK",
  "service": "api-email",
  "timestamp": "2026-04-13T12:00:00.000Z"
}
```

### `GET /`
Informações sobre a API.

**Resposta:**
```json
{
  "service": "Agenda Cultural - API de Email",
  "version": "1.0.0",
  "endpoints": {
    "health": "GET /health",
    "sendEmail": "POST /server-email"
  }
}
```

---

## 🐛 Troubleshooting

### Email não está sendo enviado

**1. Verificar credenciais do Gmail**
```bash
# Ver logs
pm2 logs api-email

# Procurar por "Invalid login" ou "Authentication failed"
```

**2. Confirmar senha de app**
- Deve ser uma senha de 16 caracteres gerada em https://myaccount.google.com/apppasswords
- NÃO é a senha normal da sua conta

**3. Verificar verificação em duas etapas**
- Precisa estar ativa para gerar senhas de app

### Erro de CORS

O CORS já está configurado para aceitar todas as origens:
```javascript
app.use(cors());
```

Se precisar restringir:
```javascript
app.use(cors({
  origin: 'https://agendamusical.net.br'
}));
```

### Porta 3001 já em uso

**Opção 1 - Trocar porta:**
```bash
nano server.js
# Linha 5: const PORT = process.env.PORT || 3002;
```

**Opção 2 - Matar processo na porta:**
```bash
# Linux
sudo lsof -ti:3001 | xargs kill -9

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Logs detalhados

```bash
# Ver logs completos
pm2 logs api-email --lines 200

# Limpar logs
pm2 flush

# Monitoramento em tempo real
pm2 monit
```

---

## 🔐 Segurança

### Usar variáveis de ambiente (recomendado)

**1. Instalar dotenv:**
```bash
npm install dotenv
```

**2. Criar arquivo `.env`:**
```bash
cp .env.example .env
nano .env
```

Editar:
```env
PORT=3001
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_app
EMAIL_DESTINO=ba.edison@gmail.com
```

**3. Usar no código:**
```javascript
require('dotenv').config();

const transporter = nodemailer.createTransport({
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

---

## 📊 Monitoramento

### Ver uso de recursos
```bash
pm2 monit
```

### Verificar uptime
```bash
pm2 list
```

### Configurar alertas (opcional)
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
```

---

## ✅ Checklist de Deploy

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Credenciais do Gmail configuradas
- [ ] Senha de app gerada e inserida
- [ ] Teste local funcionou (`node server.js`)
- [ ] PM2 instalado e rodando
- [ ] Nginx configurado (proxy reverso)
- [ ] Teste via URL pública funcionou
- [ ] Email recebido em `ba.edison@gmail.com`
- [ ] PM2 configurado para iniciar no boot (`pm2 startup`)

---

**Precisa de ajuda?** Verifique os logs com `pm2 logs api-email`
