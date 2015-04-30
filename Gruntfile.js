/*
    By: Thiago R. M. Bitencourt
    E-mail: thiago.mbitencourt@gmail.com
 */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
	compress: {
	    main: {
        	options: {
	            archive: './release/BarcodeScannerApp.zip',
        	    mode: 'zip'
	        },
        	files: [
        		{expand: true, src : "**/*", cwd : "./platforms/windows/AppPackages/CordovaApp.Windows_0.0.1.0_anycpu_debug_Test/"}
        	]
	    }
	},
	'ftp-deploy': {
 	 build: {
   	 auth: {
   	 host: 'mbitencourt.com.br',
	      port: 21,
	      authKey: 'key1'
	    },
	    src: './release/',
	    dest: './'
	  }
	}
  });

grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-ftp-deploy');

grunt.registerTask('default', 'compress');
grunt.registerTask('deploy', 'ftp-deploy');
};