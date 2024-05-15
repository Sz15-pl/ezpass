var sqlite3 = require('sqlite3').verbose();
var express = require('express');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

var db = new sqlite3.Database('./database/usuarios.db');

const router = express.Router();

require('dotenv').config()

router.post('/register', function(req, res) {
    const userData = req.body;
    let ID = uuidv4();

    if (!userData || !userData.usuario || !userData.contraseña) {
        return res.status(400).json({ error: 'Se requieren todos los campos: usuario, contraseña' });
    }
  
    db.get('SELECT usuario FROM user WHERE usuario = ?', [userData.usuario], function(err, row) {
        if (err) {
            console.error('Error al buscar el usuario:', err.message);
            return res.status(500).json({ error: 'Error interno al buscar el usuario' });
        }
  
        if (row) {
            
            return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
        }
  
    
        bcrypt.hash(userData.contraseña, 10, function(err, hash) {
            if (err) {
                console.error('Error al hashear la contraseña:', err.message);
                return res.status(500).send('Error interno al hashear la contraseña');
            }
            
            const fechaCreacion = new Date().toISOString(); 
  
            db.run('INSERT INTO user (id, usuario, contraseña, fechaCreacion, infoFiles) VALUES (?, ?, ?, ?, ?)', 
                   [ID, userData.usuario, hash, fechaCreacion, 0], 
                   function(err) {
                        if (err) {
                            console.error('Error al agregar el usuario:', err.message);
                            return res.status(500).send('Error interno al agregar el usuario');
                        }
                        console.log('Nuevo usuario agregado:', userData);
                        res.status(200).json({ message: 'Nuevo usuario agregado a la base de datos' });
                    });
        });
    });
  });
  module.exports = router;