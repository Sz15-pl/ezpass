const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const rateLimit = require('express-rate-limit')
const MAX_FILE_SIZE =  30 * 1024 * 1024; 
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  maxHttpBufferSize: 1e8, 
});




const limiter = rateLimit({
	windowMs: 0.1 * 60 * 1000, // 15 minutes
	limit: 20,
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
	
})


app.use(limiter)

app.use('/public', express.static('public'));


app.get('/', function(req,res){
  res.sendFile(__dirname + "/public/index.html");
})


io.on('connection', (socket) => {
  socket.on('archivo', handleArchivo(socket));
});

const handleArchivo = (socket) => {
  return async (data) => {
    try {
      if (!data || !data.a || data.a.size >= MAX_FILE_SIZE) {
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


server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});




