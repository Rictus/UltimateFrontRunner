'use strict';
var GulpBase = require('./gulp_base');
var util = require('util');
var imagemin = require('gulp-imagemin');
/*************************************************/
//                    I M G
/*************************************************/

function GulpImg(opts) {
    GulpBase.apply(this, arguments);
};

util.inherits(GulpImg, GulpBase);

GulpImg.prototype._buildStreamFunction = function () {
    var taskConf = this._conf["taskConfiguration"];
    var gulp = this.gulp;
    return function () {
        var stream;
        stream = gulp.src(taskConf.watchPath);
        stream = stream.pipe(imagemin());
        if (!Array.isArray(taskConf.destPath)) {
            taskConf.destPath = [taskConf.destPath];
        }
        for (var i = 0; i < taskConf.destPath.length; i++) {
            var destPath = taskConf.destPath[i];
            stream = stream.pipe(gulp.dest(destPath));
        }
        return stream;
    }
};

module.exports = GulpImg;