'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Post Schema
 */
var PostSchema = new Schema({
    content: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        trim: true
    }
});

mongoose.model('Post', PostSchema);