#!/usr/bin/env node
var debug = require('debug')('my-application');
var app = require('./backend/app');

var mongoose   = require('mongoose');

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/node_app';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect('mongodb://' + connection_string);


app.set('port', process.env.OPENSHIFT_NODEJS_PORT || '3000');
app.set('ip_address', process.env.OPENSHIFT_NODEJS_IP   || '127.0.0.1');
app.set('env', 'development');

var server = app.listen(app.get('port'), app.get('ip_address'), function() {
  debug('Express server listening on port ' + server.address().port);
});

