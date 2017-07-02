var gulp = require('gulp');
var gulpModules = require('../src/gulp_modules');
var megaConf = {
    html: {
        active: true,
        dev: {
            name: "html dev",
            active: true,
            streamHTML: false,
            watchPath: "./dev/index.html",
            destPath: "./dev-public/",
            minify: false
        },
        prod: {
            name: "html prod",
            active: true,
            streamHTML: false,
            watchPath: "./dev/index.html",
            destPath: "./prod-public/",
            minify: true
        }
    },
    css: {
        active: true,
        dev: {
            active: true,
            name: "prod css no minify",
            streamCss: false,
            watchPath: "./dev/css/*.css",
            destPath: "./dev-public/css/",
            concat: true,
            autoprefix: true,
            renameTo: "style.min.css",
            autoprefixString: '> 1%',
            less: true,
            minify: false
        },
        prod: {
            active: true,
            name: "prod css",
            streamCss: false,
            watchPath: "./dev/css/*.css",
            destPath: "./prod-public/css/",
            concat: true,
            renameTo: "style.min.css",
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
            name: "js prod no uglify",
            streamJs: false,
            watchPath: "./dev/js/*.js",
            destPath: "./dev-public/js/",
            concat: true,
            renameTo: 'global.min.js',
            uglify: false
        },
        prod: {
            active: true,
            name: "js prod",
            streamJs: false,
            watchPath: "./dev/js/*.js",
            destPath: "./prod-public/js/",
            concat: true,
            renameTo: 'global.min.js',
            uglify: true
        }
    },
    img: {
        active: true,
        dev: {
            active: true,
            watchPath: "./dev/img/*.{png,jpg,jpeg,gif,svg}",
            destPath: ["./dev-public/img/", "./prod-public/img/"]
        }
    }
};

var browserSync = {
    active: false,
    baseDir: "../prod/",
    indexUrl: "index_2d.html",
    serverPort: 9031,
    browsers: [""],
    reloadOnTasks: []
};
gulpModules(gulp, megaConf, browserSync).start();