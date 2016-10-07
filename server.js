var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var ejs           = require('ejs');
var passport      = require('passport');
var flash         = require('connect-flash');
var session       = require('express-session');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var config = require('./config/database');
require('./config/passport')(passport);
var app = express();
// Retrieve
// var MongoClient = require('mongodb').MongoClient;

app.set('port', 8080);
// Connect to the db
// MongoClient.connect(config.hostName + config.database , function(err, db) {
//   if(err) { return console.dir(err); }
//   console.log('Mongo Db connected');
  // app.listen(app.get('port'), function(){
  //   console.log('App Started listening on port ', app.get('port'));
  // });
// });

mongoose.connect(config.hostName + config.database);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// required for passport
app.use(session({ secret: 'ilovewhisky' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.listen(app.get('port'), function(){
  console.log('App Started listening on port ', app.get('port'));
});

module.exports = app;
