'use strict';
var htmlmin = require('gulp-htmlmin');
var tasksNames = [];
/*************************************************/
//
//                    H T M L
//
/*************************************************/

var htmlminConf = {
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

module.exports = function (gulp, getBrowserSyncInstance, logAction) {
    var _iConf = {};

    var _init = function (taskName, configuration) {
        _iConf["taskName"] = taskName;
        _iConf["taskConfiguration"] = configuration;
        _iConf["streamFunction"] = _buildStreamFunction(configuration);
    };

    var _buildStreamFunction = function () {
        var taskConf = _iConf["taskConfiguration"];
        return function () {
            var stream;
            stream = gulp.src(taskConf.watchPath);
            stream = taskConf.minify ? stream.pipe(htmlmin(htmlminConf)) : stream;
            stream = stream.pipe(gulp.dest(taskConf.destPath));
            stream = taskConf.streamHTML ? stream.pipe(getBrowserSyncInstance().stream()) : stream;
            return stream;
        };
    };

    var _start = function () {
        gulp.task(_iConf["taskName"], _iConf["streamFunction"]);
        gulp.watch(_iConf["taskConfiguration"].watchPath, [_iConf["taskName"]]);
    };

    return {
        init: _init,
        start: _start,
        getTasksNames: function () {
            return tasksNames;
        }
    }
};