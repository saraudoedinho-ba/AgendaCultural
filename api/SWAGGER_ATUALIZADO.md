# Documentação Swagger Atualizada

## ✅ Swagger atualizado com sucesso!

O arquivo `swagger.json` foi atualizado para refletir o novo formato de cadastro de músicos.

## 📋 Principais Mudanças

### Endpoint POST /musicos

#### Novo formato de requisição:

```json
{
  "nome": "EDISON BARBOSA DA ROCHA",
  "email": "ba.edison@gmail.com",
  "senha": "senha123",
  "telefone": "11913227557",
  "tipoServico": "Banda de Rock",
  "localizacao": "Salvador",
  "descricao": "Banda de rock com 10 anos de estrada",
  "site": "www.siteartista.com",
  "redesSociais": {
    "facebook": "facebook.com/artista",
    "instagram": "@artista",
    "tiktok": "@artista"
  },
  "drive": "https://drive.google.com/...",
  "videos": [
    "https://youtube.com/watch?v=...",
    "https://youtube.com/watch?v=...",
    "https://youtube.com/watch?v=...",
    "https://youtube.com/watch?v=..."
  ]
}
```

#### Campos obrigatórios:
- `nome` - Nome artístico ou da banda
- `email` - E-mail (deve ser único)

#### Campos opcionais:
- `senha` - Senha (será gerada uma temporária se não fornecida)
- `telefone` - Telefone de contato
- `tipoServico` - Tipo de serviço oferecido
- `localizacao` - Localização (cidade/estado)
- `descricao` - Descrição breve
- `site` - Site do artista
- `redesSociais` - Objeto com redes sociais (facebook, instagram, tiktok)
- `drive` - Link do Google Drive
- `videos` - Array com até 4 links de vídeos do YouTube

### Mudanças na estrutura:

1. **Campos renomeados:**
   - `musNomeArtistico` → `nome`
   - `musEmail` → `email`
   - `musSenha` → `senha`
   - `musTelefone` → `telefone`
   - `musTipoServico` → `tipoServico`
   - `musLocalizacao` → `localizacao`
   - `musDescricaoBreve` → `descricao`
   - `musSiteArtista` → `site`
   - `musDriveGoogle` → `drive`

2. **Redes sociais agora são um objeto:**
   - Antes: `musRedesSociais` (string JSON)
   - Agora: `redesSociais` (objeto com facebook, instagram, tiktok)

3. **Vídeos agora são um array:**
   - Antes: `musVideo01Youtube`, `musVideo02Youtube`, etc. (campos separados)
   - Agora: `videos` (array com até 4 elementos)

4. **Senha agora é opcional:**
   - Se não fornecida, uma senha temporária será gerada

## 🌐 Acessar documentação Swagger

Com o servidor rodando, acesse:

**http://localhost:3000/api-docs**

Você verá a interface do Swagger UI com toda a documentação interativa dos endpoints.

## 🔧 Como testar pelo Swagger UI

1. Inicie o servidor:
   ```bash
   cd api
   $env:NODE_ENV='development'
   node server-desktop.js
   ```

2. Abra no navegador:
   ```
   http://localhost:3000/api-docs
   ```

3. Expanda o endpoint `POST /musicos`

4. Clique em "Try it out"

5. Edite o JSON de exemplo

6. Clique em "Execute"

7. Veja a resposta abaixo

## 📝 Rotas atualizadas no Swagger

- `POST /musicos` - Cadastrar novo músico (formato atualizado)
- `GET /musicos` - Listar todos os músicos
- `GET /musicos/{id}` - Buscar músico por ID
- `PUT /musicos/{id}` - Atualizar músico
- `DELETE /musicos/{id}` - Deletar músico
