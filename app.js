var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sesion = require('express-session');

var index = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');

var db1 = require('./public/javascripts/db.js');
var db2 = require('./public/javascripts/db.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'Consultor.ico')));
app.use(logger('dev'));

app.use(cookieParser());//necesario para utilizar sesiones
app.use(
  sesion(
    { resave: true,
      saveUninitialized: false,
      secret: 'vikings',
      cookie: { maxAge: 2628000000 , secure: true},
      maxAge: new Date(Date.now() + 24*60*60)
    }
  )
);

db1.conectar('localhost', 'root', 'portgas', 'consultor');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.session({secret:'abcd1234'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', admin);
app.use('/', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sesion.cookie.secure = true // serve secure cookies
}*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

