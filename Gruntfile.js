'use strict';

module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist'],

        copy: {
            all: {
                expand: true,
                cwd: 'public/',
                src: ['*.css', '*.html', '/images/**/*', '!Gruntfile.js'],
                dest: 'dist/',
                flatten: true,
                filter: 'isFile'
            }
        },

        browserify: {
            all: {
                src: 'src/*.js',
                dest: 'dist/app.js'
            },
            options: {
                transform: ['debowerify'],
                debug: true
            }
        },

        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            },
        },

        connect: {
            options: {
                port: process.env.PORT || 3000,
                base: 'public/',
            },

            all: {},
        },


        watch: {
            options: {
                livereload: true
            },

            html: {
                files: '<%= copy.all.src %>',
            },

            js: {
                files: '<%= browserify.all.src %>',
                tasks: ['browserify'],
            },

            assets: {
                files: ['assets/**/*', '*.css', 'images/**/*', 'img/**/*', '!Gruntfile.js'],
                tasks: ['copy'],
            }
        },
        simplemocha: {
            options: {
                globals: ['should'],
                timeout: 3000,
                ignoreLeaks: false,
                grep: '*-test',
                ui: 'bdd',
                reporter: 'tap'
            },

            all: {
                src: ['test/unit/**/*.js']
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'clean', 'browserify', 'copy', 'simplemocha']);
    grunt.registerTask('server', ['default', 'connect', 'watch']);
    grunt.registerTask('test', ['simplemocha']);
    grunt.registerTask('build', ['clean', 'copy', 'browserify']);
};