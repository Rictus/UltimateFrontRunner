'use strict';
var GulpBase = require('./gulp_base');
var util = require('util');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var tasks = {};
/*************************************************/
//                    C S S
/*************************************************/
function GulpCss(opts) {
    GulpBase.apply(this, arguments);
}

util.inherits(GulpCss, GulpBase);

GulpCss.prototype._buildStreamFunction = function () {
    var taskConf = this._conf["taskConfiguration"];
    var gulp = this.gulp;
    var getBrowserSyncInstance = this.getBrowserSyncInstance;
    return function () {
        var stream;
        stream = gulp.src(taskConf.watchPath);
        stream = stream.pipe(plumber());
        stream = taskConf.less ? stream.pipe(less()) : stream;
        stream = taskConf.concat ? stream.pipe(concat(taskConf.renameTo)) : stream;
        stream = taskConf.autoprefix ? stream.pipe(autoprefixer(taskConf.autoprefixString)) : stream;
        stream = taskConf.minify ? stream.pipe(minify()) : stream;
        if (!Array.isArray(taskConf.destPath)) {
            taskConf.destPath = [taskConf.destPath];
        }
        for (var i = 0; i < taskConf.destPath.length; i++) {
            var destPath = taskConf.destPath[i];
            stream = stream.pipe(gulp.dest(destPath));
        }
        stream = taskConf.streamCss ? stream.pipe(getBrowserSyncInstance().stream()) : stream;
        return stream;
    };
};

module.exports = GulpCss;