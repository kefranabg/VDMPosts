'use strict';

var jsdom = require('jsdom'),
    _ = require('lodash'),
    parser = require('./vdm-parser'),
    q = require('q');

/**
 * Scan a page from VDM website and add data to VDMPosts
 * @param VDMPosts
 * @param pageCount
 * @param task
 */
module.exports.launchScan = function(VDMPosts, pageCount, task) {
    jsdom.env(
        'http://www.viedemerde.fr/?page=' + pageCount,
        ['http://code.jquery.com/jquery.js'],
        function (err, window) {
            var $ = window.$;

            /**
             * Iterate through each post and get their content, author and date
             */
            $('.post.article').not('.is-picture').each(function () {

                if (VDMPosts.length < 200)
                    VDMPosts.push({
                        content: parser.extractContent($(this)),
                        author: parser.extractAuthor($(this)),
                        date: parser.extractDate($(this))
                    });
                else {
                    return false;
                }

            });

            // Resolve the current task
            task.resolve();
        }
    );
};

/**
 * Retrieve posts from VDM
 */
module.exports.getVDMPosts = function () {
    var VDMPosts = [];
    var tasks = [];
    var deferred = q.defer();
    var currTask = null;

    /**
     * We need 16 pages to get 200 posts
     */
    for (var pageCount = 0; pageCount < 16; pageCount++) {

        // Create a list of tasks
        currTask = q.defer();
        tasks.push(currTask);

        this.launchScan(VDMPosts, pageCount, currTask);
    }

    // Build a list of promises from tasks
    var promises = [];
    _(tasks).forEach(function(task) {
        promises.push(task.promise);
    });

    // Resolve the promise when all tasks are completed
    q.all(promises).then(function() {
        deferred.resolve(VDMPosts);
    });

    return deferred.promise;
};