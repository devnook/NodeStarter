#!/usr/bin/env node
var debug = require('debug')('my-application');
var app = require('./backend/app');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/node_app'); // connect to our database

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
