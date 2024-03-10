const express = require('express');
const router = express.Router();
const db = require('../scripts/db');
const f = require("../scripts/fecha");

router.post('/consulta-general', (req, res) => {
    const key = req.body.key;

    if (!key || key !== process.env.KEY) {
        res.json({ 'error': 'No estás autorizado para acceder a este recurso' });
    } else {
        db.consultaGeneral((error, resultado) => {
            if (error) {
                res.json({ 'error': error });
            } else {
                if (Object.keys(resultado).length === 0) {
                    res.json({ 'error': 'No existe un registro en la base de datos' });
                } else {
                    res.json({ 'exito': resultado });
                }
            }
        });
    }
});
module.exports = router;