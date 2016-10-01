'use strict';

var config = require('../config/config.js'),
    chalk  = require('chalk'),
    request = require('request');

/**
 * Remove VDM posts
 */
request.delete(
    'http://localhost:' + config.port + '/api/posts',
    function (error, response) {
        if (!error && response.statusCode == 200) {
            console.log(chalk.green('All posts were correctly removed from the database.'));
        } else {
            console.log(chalk.red('Error on posts removal. Make sure that the REST api is available.'));
        }
    }
);