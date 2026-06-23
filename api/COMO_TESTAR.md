# Como Testar a API de Músicos

## 1. Iniciar o Servidor

Abra um terminal e execute:

```powershell
cd api
$env:NODE_ENV='development'
node server-desktop.js
```

Você deverá ver:
```
🌍 Ambiente: development
🚀 Servidor HTTP rodando em http://localhost:3000 (modo desenvolvimento)
🟢 Conectado ao MySQL
```

## 2. Testar o Cadastro

Em **outro terminal**, execute:

```powershell
cd api
.\test-musico.ps1
```

Ou use curl/Postman com o seguinte JSON:

**POST** `http://localhost:3000/api/musicos`

```json
{
  "nome": "EDISON BARBOSA DA ROCHA",
  "email": "teste@exemplo.com",
  "telefone": "11913227557",
  "tipoServico": "Banda de Rock",
  "localizacao": "Salvador",
  "descricao": "teste",
  "site": "www.site.com",
  "redesSociais": {
    "facebook": "facebook.com/artista",
    "instagram": "@artista",
    "tiktok": "@artista"
  },
  "drive": "link-do-drive",
  "videos": [
    "link-video-1",
    "link-video-2",
    "link-video-3",
    "link-video-4"
  ]
}
```

## 3. Resposta Esperada

```json
{
  "mensagem": "Músico cadastrado com sucesso",
  "id": 1,
  "nome": "EDISON BARBOSA DA ROCHA",
  "email": "teste@exemplo.com"
}
```

## 4. Outras Rotas Disponíveis

- **GET** `/musicos` - Listar todos os músicos
- **GET** `/musicos/:id` - Buscar músico por ID
- **PUT** `/musicos/:id` - Atualizar músico
- **DELETE** `/musicos/:id` - Deletar músico

## Notas

- O campo `email` deve ser único
- O campo `senha` é opcional. Se não fornecido, uma senha temporária será gerada
- As redes sociais estão em um objeto `redesSociais`
- Os vídeos estão em um array `videos` (máximo 4)
