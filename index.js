'use strict';

var config      = require('./config/config.js'),
    mongoose    = require('mongoose'),
    chalk       = require('chalk');

// Bootstrap db connection
var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
    if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(chalk.red(err));
    }
});

mongoose.connection.on('error', function(err) {
        console.error(chalk.red('MongoDB connection error: ' + err));
        process.exit(-1);
    }
);

// Init the express application
var app     = require('./config/express.js')();

// Init server
var server  = require('http').Server(app);
server.listen(config.port);

// Logging initialization
console.log('--');
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log(chalk.green('Database:\t\t\t' + config.db.uri));