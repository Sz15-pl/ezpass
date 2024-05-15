var sqlite3 = require('sqlite3').verbose();
var express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

var db = new sqlite3.Database('./database/usuarios.db');
require('dotenv').config()


router.post('/login', function(req, res) {
    const loginData = req.body;

    if (!loginData || !loginData.usuario || !loginData.contraseña) {
        return res.status(400).json({ error: 'Se requieren todos los campos: usuario, contraseña' });
    }

    db.get('SELECT * FROM user WHERE usuario = ?', [loginData.usuario], function(err, row) {
        if (err) {
            console.error('Error al buscar el usuario:', err.message);
            return res.status(500).json({ error: 'Error interno al buscar el usuario' });
        }

        if (!row) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        bcrypt.compare(loginData.contraseña, row.contraseña, function(err, result) {
            if (err) {
                console.error('Error al comparar contraseñas:', err.message);
                return res.status(500).json({ error: 'Error interno al comparar contraseñas' });
            }

            if (result) {
                console.log('Inicio de sesión exitoso para el usuario:', row.usuario);
                // Generar un token JWT
                const token = jwt.sign({ usuario: row.usuario }, process.env.JWT_TOKEN, { expiresIn: '1h' });
                // Devolver el token JWT en la respuesta
                return res.status(200).json({ token: token });
            } else {
                console.log('Contraseña incorrecta para el usuario:', row.usuario);
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        });
    });
});
module.exports = router;