var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash'); // TODO(devnook): Use!
var session = require('express-session')


var app = express();

require('./api/config/passport')(passport); // Pass passport for configuration.

// Authentication and sessions.
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

// Views engine setup.
app.set('views', path.join(__dirname, '../frontend/views'));
// TODO(devnook): Do we need both jade and ejs?
app.set('view engine', 'jade');
app.engine('html', require('ejs').__express);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(require('node-compass')({mode: 'expanded'}));  // TODO(ewag): ??

// URL handlers.
var webRouter = require('./web/router')(passport);
var apiRouter = require('./api/router')(passport);
var authRouter = require('./api/authRouter')(passport);
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/', webRouter);

// Serve app from distribution dir instead of source dir if in prod.
if (app.get('env') === 'development') {
  app.use(express.static(path.join(__dirname, '../frontend/app')));
} else {
  app.use(express.static(path.join(__dirname, '../public')));
}

// Catch 404s and forward to error handler.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler. Prints stacktrace.
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
  });
}

// Production error handler. No stacktraces leaked to user.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

module.exports = app;
