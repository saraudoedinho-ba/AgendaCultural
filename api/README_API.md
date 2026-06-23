# API - Endpoint de Login

API simplificada contendo apenas o endpoint de autenticação de usuários.

## Estrutura

```
api/
├── agendaMusical.js          # Servidor principal
├── db.js                     # Configuração do banco de dados
├── controllers/
│   └── usuario.controller.js # Controller de login
└── routes/
    └── usuario.routes.js     # Rota de login
```

## Instalação

```bash
cd api
npm install
```

## Configuração

Certifique-se de que o arquivo `db.js` está configurado com as credenciais corretas do banco MySQL.

## Executar

```bash
node agendaMusical.js
```

O servidor será iniciado em `http://localhost:3000/api`

## Endpoint

### POST /api/login

Autentica um usuário no sistema.

**Body:**
```json
{
  "usuEmail": "usuario@exemplo.com",
  "usuSenha": "senha123"
}
```

**Resposta de sucesso (200):**
```json
{
  "usuario": {
    "id": 1,
    "usuNome": "Nome do Usuário",
    "usuEmail": "usuario@exemplo.com"
  }
}
```

**Respostas de erro:**
- `400` - Email e senha obrigatórios
- `401` - Credenciais inválidas ou usuário não encontrado
- `500` - Erro interno do servidor
