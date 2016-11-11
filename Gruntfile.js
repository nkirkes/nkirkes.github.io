//Gruntfile
module.exports = function(grunt) {
  // requirejs compile options
  var compileOptions = {

      mainConfigFile: 'app/scripts/main.js',
      baseUrl: 'app/scripts',
      include: ['main'],
      out: 'dist/main.min.js',
      removeCombined: false,
      findNestedDependencies: true,

      //Removes console.logs for production
      onBuildWrite: function (moduleName, path, contents) {
          if(/(.*)js\/modules\/(.*)/.test(path)) return contents.replace(/console.log(.*);/g, ';');
          return contents;
      }
  }

  //Initializing the configuration object
  grunt.initConfig({

    // Task configuration
    less: {
      development: {
        options: {
           compress: false,  // no minification in dev
        },
        files: {
           //compiling base.less into styles.css
           "./app/styles/styles.css":"./less/toolkit-light.less"
        }
      },
      production: {
        options: {
           cleancss: true, // minify css
           // compress: true, // minify css
        },
        files: {
           //compiling base.less into main.min.css
           "./dist/main.min.css": "./less/toolkit-light.less"
        }
      }
    },
    requirejs: {
        compile: {
            options : compileOptions
        }
    }
  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Task definition
  grunt.registerTask('default', ['less', 'requirejs']);
};
