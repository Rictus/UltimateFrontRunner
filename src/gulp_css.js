'use strict';
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var tasks = {};
/*************************************************/
//
//                    C S S
//
/*************************************************/


module.exports = function (opts) {
    var gulp = opts["gulp"]; //TODO Change to merge() objects
    var getBrowserSyncInstance = opts["getBrowserSyncInstance"];
    var logAction = opts["logAction"];

    var _conf = {};

    var _init = function (taskName, configuration) {
        _conf["taskName"] = taskName;
        _conf["taskConfiguration"] = configuration;
        _conf["streamFunction"] = _buildStreamFunction(configuration);
    };

    var _buildStreamFunction = function () {
        var taskConf = _conf["taskConfiguration"];
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
    var _start = function () {
        gulp.task(_conf["taskName"], _conf["streamFunction"]);
        gulp.watch(_conf["taskConfiguration"].watchPath, [_conf["taskName"]]);
    };

    return {
        init: _init,
        start: _start
    }
};