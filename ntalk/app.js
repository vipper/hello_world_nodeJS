var express = require('express'),
    load = require('express-load'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    app = express(),
    error = require('./middleware/error'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
const KEY = 'ntalk.sid', SECRET = 'ntalk';
var cookie = cookieParser(SECRET),
    store = new session.MemoryStore(),
    sessOpts = {
      secret: SECRET, 
      key: KEY, 
      store: store, 
      saveUninitialized: true, 
      resave: true
    },
    session = session(sessOpts);

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.use(cookie);
app.use(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(express.static(__dirname+'/public'));

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

app.use(error.notFound);
app.use(error.serverError);

load('sockets')
    .into(io);

server.listen(3000, function() {
    console.log("Ntalk no ar");
}); 