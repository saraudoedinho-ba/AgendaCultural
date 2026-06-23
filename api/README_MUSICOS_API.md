# API de Músicos - Documentação

## Endpoint: Cadastro de Músico

### POST /musicos

Endpoint para cadastrar um novo músico/banda no sistema.

#### Request Body

```json
{
  "nome": "EDISON BARBOSA DA ROCHA",
  "email": "ba.edison@gmail.com",
  "senha": "senha123",
  "telefone": "11913227557",
  "tipoServico": "Banda de Rock",
  "localizacao": "Salvador",
  "descricao": "Descrição breve sobre o artista",
  "site": "www.siteartista.com",
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

#### Campos Obrigatórios
- `nome`: Nome artístico ou nome da banda
- `email`: E-mail para contato

#### Campos Opcionais
- `senha`: Senha para autenticação (se não fornecida, será gerada uma temporária)
- `telefone`: Telefone de contato
- `tipoServico`: Tipo de serviço oferecido
- `localizacao`: Localização (cidade/estado)
- `descricao`: Descrição breve sobre o artista
- `site`: Site do artista
- `redesSociais`: Objeto contendo redes sociais
  - `facebook`: Facebook do artista
  - `instagram`: Instagram do artista
  - `tiktok`: TikTok do artista
- `drive`: Link do Google Drive com materiais
- `videos`: Array com até 4 links de vídeos do YouTube

#### Response - Sucesso (201)

```json
{
  "mensagem": "Músico cadastrado com sucesso",
  "id": 1,
  "nome": "EDISON BARBOSA DA ROCHA",
  "email": "ba.edison@gmail.com"
}
```

#### Response - Erro (400)

```json
{
  "erro": "Nome e email são obrigatórios"
}
```

ou

```json
{
  "erro": "Email já cadastrado"
}
```

#### Response - Erro (500)

```json
{
  "erro": "Erro ao cadastrar músico"
}
```

---

## Endpoint: Listar Músicos

### GET /musicos

Lista todos os músicos cadastrados.

#### Response - Sucesso (200)

```json
[
  {
    "id": 1,
    "musNomeArtistico": "Nome da Banda",
    "musEmail": "email@example.com",
    "musTelefone": "(71) 99999-9999",
    "musEstado": "BA",
    "musCidade": "Salvador",
    "musGeneros": "Rock, Pop",
    "musDescricao": "Descrição do músico"
  }
]
```

---

## Endpoint: Buscar Músico por ID

### GET /musicos/:id

Busca um músico específico pelo ID.

#### Response - Sucesso (200)

```json
{
  "id": 1,
  "musNomeArtistico": "Nome da Banda",
  "musEmail": "email@example.com",
  "musTelefone": "(71) 99999-9999",
  "musEstado": "BA",
  "musCidade": "Salvador",
  "musGeneros": "Rock, Pop",
  "musContato": "contato@banda.com",
  "musDescricao": "Descrição completa",
  "musRedesSociais": "{\"facebook\":\"...\",\"instagram\":\"...\"}"
}
```

#### Response - Erro (404)

```json
{
  "erro": "Músico não encontrado"
}
```

---

## Endpoint: Atualizar Músico

### PUT /musicos/:id

Atualiza os dados de um músico.

#### Request Body

```json
{
  "musNomeArtistico": "Novo Nome",
  "musTelefone": "(71) 88888-8888",
  "musTipoServico": "Show ao vivo",
  "musLocalizacao": "São Paulo / SP",
  "musEstado": "SP",
  "musCidade": "São Paulo",
  "musGeneros": "Rock",
  "musContato": "contato@novo.com",
  "musDescricao": "Nova descrição",
  "musDescricaoBreve": "Descrição breve",
  "musRedesSociais": "{}",
  "musSiteArtista": "www.site.com",
  "musFacebook": "facebook.com/artista",
  "musInstagram": "@artista",
  "musTiktok": "@artista",
  "musDriveGoogle": "link",
  "musVideo01Youtube": "link1",
  "musVideo02Youtube": "link2",
  "musVideo03Youtube": "link3",
  "musVideo04Youtube": "link4"
}
```

#### Response - Sucesso (200)

```json
{
  "mensagem": "Músico atualizado com sucesso"
}
```

#### Response - Erro (404)

```json
{
  "erro": "Músico não encontrado"
}
```

---

## Endpoint: Deletar Músico

### DELETE /musicos/:id

Remove um músico do sistema.

#### Response - Sucesso (204)

Sem conteúdo no corpo da resposta.

#### Response - Erro (404)

```json
{
  "erro": "Músico não encontrado"
}
```

---

## Instalação e Configuração

### 1. Atualizar o banco de dados

Execute o script para adicionar as novas colunas:

```bash
node atualizar-tabela-musicos.js
```

### 2. Iniciar o servidor

```bash
node server-desktop.js
```

### 3. Testar a API

Use ferramentas como Postman ou Insomnia para testar os endpoints.

URL base (desenvolvimento): `http://localhost:3000`
URL base (produção): `https://desktop.edsonrocha.com.br:3000`

---

## Observações Importantes

1. A senha é criptografada usando bcrypt antes de ser armazenada
2. O e-mail deve ser único no sistema
3. Todos os campos, exceto nome artístico, e-mail e senha, são opcionais
4. O servidor suporta CORS para aceitar requisições de qualquer origem
5. Os links dos vídeos do YouTube podem ser os URLs completos ou apenas os IDs dos vídeos
