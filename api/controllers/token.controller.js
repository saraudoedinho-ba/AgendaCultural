const db = require('../db');
const bcrypt = require('bcryptjs');


exports.buscarToken = (req, res) => {
  db.query('SELECT * FROM eventos WHERE eveToken = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar Token' });
    if (!results.length) return res.status(404).json({ erro: 'Token não encontrado' });
    res.json(results[0]);
  });
};


