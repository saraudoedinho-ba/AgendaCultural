const express = require('express');
const router = express.Router();
const postagens = require('../controllers/postagens.controller');

// CRUD protegido
router.get('/postagens',  postagens.listar);
router.get('/postagens/:id' , postagens.buscar);
router.post('/postagens', postagens.criar); // você pode proteger se quiser
router.put('/postagens/:id', postagens.atualizar);
router.delete('/postagens/:id', postagens.deletar);
module.exports = router;
