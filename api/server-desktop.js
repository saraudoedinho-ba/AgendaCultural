// ✅ Carregar variáveis de ambiente antes de qualquer outra coisa
require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();

// ✅ Middlewares
app.use(express.json());

// Configuração CORS para aceitar requisições de qualquer origem
app.use(cors({
    origin: '*', // Permite qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
}));

// ✅ Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Rotas
app.use('/', require('./routes/usuario.routes'));
app.use('/', require('./routes/musico.routes'));
// app.use('/', require('./routes/postagens.routes'));
// app.use('/', require('./routes/categorias.routes'));
// app.use('/', require('./routes/aplicativos.routes'));
// app.use('/', require('./routes/curtidas.routes'));
// app.use('/', require('./routes/comentarios.routes'));
// app.use('/', require('./routes/agradecimentos.routes'));
//app.use('/',require('./routes/token.routes'));
// Adicione outras rotas aqui...

// ✅ Função para escrever logs de erro
function logError(error, req = null) {
    const timestamp = new Date().toISOString();
    const logDir = path.join(__dirname, 'logs');
    const logFile = path.join(logDir, 'errors.log');
    
    // Criar diretório de logs se não existir
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
    
    let logMessage = `\n[${timestamp}] `;
    
    if (req) {
        logMessage += `${req.method} ${req.originalUrl} - `;
    }
    
    logMessage += `${error.message}\n`;
    logMessage += `Stack: ${error.stack}\n`;
    logMessage += '-----------------------------------\n';
    
    // Escrever no arquivo de log
    fs.appendFileSync(logFile, logMessage);
    
    // Também exibir no console
    console.error(`❌ [${timestamp}]`, error.message);
}

// ✅ Middleware de tratamento de erros global
app.use((err, req, res, next) => {
    logError(err, req);
    
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: true,
        message: err.message || 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ✅ Middleware para rotas não encontradas
app.use((req, res) => {
    const error = new Error(`Rota não encontrada: ${req.method} ${req.originalUrl}`);
    logError(error, req);
    res.status(404).json({
        error: true,
        message: 'Rota não encontrada'
    });
});

// ✅ Configuração de porta e ambiente
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';
const isDevelopment = NODE_ENV === 'development';

console.log(`🌍 Ambiente: ${NODE_ENV}`);

if (isDevelopment) {
    // 🔧 Desenvolvimento: servidor HTTP simples
    app.listen(PORT, () => {
        console.log(`🚀 Servidor HTTP rodando em http://localhost:${PORT} (modo desenvolvimento)`);
    });
} else {
    // 🌐 Produção: HTTPS com certificado
    const keyPath = '/etc/letsencrypt/live/desktop.edsonrocha.com.br/privkey.pem';
    const certPath = '/etc/letsencrypt/live/desktop.edsonrocha.com.br/fullchain.pem';

    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
        const SSL_OPTIONS = {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath)
        };

        https.createServer(SSL_OPTIONS, app).listen(PORT, () => {
            console.log(`🔐 Servidor HTTPS rodando em https://desktop.edsonrocha.com.br:${PORT} (modo produção)`);
        });
    } else {
        console.error('❌ Certificados SSL não encontrados. Verifique os caminhos.');
        process.exit(1);
    }
}
