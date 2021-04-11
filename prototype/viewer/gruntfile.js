module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            script: {
                options: {
                    stripBanners: true,
                    separator: '\n',
                    banner: '/*! Minified <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n',
                    process: function(src, filepath) {
                        var commentless = src.replace(/[^:]\/\/.*/g, '');
                        var strictless = commentless.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                        var spaceless = strictless.replace(/\s\s+/g, ' ') + '\n';
                        var banner = '/*! Source: ' + filepath + '*/\n';
                        return banner + spaceless;
                    },
                    footer: "\nconst BuildTime = '<%= grunt.template.today('yyyy-mm-dd h:MM:ss') %>';\nconst PackageVersion = '<%= pkg.version %>';"
                },
                src: ['script/**/*.js'],
                dest: 'build/<%= pkg.name %>.min.js'
            },
            css: {
                options: {
                    stripBanners: true,
                    separator: '\n',
                    banner: '/*! Minified <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n',
                    process: function(src, filepath) {
                        var banner = '/*! Source: ' + filepath + ' */\n';
                        var spaceless = src.replace(/\s\s+/g, ' ') + '\n';
                        return banner + spaceless;
                    }
                },
                src: ['css/**/*.css'],
                dest: 'build/<%= pkg.name %>.min.css'
            }
        },
        watch: {
            script: {
                files: ['script/**/*.js'],
                tasks: ['concat:script']
            },
            css: {
                files: ['css/**/*.css'],
                tasks: ['concat:css']
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'watch']);

};