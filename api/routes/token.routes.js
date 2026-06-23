const express = require('express');
const router = express.Router();
const eventos = require('../controllers/token.controller');

// CRUD protegido
router.get('/token/:eveToken',token.buscarTtoken);
module.exports = router;
