'use strict';

var should = require('should'),
    scanner = require('../../vdm-data/vdm-scanner.js');

describe('VDM Data Scann', function() {
    it('Should return the number of posts retrieved : 200', function(done) {
        this.timeout(20000);

        scanner.getVDMPosts().then(function(posts) {
            (posts.length).should.be.exactly(200);

            done();
        });
    });
});