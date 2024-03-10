const express = require('express');
const router = express.Router();
const db = require('../scripts/db');
const f = require("../scripts/fecha");

router.post('/consultar-usuario', (req, res) => {
    const key = req.body.key;
    const id = req.body.id;

    if (!key || key !== process.env.KEY || !id) {
        res.json({ 'error': 'No estás autorizado o no has introducido una ID' });
    } else {
        db.consultar(id, (error, resultado) => {
            if (error) {
                res.json({ 'error': error });
            } else {
                if (Object.keys(resultado).length === 0) {
                    res.json({ 'error': 'El usuario consultado no existe en la base de datos.' });
                } else {
                    res.json({ 'exito': resultado });
                }
            }
        });
    }
});
module.exports = router;