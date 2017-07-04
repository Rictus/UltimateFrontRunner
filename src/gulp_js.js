'use strict';
var GulpBase = require('./gulp_base');
var util = require('util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var tasks = {};
/*************************************************/
//                    J S
/*************************************************/


function GulpJs(opts) {
    GulpBase.apply(this, arguments);
};

util.inherits(GulpJs, GulpBase);

GulpJs.prototype._buildStreamFunction = function () {
    var taskConf = this._conf["taskConfiguration"];
    var gulp = this.gulp;
    var getBrowserSyncInstance = this.getBrowserSyncInstance;
    return function () {
        var stream;
        stream = gulp.src(taskConf.watchPath);
        stream = taskConf.concat ? stream.pipe(concat(taskConf.renameTo)) : stream;
        stream = taskConf.uglify ? stream.pipe(uglify()) : stream;
        if (!Array.isArray(taskConf.destPath)) {
            taskConf.destPath = [taskConf.destPath];
        }
        for (var i = 0; i < taskConf.destPath.length; i++) {
            var destPath = taskConf.destPath[i];
            stream = stream.pipe(gulp.dest(destPath));
        }
        stream = taskConf.streamJs ? stream.pipe(getBrowserSyncInstance().stream()) : stream;
        return stream;
    };
};

module.exports = GulpJs;