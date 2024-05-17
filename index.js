var express = require('express');
var http = require('http');
const rateLimit = require('express-rate-limit')
const { RateLimiterMemory } = require('rate-limiter-flexible');


const Socketlimiter = new RateLimiterMemory({
  points: 5, 
  duration: 60, 
});
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
require('dotenv').config()


const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, 
  message: "Has excedido el límite de peticiones. Por favor, inténtalo de nuevo más tarde."
});





app.set('view engine', 'pug');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'));
app.use('/views', express.static('views'));


app.use('/login', limiter);
app.use('/register', limiter);
app.use('/', loginRuta );
app.use('/', registerRuta);
app.use('/', authenticatedRuta);




app.get('/', function(req,res){
  res.sendFile(__dirname + "/public/index.html")
})

app.get('*', function(req,res){
  res.sendFile(__dirname + "/public/index.html")
})



io.on('connection', (socket) => {

  const handleConnection = () => {
  
    socket.on('archivo', handleArchivo(socket));
  };

  handleConnection(); 
});

const handleArchivo = (socket) => {
  return async (data) => {
    try {
      
      await Socketlimiter.consume(socket.handshake.address);
      
      if (!data || !data.a || data.a.size >= MAX_FILE_SIZE || !data.token) {
        throw new Error('Archivo demasiado grande o inválido');
      }
      
      const { id, n, a } = data;
      enviar(socket, id, n, a);
    } catch (error) {
      console.error(error);
      
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
