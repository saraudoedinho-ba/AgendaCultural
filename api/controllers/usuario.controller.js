const db = require('../db');
const bcrypt = require('bcryptjs');

// Endpoint de login
exports.login = (req, res) => {
  console.log('Login chamado');
  
  const usuEmail = req.body.usuEmail || req.body.UsuEmail;
  const usuSenha = req.body.usuSenha || req.body.UsuSenha;
  
  if (!usuEmail || !usuSenha) {
    return res.status(400).json({
      mensagem: 'Email e senha obrigatórios'
    });
  }
  
  // CORREÇÃO AQUI: usar 'usuEmail' em vez de 'musEmail'
  db.query('SELECT * FROM musicos WHERE musEmail = ?', [usuEmail], async (err, results) => {
    if (err) {
      console.error('Erro no banco:', err);
      return res.status(500).json({ erro: 'Erro interno no servidor' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }
    
    const usuario = results[0];
    
    try {
      // CORREÇÃO: comparar com a senha do banco (musSenha)
      const usuSenhaValida = await bcrypt.compare(usuSenha, usuario.musSenha);
      
      if (!usuSenhaValida) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }
      
      console.log('✅ Login bem-sucedido');
      res.json({
        usuario: {
          id: usuario.id,
          musNomeArtistico: usuario.musNomeArtistico,  // CORREÇÃO: campo correto
          musEmail: usuario.musEmail                   // CORREÇÃO: campo correto
        }
      });
    } catch (bcryptError) {
      console.error('Erro ao validar senha:', bcryptError);
      return res.status(500).json({ erro: 'Erro ao validar senha' });
    }
  });
};
