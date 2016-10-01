'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        exec: {
            getPosts: {
                command: 'node ./scripts/vdm-data-transfer.js',
                stdout: true,
                stderr: true
            },
            deletePosts: {
                command: 'node ./scripts/vdm-data-remove.js',
                stdout: true,
                stderr: true
            },
            serve: {
                command: 'node ./index.js',
                stdout: true,
                stderr: true
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt',
                    quiet: false,
                    clearRequireCache: false,
                    noFail: false
                },
                src: ['tests/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('get-posts', ['exec:getPosts']);
    grunt.registerTask('delete-posts', ['exec:deletePosts']);
    grunt.registerTask('serve', ['exec:serve']);
    grunt.registerTask('test', ['mochaTest']);
};

