// Carregar variáveis de ambiente
require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const app = express();

// Configuração CORS - Permitir qualquer origem para testes mobile
const corsOptions = {
  origin: '*', // Permite qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false // Importante: deve ser false quando origin é '*'
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/api', require('./routes/usuario.routes'));
app.use('/api', require('./routes/musico.routes'));


// Configuração de porta
const PORT = process.env.PORT || 3000;

// Servidor HTTP
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
