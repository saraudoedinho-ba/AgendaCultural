const express = require('express');
const router = express.Router();
const musico = require('../controllers/musico.controller');

// Rota de cadastro
router.post('/musicos', musico.cadastrar);

// Rotas de consulta
router.get('/musicos/buscar', musico.buscarComFiltros); // DEVE vir antes de /musicos/:id
router.get('/musicos', musico.listar);
router.get('/musicos/:id', musico.buscar);
router.get('/musicos/email/:email', musico.buscarEmail);

// Rotas de atualização e exclusão
router.put('/musicos/:id', musico.atualizar);
router.delete('/musicos/:id', musico.deletar);

module.exports = router;
