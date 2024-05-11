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


io.on("connection", (socket) => {
  socket.on("archivo", (arg) => {
    if (arg && arg.a.length < MAX_FILE_SIZE) {
      enviar(arg);
    } else {
      console.error("Archivo demasiado grande o inválido");
    }
  });
});

const enviar = (datos) => {
  if (datos && datos.id && datos.n && datos.a) {
    io.emit(datos.id, {
      nombre: datos.n,
      archivo: datos.a
    });
  }
};


server.listen(80, () => {
  console.log('Servidor escuchando en http://localhost:80');
});




