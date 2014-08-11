module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                separator: '\n',
                banner: '/**' +
                    '\n* <%= pkg.name %> - v<%= pkg.version %>' +
                    '\n*' +
                    '\n* Build Created: <%= grunt.template.today("yyyy-mm-dd") %>' +
                    '\n* Copyright (c) 2013 - 2014 spektraldevelopment.com, David Boyle.' +
                    '\n*' +
                    '\n* Distributed under the terms of the MIT license.' +
                    '\n* http://www.opensource.org/licenses/mit-license.html' +
                    '\n* ' +
                    '\n* This notice shall be included in all copies or substantial portions of the Software.' +
                    '\n**/' +
                    '\n' +
                    '(function (window) {' +
                    '\n' +
                    '\t\'use strict\';' +
                    '\n\n',
                footer: '\n\n' +
                    '\twindow.Spektral = Spektral;' +
                    '\n\n' +
                    '}(window));'
            },
            dist: {
                src: ['src/modules/Global.js', 'src/modules/DOM.js', 'src/modules/Event.js', 'src/modules/Number.js', 'src/modules/String.js', 'src/modules/Style.js', 'src/modules/Utils.js', 'src/modules/Debug.js'],
                dest: 'build/spektraltools.js'
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: true
                },
                files: {
                    "build/spektraltools.min.js": ["build/spektraltools.js"]
                }
            }
        },
        watch: {
            clear: {
                //clear terminal on any watch task. beauty.
                files: ['spec/**'], //or be more specific
                tasks: ['clear']
            },
            build: {
                files: ["src/**", "spec/**"],
                tasks: ["concat", "uglify", "casper", "notify:watch"]
            }
        },
        jasmine: {
            pivotal: {
                src: "build/spektraltools.js",
                    options: {
                    specs: "spec/SpektraltoolsSpec.js",
                    helpers: 'spec/helper/helper.js',
                    outfile: "SpecRunner.html",
                    keepRunner: true
                }
            }
        },
        casper : {
            spektralToolsTest : {
                options : {
                    test : true,
                    includes : 'spec/helper/casper-helper.js',
                    logLevel: 'debug'
                },
                files : {
                    'xunit/casper-results.xml' : ['spec/SpektraltoolsCasperSpec.js']
                }
            }
        },
        notify: {
            watch: {
                options: {
                    title: 'Task Complete',
                    message: 'Watch tasks run'
                }
            }
        }
    });

    // Load the plugin that provides the "watch" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-casper');
    grunt.loadNpmTasks('grunt-clear');
    grunt.loadNpmTasks('grunt-notify');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['concat', 'uglify', 'jasmine', 'casper']);
    grunt.registerTask('buildCasper', ['concat', 'uglify', 'casper']);
    grunt.registerTask('test', ['jasmine']);
};