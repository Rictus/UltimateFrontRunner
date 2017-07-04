var gulp = require('gulp');
var gulpModules = require('../src/gulp_modules');
var megaConf = {
    "html": {
        "active": true,
        "dev": {
            "name": "html dev",
            "active": true,
            "streamHTML": false,
            "watchPath": "./dev/index.html",
            "destPath": "./dev-public/",
            "watch": true,
            "minify": false
        },
        "prod": {
            "name": "html prod",
            "active": true,
            "streamHTML": false,
            "watchPath": "./dev/index.html",
            "destPath": "./prod-public/",
            "watch": true,
            "minify": true
        }
    },
    "css": {
        "active": true,
        "dev": {
            "active": true,
            "name": "prod css no minify",
            "streamCss": true,
            "watchPath": "./dev/css/*.css",
            "destPath": "./dev-public/css/",
            "watch": true,
            "concat": true,
            "autoprefix": true,
            "renameTo": "style.min.css",
            "autoprefixString": '> 1%',
            "less": true,
            "minify": false
        },
        "prod": {
            "active": true,
            "name": "prod css",
            "streamCss": false,
            "watchPath": "./dev/css/*.css",
            "destPath": "./prod-public/css/",
            "watch": true,
            "concat": true,
            "renameTo": "style.min.css",
            "autoprefix": true,
            "autoprefixString": '> 1%',
            "less": true,
            "minify": true
        }
    },
    "js": {
        "active": true,
        "dev": {
            "active": true,
            "name": "js prod no uglify",
            "streamJs": true,
            "watchPath": "./dev/js/*.js",
            "destPath": "./dev-public/js/",
            "watch": false,
            "concat": true,
            "renameTo": 'global.min.js',
            "uglify": false
        },
        "prod": {
            "active": true,
            "name": "js prod",
            "streamJs": false,
            "watchPath": "./dev/js/*.js",
            "destPath": "./prod-public/js/",
            "watch": false,
            "concat": true,
            "renameTo": 'global.min.js',
            "uglify": true
        }
    },
    "img": {
        "active": true,
        "dev": {
            "active": true,
            "watchPath": "./dev/img/*.{png,jpg,jpeg,gif,svg}",
            "destPath": ["./dev-public/img/", "./prod-public/img/"],
            "watch": true
        }
    }
};

var browserSync = {
    active: true,
    baseDir: "./dev-public/",
    indexUrl: "index.html",
    serverPort: 9031,
    browsers: ["chrome"],
    reloadOnTasks: []
};
gulpModules(gulp, megaConf, browserSync).start();