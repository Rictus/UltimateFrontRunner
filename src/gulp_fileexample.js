'use strict';
var tasksNames = [];
/*************************************************/
//
//                    E X A M P L E
//
/*************************************************/

module.exports = function gulpExample(opts) {
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
            // Add here streams & pipes of gulp packages
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