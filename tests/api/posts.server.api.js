'use strict';

var should = require('should'),
    config = require('../../config/config.js'),
    request = require('request');

describe('CRUD tests', function () {

    /**
     * Clear the database before running tests
     */
    before(function(done) {
        request.delete(
            'http://localhost:' + config.port + '/api/posts', function () {
                done();
            }
        );
    });

    it('Should be able to create a post', function (done) {
        var post = {
            content: 'content',
            author: 'franck',
            date: new Date(28, 11, 1993)
        };

        request.post(
            'http://localhost:' + config.port + '/api/create-one-post', {form: post},
            function (error, response, body) {
                body = JSON.parse(body);
                should.exist(body._id);

                done();
            }
        );
    });

    it('Should be able to find all posts', function (done) {
        request.get(
            'http://localhost:' + config.port + '/api/posts',
            function (error, response, body) {
                body = JSON.parse(body);
                should.equal(body.posts.length, 1);

                done();
            }
        );
    });

    it('Should be able to find post with author', function (done) {
        request.get(
            'http://localhost:' + config.port + '/api/posts?author=franck',
            function (error, response, body) {
                body = JSON.parse(body);
                should.equal(body.posts[0].author, 'franck');

                done();
            }
        );
    });

    it('Should not be able to find a post because of the range of \'from\' and \'to\'', function (done) {
        request.get(
            'http://localhost:' + config.port + '/api/posts?from=1994-01-01&to=2016-01-01',
            function (error, response, body) {
                body = JSON.parse(body);
                should.equal(body.posts.length, 0);

                done();
            }
        );
    });

    /**
     * Clear the database after running tests
     */
    after(function(done) {
        request.delete(
            'http://localhost:' + config.port + '/api/posts', function () {
                done();
            }
        );
    });
});