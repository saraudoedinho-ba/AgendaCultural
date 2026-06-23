const db = require('../db');
const bcrypt = require('bcryptjs');

// Cadastrar novo músico
exports.cadastrar = async (req, res) => {
  console.log('Cadastrando músico');
  console.log('Dados recebidos:', JSON.stringify(req.body, null, 2));
  
  const { 
    musNomeArtistico,
    musEmail,
    musSenha,
    musTelefone,
    musEstado,
    musCidade,
    musBairro,
    musGeneros,
    musValorHora,
    musValorDoSom,
    musContato,
    musDescricao,
    musDescricaoBreve,
    musRedesSociais,
    musTipoServico,
    musSiteArtista,
    musFacebook,
    musInstagram,
    musTiktok,
    musDriveGoogle,
    musVideo01Youtube,
    musVideo02Youtube,
    musVideo03Youtube,
    musVideo04Youtube,
    musLocalizacao,
    musEspecialidade
  } = req.body;
  
  // Validações
  if (!musNomeArtistico || !musEmail) {
    return res.status(400).json({ 
      erro: 'Nome artístico e email são obrigatórios'
    });
  }

  try {
    // Verificar se email já existe
    console.log('Verificando se email já existe:', musEmail);
    const [usuarios] = await db.promise().query(
      'SELECT id FROM musicos WHERE musEmail = ?', 
      [musEmail]
    );
    
    if (usuarios.length > 0) {
      console.log('Email já cadastrado');
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    // Hash da senha (se fornecida, senão gera uma temporária)
    const senhaParaHash = musSenha || `temp_${Date.now()}`;
    const musSenhaHash = await bcrypt.hash(senhaParaHash, 10);
    console.log('Senha criptografada com sucesso');

    // Preparar valores para inserção
    const valores = [
      musNomeArtistico,
      musEmail,
      musSenhaHash,
      musTelefone || null,
      musEstado || null,
      musCidade || null,
      musBairro || null,
      musGeneros || null,
      musValorHora || null,
      musValorDoSom || null,
      musContato || null,
      musDescricao || null,
      musDescricaoBreve || null,
      musRedesSociais || null,
      musTipoServico || null,
      musSiteArtista || null,
      musFacebook || null,
      musInstagram || null,
      musTiktok || null,
      musDriveGoogle || null,
      musVideo01Youtube || null,
      musVideo02Youtube || null,
      musVideo03Youtube || null,
      musVideo04Youtube || null,
      musLocalizacao || null,
      musEspecialidade || null
    ];

    console.log('Executando INSERT no banco de dados...');
    console.log('Valores a inserir:', valores);

    // Inserir músico com todos os campos
    const [result] = await db.promise().query(
      `INSERT INTO musicos (
        musNomeArtistico, 
        musEmail, 
        musSenha, 
        musTelefone,
        musEstado,
        musCidade,
        musBairro,
        musGeneros,
        musValorHora,
        musValorDoSom,
        musContato,
        musDescricao,
        musDescricaoBreve,
        musRedesSociais,
        musTipoServico,
        musSiteArtista,
        musFacebook,
        musInstagram,
        musTiktok,
        musDriveGoogle,
        musVideo01Youtube,
        musVideo02Youtube,
        musVideo03Youtube,
        musVideo04Youtube,
        musLocalizacao,
        musEspecialidade
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      valores
    );

    console.log('✅ Resultado do INSERT:', result);
    console.log('✅ ID inserido:', result.insertId);
    console.log('✅ Linhas afetadas:', result.affectedRows);

    if (result.affectedRows === 0) {
      console.error('❌ Nenhuma linha foi inserida!');
      return res.status(500).json({ erro: 'Falha ao inserir registro no banco de dados' });
    }
    
    res.status(201).json({ 
      mensagem: 'Músico cadastrado com sucesso',
      id: result.insertId,
      musNomeArtistico: musNomeArtistico,
      musEmail: musEmail
    });
    
  } catch (error) {
    console.error('❌ Erro ao cadastrar músico:', error);
    console.error('Detalhes do erro:', {
      message: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
      sql: error.sql
    });
    res.status(500).json({ 
      erro: 'Erro ao cadastrar músico',
      detalhes: error.message 
    });
  }
};

// Listar todos os músicos
exports.listar = async (req, res) => {
  try {
    const [results] = await db.promise().query(
      'SELECT * FROM musicos'
    );
    res.json(results);
  } catch (error) {
    console.error('Erro ao listar músicos:', error);
    res.status(500).json({ erro: 'Erro ao buscar músicos' });
  }
};

// Buscar músicos com filtros
exports.buscarComFiltros = async (req, res) => {
  try {
    const { tipoServico, localizacao, precoMin, precoMax } = req.query;
    
    let query = 'SELECT * FROM musicos WHERE 1=1';
    const params = [];
    
    if (tipoServico) {
      query += ' AND (musTipoServico LIKE ? OR musGeneros LIKE ?)';
      params.push(`%${tipoServico}%`, `%${tipoServico}%`);
    }
    
    if (localizacao) {
      query += ' AND (musLocalizacao LIKE ? OR musCidade LIKE ? OR musEstado LIKE ?)';
      params.push(`%${localizacao}%`, `%${localizacao}%`, `%${localizacao}%`);
    }
    
    if (precoMin) {
      query += ' AND musValorHora >= ?';
      params.push(parseFloat(precoMin));
    }
    
    if (precoMax) {
      query += ' AND musValorHora <= ?';
      params.push(parseFloat(precoMax));
    }
    
    console.log('Query de busca:', query);
    console.log('Parâmetros:', params);
    
    const [results] = await db.promise().query(query, params);
    res.json(results);
  } catch (error) {
    console.error('Erro ao buscar músicos com filtros:', error);
    res.status(500).json({ erro: 'Erro ao buscar músicos' });
  }
};

// Buscar músico por ID
exports.buscar = async (req, res) => {
  try {
    const [results] = await db.promise().query(
      'SELECT * FROM musicos WHERE id = ?',
      [req.params.id]
    );
    
    if (results.length === 0) {
      return res.status(404).json({ erro: 'Músico não encontrado' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Erro ao buscar músico:', error);
    res.status(500).json({ erro: 'Erro ao buscar músico' });
  }
};

// Atualizar músico
exports.atualizar = async (req, res) => {
  const { 
    musNomeArtistico,
    musTelefone,
    musTipoServico,
    musLocalizacao,
    musEstado,
    musCidade,
    musBairro,
    musGeneros,
    musValorHora,
    musValorDoSom,
    musContato,
    musDescricao,
    musDescricaoBreve,
    musRedesSociais,
    musSiteArtista,
    musFacebook,
    musInstagram,
    musTiktok,
    musDriveGoogle,
    musVideo01Youtube,
    musVideo02Youtube,
    musVideo03Youtube,
    musVideo04Youtube,
    musEspecialidade
  } = req.body;
  
  try {
    const [result] = await db.promise().query(
      `UPDATE musicos SET 
        musNomeArtistico = ?, 
        musTelefone = ?,
        musTipoServico = ?,
        musLocalizacao = ?,
        musEstado = ?, 
        musCidade = ?, 
        musBairro = ?,
        musGeneros = ?, 
        musValorHora = ?,
        musValorDoSom = ?,
        musContato = ?, 
        musDescricao = ?,
        musDescricaoBreve = ?,
        musRedesSociais = ?,
        musSiteArtista = ?,
        musFacebook = ?,
        musInstagram = ?,
        musTiktok = ?,
        musDriveGoogle = ?,
        musVideo01Youtube = ?,
        musVideo02Youtube = ?,
        musVideo03Youtube = ?,
        musVideo04Youtube = ?,
        musEspecialidade = ?
      WHERE id = ?`,
      [
        musNomeArtistico, 
        musTelefone, 
        musTipoServico,
        musLocalizacao,
        musEstado, 
        musCidade, 
        musBairro,
        musGeneros, 
        musValorHora,
        musValorDoSom,
        musContato, 
        musDescricao, 
        musDescricaoBreve,
        musRedesSociais,
        musSiteArtista,
        musFacebook,
        musInstagram,
        musTiktok,
        musDriveGoogle,
        musVideo01Youtube,
        musVideo02Youtube,
        musVideo03Youtube,
        musVideo04Youtube,
        musEspecialidade,
        req.params.id
      ]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Músico não encontrado' });
    }
    
    res.json({ mensagem: 'Músico atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar músico:', error);
    res.status(500).json({ erro: 'Erro ao atualizar músico' });
  console.log(result);
  }
};

// Deletar músico
exports.deletar = async (req, res) => {
  try {
    const [result] = await db.promise().query(
      'DELETE FROM musicos WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Músico não encontrado' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar músico:', error);
    res.status(500).json({ erro: 'Erro ao deletar músico' });
  }
};

// Buscar músico por ID
exports.buscarEmail = async (req, res) => {
  try {
    const [results] = await db.promise().query(
      'SELECT * FROM musicos WHERE musEmail = ?',
      [req.params.email]
    );
    
    if (results.length === 0) {
      return res.status(404).json({ erro: 'Músico não encontrado por email' });
    }
    
    res.json(results[0]);
  } catch (error) {
    console.error('Erro ao buscar músico:', error);
    res.status(500).json({ erro: 'Erro ao buscar músico' });
  }
};

