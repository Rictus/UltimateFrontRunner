var gulp = require('gulp');
var gulpfileModules = require('./src/gulp_modules');
var megaConf = {
    css: {
        active: true,
        dev: {
            active: true,
            streamCss: false,
            watchPath: "../dev/css/**/*.less",
            destPath: "../dev-public/css/",
            concat: false,
            autoprefix: true,
            autoprefixString: '> 1%',
            less: true,
            minify: false
        },
        prod: {
            active: true,
            streamCss: false,
            watchPath: "../dev/css/**/*.less",
            destPath: "../prod/css/",
            renameTo: "style.min.css",
            concat: true,
            autoprefix: true,
            autoprefixString: '> 1%',
            less: true,
            minify: true
        }
    },
    js: {
        active: true,
        dev: {
            active: true,
            streamJs: false,
            watchPath: "../dev/js/**/*.js",
            destPath: "../dev-public/js/",
            concat: true,
            renameTo: 'global.min.js',
            uglify: false
        },
        prod: {
            active: true,
            streamJs: false,
            watchPath: "../dev/js/**/*.js",
            destPath: "../prod/js/",
            concat: true,
            renameTo: 'global.min.js',
            uglify: true
        }
    },
    img: {
        active: true,
        dev: {
            active: true,
            watchPath: "../dev/img/**/*.{png,jpg,jpeg,gif,svg}",
            destPath: "../dev-public/img/"
        },
        prod: {
            active: true,
            watchPath: "../dev/img/**/*.{png,jpg,jpeg,gif,svg}",
            destPath: "../prod/img/"
        }
    },
    html: {
        active: true,
        dev: {
            active: true,
            streamHTML: false,
            watchPath: "../dev/*.html",
            destPath: "../dev-public/",
            minify: false
        },
        prod: {
            active: true,
            streamHTML: false,
            watchPath: "../dev/*.html",
            destPath: "../prod/",
            minify: true
        }
    }
};

var browerSync = {
    active: false,
    baseDir: "../prod/",
    indexUrl: "index_2d.html",
    serverPort: 9031,
    browsers: [""],
    reloadOnTasks: []
};
gulpfileModules(gulp, megaConf, browerSync).start();