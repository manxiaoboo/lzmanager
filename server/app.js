/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
// import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';
var cors = require('cors')
require('events').EventEmitter.prototype._maxListeners = 100;

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }
// if (config.seedDB) { require('./sqldb/sqlseed'); }

// Setup server
var app = express();
app.use(cors());
var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  console.log('ip:port', config.ip, config.port);
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

// sqldb.sequelize.sync()
//   .then(startServer)
//   .catch(function(err) {
//     console.log('Server failed to start due to error: %s', err);
//   });


startServer();

// Expose app
exports = module.exports = app;
