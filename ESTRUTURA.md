# Agenda Cultural - Estrutura do Projeto

## 📁 Estrutura de Arquivos

```
src/app/
├── pages/
│   └── home/
│       ├── home.component.ts       # Componente da página Home
│       ├── home.component.html     # Template HTML da Home
│       └── home.component.css      # Estilos da Home
├── app.config.ts                   # Configuração do app
├── app.routes.ts                   # Configuração de rotas
├── app.ts                          # Componente raiz (container)
├── app.html                        # Template do app raiz
└── app.css                         # Estilos do app raiz
```

## 🚀 Características Implementadas

### Home Component
- ✅ Header com logo, título e botões de ação
- ✅ Seção "Anuncie Aqui" com grid de portfólio (8 imagens em 4x2)
- ✅ Seção de artistas mais bem avaliados com 5 estrelas
- ✅ Grid de 4 cards de artistas com imagens e botão "VER PERFIL"
- ✅ Design responsivo para mobile, tablet e desktop
- ✅ Efeitos hover em botões e cards
- ✅ Cores e layout conforme o design fornecido

### Roteamento
- ✅ Rota principal (`/`) configurada para o componente Home
- ✅ Lazy loading do componente Home
- ✅ Redirecionamento de rotas não encontradas para a Home

## 🎨 Paleta de Cores

- **Azul Primário**: #003D82
- **Azul Secundário**: #0066CC
- **Azul Claro**: #00A8E8
- **Dourado (Estrelas)**: #FFD700
- **Branco**: #FFFFFF
- **Cinza Claro**: #F5F5F5

## 📱 Responsividade

### Desktop (> 1024px)
- Grid de portfólio: 4 colunas x 2 linhas
- Grid de artistas: 4 colunas
- Layout horizontal completo

### Tablet (768px - 1024px)
- Grid de artistas: 2 colunas
- Ajustes de espaçamento

### Mobile (< 768px)
- Header em coluna
- Botões em coluna
- Grid de portfólio: 2 colunas
- Grid de artistas: 1 coluna
- Menu hamburguer visível

## 🖼️ Imagens

Atualmente usando imagens placeholder do Unsplash:
- **Portfólio**: 8 imagens de instrumentos e música
- **Artistas**: 4 imagens de músicos e bandas

Para usar imagens locais, substitua as URLs no arquivo:
`src/app/pages/home/home.component.ts`

Coloque as imagens em:
`public/assets/images/`

## 🔧 Próximos Passos

1. Substituir imagens placeholder por imagens reais
2. Implementar funcionalidade dos botões
3. Criar páginas de cadastro e busca de artistas
4. Adicionar sistema de autenticação
5. Integrar com backend/API

## 🚦 Para Executar

```bash
npm start
```

A aplicação abrirá em: `http://localhost:4200`
