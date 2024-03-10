const express = require('express');
const router = express.Router();
const db = require('../scripts/db');
const f = require("../scripts/fecha");

router.post('/actualizar-usuario', function(req, res) {
    if (!req.body.key || req.body.key !== process.env.KEY || !req.body.id) {
      res.json({
        "error": "No estás autorizado o no has introducido una ID"
    })
    } else {
      db.actualizar(req.body.id, req.body.NuevaFecha, (error, resultado) => {
        if (error) {
            console.error('error', error);
            res.json({
                'error': 'El usuario ya existe'
            })
          } else {
            res.json({'exito':'El usuario ha sido renovado satisfactoriamente.'})
          }
        })
    }
  })

  module.exports = router;