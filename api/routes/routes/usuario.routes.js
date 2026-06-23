const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuario.controller');

// Rota pública
router.post('/login', usuario.login);

// CRUD protegido
router.get('/usuarios',  usuario.listar);
router.get('/usuarios/:id' , usuario.buscar);
router.post('/usuarios', usuario.criar); // você pode proteger se quiser
router.put('/usuarios/:id', usuario.atualizar);
router.delete('/usuarios/:id', usuario.deletar);
module.exports = router;
