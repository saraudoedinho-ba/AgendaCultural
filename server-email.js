const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Configurar o transportador de email
// Use GMAIL ou outro SMTP que você já tem configurado
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'SEU_EMAIL_AQUI@gmail.com',  // ⚠️ TROCAR pelo seu email
    pass: 'SUA_SENHA_APP_AQUI'          // ⚠️ TROCAR pela senha de app do Gmail
  }
});

// Endpoint para enviar notificação de cadastro
app.post('/server-email', async (req, res) => {
  try {
    const { nomeArtistico, email, telefone, cidade, estado } = req.body;

    // Validação básica
    if (!nomeArtistico || !email) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: nomeArtistico e email' 
      });
    }

    // Configurar o email
    const mailOptions = {
      from: '"Agenda Cultural" <SEU_EMAIL_AQUI@gmail.com>',
      to: 'ba.edison@gmail.com',
      subject: '🎵 Novo cadastro de artista - Agenda Cultural',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #ff6b35; padding-bottom: 10px;">
            🎵 Novo Cadastro Recebido
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nome Artístico:</strong> ${nomeArtistico}</p>
            <p style="margin: 10px 0;"><strong>E-mail:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>
            <p style="margin: 10px 0;"><strong>Cidade:</strong> ${cidade || 'Não informado'}</p>
            <p style="margin: 10px 0;"><strong>Estado:</strong> ${estado || 'Não informado'}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p style="color: #666; font-size: 12px;">
            Este email foi enviado automaticamente pela plataforma Agenda Cultural.
          </p>
        </div>
      `
    };

    // Enviar o email
    await transporter.sendMail(mailOptions);

    console.log(`✅ Email enviado com sucesso para ba.edison@gmail.com - Artista: ${nomeArtistico}`);

    res.json({ 
      success: true, 
      message: 'Email enviado com sucesso!' 
    });

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    res.status(500).json({ 
      error: 'Falha ao enviar email',
      details: error.message 
    });
  }
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'server-email', timestamp: new Date() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de email rodando na porta ${PORT}`);
  console.log(`📧 Endpoint: http://localhost:${PORT}/server-email`);
});
