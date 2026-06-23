const path = require('path');
const fs = require('fs');
const multer = require('multer');
console.log('controoler');

// Configuração do multer para armazenamento de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/postagens/');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'post-' + uniqueSuffix + ext);
  }
});

exports.buscar = (req, res) => {
  db.query('SELECT * FROM postagens WHERE eveID = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar Evento' });
    if (!results.length) return res.status(404).json({ erro: 'Evento não encontrado' });
    res.json(results[0]);
  });
};



// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Apenas imagens são aceitas (JPEG, PNG, GIF, WebP).'), false);
  }
};

// Configuração do multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite de 5MB
  }
}).single('image');

exports.upload = (req, res) => {
  console.log('🟡 [CONTROLLER] POST /posImg recebida');
  console.log('🟡 [CONTROLLER] Headers:', req.headers);
  
  // Processa o upload usando multer
  upload(req, res, function (err) {
    console.log('🔴 [CONTROLLER] Multer processou:', req.file ? 'Arquivo recebido' : 'Nenhum arquivo');
    
    if (err instanceof multer.MulterError) {
      console.error('🔴 [CONTROLLER] Erro Multer:', err);
      return res.status(400).json({
        erro: 'Erro no upload',
        message: err.message
      });
    } else if (err) {
      console.error('🔴 [CONTROLLER] Erro:', err);
      return res.status(400).json({
        erro: 'Erro ao processar arquivo',
        message: err.message
      });
    }

    try {
      if (!req.file) {
        console.log('🔴 [CONTROLLER] ERRO: Nenhum arquivo recebido');
        return res.status(400).json({
          erro: 'Nenhuma imagem foi enviada',
          message: 'Por favor, selecione uma imagem para fazer upload'
        });
      }

      console.log('🔴 [CONTROLLER] Arquivo:', { 
        filename: req.file.filename, 
        size: req.file.size,
        mimetype: req.file.mimetype 
      });

      // Retorna o caminho relativo da imagem
      const imagePath = `uploads/postagens/${req.file.filename}`;
      console.log('🔴 [CONTROLLER] Imagem salva em:', imagePath);
      console.log('🔴 [CONTROLLER] Enviando resposta de sucesso');

      res.status(200).json({
        ok: true,
        message: 'Imagem enviada com sucesso',
        path: imagePath,
        filename: req.file.filename,
        url: `/${imagePath}`
      });
    } catch (error) {
      console.error('🔴 [CONTROLLER] ERRO CATCH:', error);
      console.error('🔴 [CONTROLLER] Erro ao fazer upload da imagem:', error);

      // Remove o arquivo se houver erro
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Erro ao remover arquivo:', err);
        });
      }

      res.status(500).json({
        erro: 'Erro ao processar upload da imagem',
        message: error.message
      });
    }
  });
};

