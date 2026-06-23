const express = require('express');
const router = express.Router();
const aplicativos = require('../controllers/aplicativos.controller');

// CRUD protegido
router.get('/aplicativos',  categorias.listar);
router.get('/aplicativos/:id' , categorias.buscar);
router.post('/aplicativos', aplicativos.criar); // você pode proteger se quiser
router.put('/aplicativos/:id', aplicativos.atualizar);
router.delete('/aplicativos/:id', aplicativos.deletar);
module.exports = router;
