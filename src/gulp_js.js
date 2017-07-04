'use strict';
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var tasks = {};
/*************************************************/
//
//                    J S
//
/*************************************************/


module.exports = function (opts) {
    var gulp = opts["gulp"]; //TODO Change to merge() objects
    var getBrowserSyncInstance = opts["getBrowserSyncInstance"];
    var logAction = opts["logAction"];

    var _conf = {};

    var init = function (taskName, configuration) {
        _conf["taskName"] = taskName;
        _conf["taskConfiguration"] = configuration;
        _conf["streamFunction"] = _buildStreamFunction(configuration);
    };

    var _buildStreamFunction = function () {
        var taskConf = _conf["taskConfiguration"];
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

    var start = function () {
        gulp.task(_conf["taskName"], _conf["streamFunction"]);
        gulp.watch(_conf["taskConfiguration"].watchPath, [_conf["taskName"]]);
    };

    return {
        init: init,
        start: start
    };
};