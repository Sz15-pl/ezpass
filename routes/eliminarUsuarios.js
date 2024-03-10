const express = require('express');
const router = express.Router();
const db = require('../scripts/db');
const f = require("../scripts/fecha");

router.post('/eliminar-usuario', (req, res) => {
    if (!req.body.key || req.body.key !== process.env.KEY || !req.body.id) {
        res.json({
            "error": "No estás autorizado o no has introducido una ID"
        })
    } else {
        db.eliminar(req.body.id, (error, resultado) => {
            if (error) {
                res.json({
                    "error": error
                })
            } else {
                res.json({
                    'exito': 'Usuario eliminado'
                });
            }
        });
    }
});
module.exports = router;
