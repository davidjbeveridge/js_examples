module.exports = function(grunt) {

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['spec/**/*_spec.js']
      }
    },
    watch: {
      spec: {
        tasks: ['clear', 'mochaTest'],
        files: ['spec/**/*js','lib/**/*js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-clear');
};
