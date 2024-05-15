var sqlite3 = require('sqlite3').verbose();
var express = require('express');


const jwt = require('jsonwebtoken');

const router = express.Router();

require('dotenv').config()

router.post('/authenticated', function(req, res) {
    if (req.body.token) {
      jwt.verify(req.body.token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) {
          console.error('Error al verificar el token:', err.message);
          return res.status(403).json({ error: 'Token inválido' });
        }
        res.render('index', {"token" : req.body.token});
      });
    } else {
      return res.status(400).json({ error: 'Token no proporcionado' });
    }
  });
  
  module.exports = router;