const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  maxHttpBufferSize: 1e8, 
});


app.use(express.static(__dirname + '/public'));


io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');

  
  socket.on('archivo', (mensaje) => {
    console.log("mensaje recibido.")
    console.log(mensaje.id)
    socket.emit(mensaje.id,{
      "nombre":mensaje.n,
      "archivo":mensaje.a
    })

    
    io.emit('mensajeDesdeServidor', 'Mensaje recibido por parte del cliente.');
  });

  
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});


server.listen(80, () => {
  console.log('Servidor escuchando en http://localhost:80');
});
