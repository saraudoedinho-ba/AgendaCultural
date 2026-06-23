const express = require('express');
const router = express.Router();
const categorias = require('../controllers/categorias.controller');
const aplicativos = require('../controllers/aplicativos.controller');

// CRUD protegido
router.get('/categorias',  categorias.listar);
router.get('/categorias/:id' , categorias.buscar);
router.get('/aplicativos',  aplicativos.listar);
router.get('/categorias/:id' , aplicativos.buscar);
/*router.post('/eventos', eventos.criar); // você pode proteger se quiser
router.put('/eventos/:id', eventos.atualizar);
router.delete('/eventos/:id', eventos.deletar);*/
module.exports = router;
