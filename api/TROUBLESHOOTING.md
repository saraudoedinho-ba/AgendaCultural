# Troubleshooting - Upload de Imagem

## Erro "Not Found" - Possíveis Causas e Soluções

### 1. Verificar se a API está rodando

**Problema**: A API não está iniciada ou não está acessível

**Solução**:
```bash
cd api
node dagratidao.js
```

Ou se tiver um arquivo server.js:
```bash
cd api
npm start
```

### 2. Verificar a URL correta

**URL esperada**: `https://dagratidao.com.br/api/posImg`

**Verifique no código**:
- Frontend está chamando: `new URL('posImg', AppConfig.url)` onde `AppConfig.url = 'https://dagratidao.com.br/api/'`
- Isso resulta em: `https://dagratidao.com.br/api/posImg` ✅

### 3. Testar a rota manualmente

Use o curl ou Postman:

```bash
curl -X POST https://dagratidao.com.br/api/posImg \
  -F "image=@caminho/para/sua/imagem.jpg"
```

### 4. Verificar logs da API

Quando a requisição chega, a API deve mostrar:
```
POST /api/posImg
```

Se aparecer 404, a rota não está registrada corretamente.

### 5. Verificar CORS

Se o erro for de CORS (e não 404), adicione no dagratidao.js:

```javascript
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));
```

### 6. Verificar se o arquivo dagratidao.js está correto

Certifique-se que tem:
```javascript
// Servir uploads como estático
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Registrar rota
app.use('/api/', require('./routes/posImg.routes'));
```

### 7. Verificar permissões da pasta uploads

```bash
# Linux/Mac
chmod -R 755 uploads/

# Windows (PowerShell como admin)
icacls uploads /grant Everyone:F /T
```

### 8. Verificar se o módulo está sendo exportado

Em `routes/posImg.routes.js`:
```javascript
module.exports = router; // ✅ Deve ter isso no final
```

### 9. Testar em desenvolvimento local

Temporariamente, teste com localhost:

```typescript
// No AppConfig
static readonly url = 'http://localhost:3000/api/';
```

Execute a API:
```bash
cd api
node dagratidao.js
```

### 10. Ver logs completos no mobile

Conecte o celular e veja os logs:

```bash
# Chrome DevTools
chrome://inspect

# Ou via adb
adb logcat | grep -i "chromium"
```

## Checklist Rápido

- [ ] API está rodando?
- [ ] Pasta `uploads/postagens/` existe?
- [ ] Rota `/api/posImg` está registrada em dagratidao.js?
- [ ] O arquivo `routes/posImg.routes.js` exporta o router?
- [ ] CORS está configurado?
- [ ] Consegue acessar outras rotas da API (ex: `/api/postagens`)?

## Teste Rápido

1. Teste outra rota primeiro para ver se a API está ok:
```bash
curl https://dagratidao.com.br/api/postagens
```

2. Se funcionar, o problema é específico da rota de upload
3. Se não funcionar, a API não está acessível
