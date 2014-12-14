module.exports = function (grunt) {

    grunt.initConfig({
        stylus: {
            compile: {
                files: {
                    "dist/css/weather.css": ["static/blocks/layout/*.styl", "static/blocks/**/*.styl"]
                }
            }
        },

        autoprefixer: {
            single_file: {
                options: {
                    browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "ie 8", "ie 9"]
                },
                src: "dist/css/weather.css"
            }
        },

        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: "dist/css/",
                    src: ["weather.css", "!*.min.css"],
                    dest: "dist/css/",
                    ext: ".min.css"
                }]
            }
        },

        watch: {
            options: {
                reload: true
            },
            src: {
                files: ["static/**/**/*"],
                tasks: ["default", "process_js"]
            }
        },

        jscs: {
            src: ["static/**/*.js", "!static/**/*.min.js", "!static/pages/index/index.js", "!static/blocks/update-timer/*.js", "!static/blocks/suggest/*.js", "!static/blocks/socketio/*.js", "!static/blocks/react/*.js"],
            options: {
                config: true,
                requireCurlyBraces: ["if"]
            }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc" // relative to Gruntfile
            },
            myFiles: ["static/**/*.js", "!static/**/*.min.js", "!static/pages/index/index.js", "!static/blocks/update-timer/*.js", "!static/blocks/suggest/*.js", "!static/blocks/socketio/*.js", "!static/blocks/react/*.js"]
        },

        copy: {
            jquery: {
                src: ["bower_components/jquery/dist/jquery.min.js","bower_components/jquery/dist/jquery.min.map"],
                dest: "dist/js/",
                expand: true,
                flatten: true
            },
            start: {
                src: "static/pages/start/start.html",
                dest: "dist/start.html"
            },
            staticImages: {
                src: ["static/images/*", "static/blocks/**/images/*"],
                dest: "dist/images/",
                expand: true,
                flatten: true
            },
            tabscss: {
                src: "static/blocks/**/**.min.css",
                dest: "dist/css/",
                expand: true,
                flatten: true
            }
        },
        react: {
            all: {
              files: {
                'dist/js/update-timer.js': 'static/blocks/update-timer/update-timer.js',
                'dist/js/index.js': 'static/pages/index/index.js',
                'dist/js/suggest.js': 'static/blocks/suggest/suggest.js'
              }
            },
        },
        
        uglify: {            
            scripts: {
                src: ["static/scripts/*", "static/blocks/**/*.js", "!static/pages/index/index.js", "!static/blocks/update-timer/*.js", "!static/blocks/suggest/*.js", "!static/blocks/socketio/*.js", "!static/blocks/react/*.js"],
                dest: "dist/js/",
                expand: true,
                flatten: true
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
              },
              files: {
                'dist/start.html': 'static/pages/start/start.html'
              }
            }
        },
        
        clean: ["dist/css/weather.css", "!dist/images/"],

        shell: {
            server: {
                options: {
                    stdout: true
                },
                command: [
                    "cd server",
                    "node server"
                ].join("&&")
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-stylus");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks('grunt-react');

    grunt.registerTask("default", ["stylus", "autoprefixer", "cssmin", "copy", "clean", "react", "uglify", "htmlmin"]);

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs");

    grunt.registerTask("process_js", ["jscs", "jshint"]);
    
    /* Start Express server */
    grunt.registerTask("server", ["stylus", "autoprefixer", "cssmin", "copy", "clean", "react", "uglify", "htmlmin", "shell"]);

};
