'use strict';
var imagemin = require('gulp-imagemin');
var tasksNames = [];
/*************************************************/
//
//                    I M G
//
/*************************************************/

module.exports = function (opts) {
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
    };
};