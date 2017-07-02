'use strict';
var htmlmin = require('gulp-htmlmin');
var tasksNames = [];
/*************************************************/
//
//                    H T M L
//
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

module.exports = function gulpHtml(opts) {
    var gulp = opts["gulp"]; //TODO Change to merge() objects
    var getBrowserSyncInstance = opts["getBrowserSyncInstance"];
    var logAction = opts["logAction"];

    var _conf = {};

    var init = function (taskName, configuration) {
        tasksNames = [taskName];
        _conf["taskName"] = taskName;
        _conf["taskConfiguration"] = configuration;
        _conf["streamFunction"] = _buildStreamFunction(configuration);
    };

    var _buildStreamFunction = function () {
        var taskConf = _conf["taskConfiguration"];
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

    var start = function () {
        gulp.task(_conf["taskName"], _conf["streamFunction"]);
        gulp.watch(_conf["taskConfiguration"].watchPath, [_conf["taskName"]]);
    };

    return {
        init: init,
        start: start,
        getTasksNames: function () {
            return tasksNames;
        }
    }
};