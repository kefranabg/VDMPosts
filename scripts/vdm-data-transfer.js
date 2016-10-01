'use strict';

var scanner = require('./../vdm-data/vdm-scanner.js'),
    _ = require('lodash'),
    q = require('q'),
    config = require('../config/config.js'),
    chalk  = require('chalk'),
    request = require('request');

console.log('Scanning VDM website ...');

/**
 * Get VDM posts
 */
scanner.getVDMPosts().then(function (posts) {
    console.log(chalk.green('Data retrieved.'));

    request.post(
        'http://localhost:' + config.port + '/api/posts',
        {form: {data: JSON.stringify(posts)}},
        function (error, response) {
            if (!error && response.statusCode == 200) {
                console.log(chalk.green('Data inserted to Database.'));
            } else {
                console.log(chalk.red('Data insertion failed. Make sure that the REST api is available.'));
            }
        }
    );
});

