var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
const jwt = require('jsonwebtoken');
const socketio = require('socket.io');

const rateLimit = require('express-rate-limit')
const pug = require('pug')

const authenticatedRuta = require('./routes/authenticated')
const loginRuta = require('./routes/login')
const registerRuta = require('./routes/register')


var app = express();
var server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

const MAX_FILE_SIZE =  30 * 1024 * 1024; 
var db = new sqlite3.Database('./database/usuarios.db');
require('dotenv').config()


const limiter = rateLimit({
	windowMs: 0.1 * 60 * 1000, 
	limit: 20,
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
	


})




app.set('view engine', 'pug');
app.use(limiter);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'));
app.use('/views', express.static('views'));



app.use('/', loginRuta );
app.use('/', registerRuta);
app.use('/', authenticatedRuta);




app.get('/', function(req,res){
  res.sendFile(__dirname + "/public/index.html")
})




io.on('connection', (socket) => {
  socket.on('archivo', handleArchivo(socket));
});

const handleArchivo = (socket) => {
  return async (data) => {
    try {
      if (!data || !data.a || data.a.size >= MAX_FILE_SIZE || !data.token) {
        throw new Error('Archivo demasiado grande o inválido');
      }
      
      const { id, n, a } = data;
      enviar(socket, id, n, a);
    } catch (error) {
      console.error(error.message);
      socket.emit('error', { message: error.message });
    }
  };
};

const enviar = (socket, id, nombre, archivo) => {
  io.emit(id, {
    nombre,
    archivo,
  });
};

const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
