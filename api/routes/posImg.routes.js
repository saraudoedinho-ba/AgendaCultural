const express = require('express');
const router = express.Router();
const posimg = require('../controllers/posimg.controller');


// Rota de upload de imagem
router.post('/posImg', posimg.upload);
router.get('/posimg', posimg.buscar);

console.log('🟢 Rota POST /posImg registrada!');

module.exports = router;
