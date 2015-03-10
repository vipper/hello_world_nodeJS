var express = require('express');
var load = require('express-load');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.use(cookieParser('nTalk'));
app.use(session({secret: '<mysecret>', 
                 saveUninitialized: true,
                 resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
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


app.listen(3000, function() {
    console.log("Ntalk no ar");
});