'use strict';

var bodyParser = require('body-parser'),
    express = require('express'),
    config = require('./config.js'),
    app = express(),
    path = require('path'),
    methodOverride = require('method-override');

module.exports = function () {

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Globbing model files
    config.getGlobbedFiles('./api/models/**/*.js').forEach(function (modelPath) {
        require(path.resolve(modelPath));
    });

    // Globbing route files
    config.getGlobbedFiles('./api/routes/**/*.js').forEach(function (modelPath) {
        require(path.resolve(modelPath))(app);
    });

    // Return Express server instance
    return app;
};