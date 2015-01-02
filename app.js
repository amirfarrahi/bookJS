var express=require('express');
var config= require('./config/config')();
var mongo = require('./db/mongo-store');
var http = require('http');
var path = require('path');
var app = express(); 
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');



app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.set('view engine', 'ejs');
require('./config/passport')(passport);
require('./config/routes')(app,passport); // pass passport for configuration
app.use(express.static(path.join(__dirname + '/public')));
app.use('/verify',express.static(path.join(__dirname + '/public')));
app.use('/reset',express.static(path.join(__dirname + '/public')));

port = Number(process.env.PORT || config.port);
http.createServer(app).listen(port , function(){
  console.log('Express server listening on port ' + port );
});
