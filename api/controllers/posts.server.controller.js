'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    q = require('q'),
    Post = mongoose.model('Post');

/**
 * Create a Post
 */
exports.create = function(req, res) {
    var post = new Post(req.body);

    post.save(function(err) {
        if (err) {
            return res.status(400).send(err);
        } else {
            res.jsonp(post);
        }
    });
};

/**
 * Create list of Posts
 */
exports.createList = function(req, res) {
    var posts = JSON.parse(req.body.data);
    var tasks = [];

    for (var count = 0; count < posts.length; count++) {
        var post = new Post(posts[count]);
        tasks.push(post.save());
    }

    q.all(tasks).then(function() {
        res.status(200).send();
    }, function(err) {
        res.status(400).send(err);
    });
};

/**
 * List of posts
 */
exports.list = function(req, res) {
    var clause = {};

    // Clause formating
    if (req.query.author)
        clause.author = req.query.author;
    if (req.query.from || req.query.to)
        clause.date = {};
    if (req.query.from)
        clause.date.$gte = req.query.from;
    if (req.query.to)
        clause.date.$lt =  req.query.to;

    Post.find(clause).exec(function(err, posts) {
        if (err) {
            return res.status(400).send(err);
        } else {
            res.jsonp({posts: posts, count: posts.length});
        }
    });
};

/**
 * Show the current Post
 */
exports.read = function(req, res) {
    res.jsonp(req.post);
};

/**
 * Post middleware
 */
exports.postByID = function(req, res, next, id) {
    Post.findById(id).exec(function(err, post) {
        if (err) return res.status(400).send(err);
        if (! post) return next(new Error('Unable to find post with id : ' + id));
        req.post = post ;
        next();
    });
};

/**
 * Delete all posts
 */
exports.deleteAll = function(req, res) {
    Post.find().remove(function(err) {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).send();
        }
    });
};
