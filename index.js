const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const MAX_FILE_SIZE = 21 * 1024 * 1024; 
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  maxHttpBufferSize: 1e8, 
});


app.use(express.static(__dirname + '/public'));


app.get('/', function(req,res){
  res.sendFile(__dirname + "/public/index.html");
})


io.on("connection", (socket) => {
  socket.on("archivo", (arg) => {
    if (arg && arg.a.length < MAX_FILE_SIZE) {
      enviar(arg.id, arg.n, arg.a);
    } else {
      console.error("Archivo demasiado grande o inválido");
    }
  });
});
function enviar (id,n,a){
  io.emit(id,{
    "nombre":n,
    "archivo":a
  })
}

server.listen(80, () => {
  console.log('Servidor escuchando en http://localhost:80');
});
