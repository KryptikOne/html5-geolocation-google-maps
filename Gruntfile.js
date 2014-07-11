module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'src/stylesheets/style.compiled.css': 'src/stylesheets/style.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 version']
      },
      single_file: {
        src: 'src/stylesheets/style.compiled.css',
        dest: 'src/stylesheets/style.autoprefixed.css'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'src/stylesheets/',
        src: ['*.autoprefixed.css'],
        dest: 'dist/',
        ext: '.min.css'
      }
    },

    jshint: {
      beforeconcat: 'src/javascripts/geolocation.js'
    },

    uglify: {
      build: {
        src: 'src/javascripts/geolocation.js',
        dest: 'dist/geolocation.min.js'
      }
    },

    watch: {
      css: {
        files: 'src/stylesheets/*.scss',
        tasks: ['sass', 'autoprefixer'],
        options: { spawn: false }
      },
      scripts: {
        files: ['src/javascripts/*.js'],
        tasks: ['jshint'],
        options: { spawn: false }
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('prod', ['jshint', 'uglify', 'sass', 'autoprefixer', 'cssmin']);
  grunt.registerTask('dev', ['watch']);

};
