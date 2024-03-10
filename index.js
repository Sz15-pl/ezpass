const express = require('express');
const app = express()
const db = require('./scripts/db')
const f = require("./scripts/fecha")
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const actualizarUsuarioRoute = require('./routes/actualizarUsuarios');
const eliminarUsuariosRoute = require('./routes/eliminarUsuarios');
const añadirUsuarioRoute = require('./routes/añadirUsuario');
const consultarUsuariosRoute = require('./routes/consultarUsuarios');
const consultaGeneralRoute = require('./routes/consultaGeneral');

app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

app.use('/usuarios', añadirUsuarioRoute);
app.use('/usuarios', eliminarUsuariosRoute );
app.use('/usuarios', actualizarUsuarioRoute);
app.use('/usuarios', consultarUsuariosRoute);
app.use('/usuarios', consultaGeneralRoute);


app.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
})
app.get('/a-usuario', function(req, res) {
    res.sendFile(__dirname + "/public/añadir-usuario.html")
})

app.get('/eliminar-usuario', function(req, res) {
    res.sendFile(__dirname + "/public/eliminar-usuario.html")
})
app.get('/consulta-general', function(req, res) {
  res.sendFile(__dirname + "/public/consultageneral.html")
})

app.get('/actualizar-usuario', function(req, res) {
  res.sendFile(__dirname + "/public/renovar-usuario.html")
})
app.get('/consultar-usuario', function(req, res) {
    res.sendFile(__dirname + "/public/consultar-usuario.html")
})




app.listen(3000, () => console.log("Servidor Iniciado"))