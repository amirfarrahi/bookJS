var mongoose = require('mongoose'),
    config = require('../config/config')();

var mongourl=process.env.MONGOLAB_URI || 'mongodb://' + config.mongo.username + ':' + config.mongo.password + '@' + config.mongo.hostname + ':' + config.mongo.port + '/' + config.mongo.db;

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + mongourl);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

mongoose.connection.once('open', function() {
  console.log('MongoDB connection opened');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
  console.log('Mongoose default connection disconnected through app termination');
  process.exit(0);
  });
});

if (mongoose.connection.readyState === 0) {
  mongoose.connect(mongourl);
}

