module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        files: {
          'dist/index.html': 'index.html',
          'dist/views/pizza.html': 'views/pizza.html'
        }
      }
    },
    imagemin: {
      portfolio: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/img'
        }]
      },
      views: {
        files: [{
          expand: true,
          cwd: 'views/images',
          src: ['**/*.{png,gif}'], //jpegs cause errors
          dest: 'dist/views/images'
        }]
      }
    },
    cssmin: {
      portfolio: {
          files: [{
            expand: true,
            cwd: 'css',
            src: ['*.css'],
            dest: 'dist/css',
            ext: '.min.css'
          }]
      },
      views: {
          files: [{
            expand: true,
            cwd: 'views/css',
            src: ['*.css'],
            dest: 'dist/views/css',
            ext: '.min.css'
          }]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/**/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      target: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
          'dist/views/js/main.min.js': 'views/js/main.js'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['imagemin', 'cssmin', 'jshint', 'concat', 'uglify', 'htmlmin']);

};