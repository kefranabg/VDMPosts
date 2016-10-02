'use strict';

/**
 * Posts routes
 * @param app
 */
module.exports = function(app) {

    /**
     * Module dependencies.
     */
    var posts = require('../controllers/posts.server.controller.js');

    app.route('/api/posts')
        .get(posts.list)
        .post(posts.createList)
        .delete(posts.deleteAll);

    app.route('/api/posts/:postId')
        .get(posts.read);

    app.route('/api/create-one-post')
        .post(posts.create);

    // Finish by binding the Post middleware
    app.param('postId', posts.postByID);
};
