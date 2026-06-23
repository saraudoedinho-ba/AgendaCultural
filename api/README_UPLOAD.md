# API - Upload de Imagens

## Endpoint de Upload de Imagens para Postagens

### POST /api/posImg

Endpoint para fazer upload de imagens que serão associadas às postagens.

#### Configuração

- **Pasta de destino**: `uploads/postagens/`
- **Tamanho máximo**: 5MB
- **Formatos aceitos**: JPEG, JPG, PNG, GIF, WebP
- **Nome do arquivo**: Gerado automaticamente com timestamp único

#### Request

**Content-Type**: `multipart/form-data`

**Body**:
- `image` (file): Arquivo de imagem a ser enviado

#### Response - Sucesso (200)

```json
{
  "ok": true,
  "message": "Imagem enviada com sucesso",
  "path": "uploads/postagens/post-1234567890-123456789.jpg",
  "filename": "post-1234567890-123456789.jpg",
  "url": "/uploads/postagens/post-1234567890-123456789.jpg"
}
```

#### Response - Erro (400)

```json
{
  "erro": "Nenhuma imagem foi enviada",
  "message": "Por favor, selecione uma imagem para fazer upload"
}
```

#### Response - Erro (500)

```json
{
  "erro": "Erro ao processar upload da imagem",
  "message": "Mensagem de erro específica"
}
```

### Uso da Imagem

Após o upload bem-sucedido, utilize o campo `path` retornado para associar a imagem à postagem ao criar/editar uma postagem através do endpoint `/api/postagens`.

### Acesso às Imagens

As imagens ficam acessíveis através da URL:
```
https://dagratidao.com.br/uploads/postagens/[filename]
```

### Estrutura de Pastas

```
api/
├── uploads/
│   └── postagens/
│       ├── .gitignore
│       └── [arquivos de imagem]
├── controllers/
│   └── posImg.controller.js
└── routes/
    └── posImg.routes.js
```

### Dependências

- `multer`: Middleware para upload de arquivos
- `express`: Framework web

### Exemplo de Uso (JavaScript/TypeScript)

```typescript
const formData = new FormData();
formData.append('image', imageBlob, filename);

const response = await fetch('https://dagratidao.com.br/api/posImg', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result.path); // uploads/postagens/post-1234567890-123456789.jpg
```
