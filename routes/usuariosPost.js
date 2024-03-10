const express = require('express');
const router = express.Router();
const db = require('../scripts/db');
const f = require("../scripts/fecha");


router.post('/a-usuario', (req, res) => {
    var nombre = req.body.nombre
    var apellidos = req.body.apellidos
    var dni = req.body.id
    var foto = req.body.foto
    var fechaValidez = req.body.fechaValidez
    console.log(nombre,apellidos,dni,fechaValidez,foto)
    if (process.env.KEY !== req.query.key) {
        if (nombre && apellidos && dni && foto && fechaValidez) {
            if (f.validarFormatoFecha(fechaValidez) == true) {
                try {
                    db.añadir(dni, nombre, apellidos, foto, fechaValidez, (error, resultado) => {
                        if (error) {
                            console.error('error', error);
                            res.json({
                                'error': 'El usuario ya existe'
                            })
                        } else {
                            console.log('Usuario añadido correctamente:', resultado);
                            res.json({
                                'exito': {
                                    "identificacion": dni,
                                    "nombre": nombre,
                                    "apellidos": apellidos,
                                    "foto": foto,
                                    "fechaSubscripcion": fechaValidez
                                }
                            })
                        }
                    });
                } catch (error) {
                    res.json({
                        "error": error
                    })
                }
            } else {
                res.json({
                    "error": "la fecha introducida no sigue el formato correcto: dd/mm/aa"
                })
            }
        } else {
            res.json({
                "error": "faltan alguno de los datos a introducir para crear la ficha del usuario"
            })
        }
    } else {
        res.json({
            'error': 'no estás autorizado.'
        })
    }


})


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