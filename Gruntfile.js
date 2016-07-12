//module.exports = function(grunt) {
//    var name, latest, bannerContent, devRelease, minRelease,
//        sourceMap, sourceMapMin, sourceMapUrl, lDevRelease, lMinRelease,
//        lSourceMapMin;
//
//    latest = '<%= pkg.name %>';
//    name = '<%= pkg.name %>-v<%= pkg.version%>';
//    bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
//        '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
//        ' *  License: <%= pkg.license %> */\n';
//    devRelease = 'dist/'+name+'.js';
//    minRelease = 'dist/'+name+'.min.js';
//    sourceMapMin = 'dist/'+name+'.min.js.map';
//    sourceMapUrl = name+'.min.js.map';
//
//    lDevRelease = 'dist/'+latest+'.js';
//    lMinRelease = 'dist/'+latest+'.min.js';
//    lSourceMapMin = 'dist/'+latest+'.min.js.map';
//
//    grunt.initConfig({
//        pkg: grunt.file.readJSON('package.json'),
//        qunit:{
//            target: {
//                src: ['test/*.html']
//            }
//        },
//        // configure copy task
//        copy: {
//            development: {
//                src: devRelease,
//                dest: lDevRelease
//            },
//            minified: {
//                src: minRelease,
//                dest: lMinRelease
//            },
//            smMinified: {
//                src: sourceMapMin,
//                dest: lSourceMapMin
//            }
//        },
//        // configure uglify task
//        uglify:{
//            options: {
//                banner: bannerContent,
//                sourceMapRoot: '../',
//                sourceMap: sourceMapMin,
//                sourceMappingURL: sourceMapUrl
//            },
//            target: {
//                src: ['src/*.js'],
//                dest: minRelease
//            }
//        },
//        // configure concat task
//        concat: {
//            options: {
//                banner: bannerContent
//            },
//            target: {
//                src: ['src/*.js'],
//                dest: devRelease
//            }
//        },
//        // configure jshint task
//        jshint: {
//            options: {
//                trailing: true,
//                eqeqeq: true
//            },
//            target: {
//                src: ['src/*.js', 'test/*.js']
//            }
//        }
//    });
//
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-copy');
//    grunt.loadNpmTasks('grunt-contrib-qunit');
//
//    grunt.registerTask('default', [/*'jshint'*/, 'concat', 'uglify', 'copy', 'qunit']);
//};

module.exports = function(grunt) {

    var bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
        ' *  License: <%= pkg.license %> */\n';
    var name = '<%= pkg.name %>-v<%= pkg.version%>';

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: bannerContent
            },
            target : {
                src : ['src/*.js'],
                dest : 'dist/dev/' + name + '.js'
            }
        },
        uglify: {
            options: {
                banner: bannerContent,
                sourceMapRoot: '../',
                sourceMap: 'distrib/'+name+'.min.js.map',
                sourceMapUrl: name+'.min.js.map'
            },
            target : {
                src : ['src/*.js'],
                dest : 'dist/prod/' + name + 'min.js'
            }
        },
        jshint: {
            options: {
                eqeqeq: true,
                trailing: true
            },
            target: {
                src: ['src/**/*.js', 'test/**/*.js']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', [/*'jshint',*/ 'concat', 'uglify']);

};