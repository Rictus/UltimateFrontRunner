'use strict';
var GulpBase = require('./../gulp_base');
var util = require('util');
var htmlmin = require('gulp-htmlmin');
/*************************************************/
//                    H T M L
/*************************************************/

var htmlminConf = { // TODO Should be in option too
    removeComments: true,
    removeCommentsFromCDATA: true,
    collapseWhitespace: true,
    conservativeCollapse: false,
    preserveLineBreaks: false,
    collapseBooleanAttributes: false,
    removeAttributeQuotes: false,
    keepClosingSlash: true,
    caseSensitive: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
};

function GulpHtml(opts) {
    GulpBase.apply(this, arguments);
}

util.inherits(GulpHtml, GulpBase);

GulpHtml.prototype._buildStreamFunction = function () {
    var taskConf = this._conf["taskConfiguration"];
    var gulp = this.gulp;
    return function () {
        var stream;
        stream = gulp.src(taskConf.watchPath);
        stream = taskConf.minify ? stream.pipe(htmlmin(htmlminConf)) : stream;
        if (!Array.isArray(taskConf.destPath)) {
            taskConf.destPath = [taskConf.destPath];
        }
        for (var i = 0; i < taskConf.destPath.length; i++) {
            var destPath = taskConf.destPath[i];
            stream = stream.pipe(gulp.dest(destPath));
        }
        stream = taskConf.streamHTML ? stream.pipe(getBrowserSyncInstance().stream()) : stream;
        return stream;
    };
};


module.exports = GulpHtml;