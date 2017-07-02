'use strict';
var gulpServer = require('./gulpfile_server.js')(gulp);
var gulpCss = require('./gulpfile_css.js')(gulp, gulpServer.getBrowserSyncInstance);
var gulpHtml = require('./gulp_html.js')(gulp, gulpServer.getBrowserSyncInstance, function (log) {
    console.log("[HTML] " + log);
});
var gulpJs = require('./gulpfile_js.js')(gulp, gulpServer.getBrowserSyncInstance);
var gulpImg = require('./gulpfile_img.js')(gulp);
var tksNames;



module.exports = function (gulp, modulesConfigurations, browserConfiguration) {

    var _iConf = {
        tasksThatReloadBrowser: [],
        tasksToCompleteBeforeBrowser: [],
        startupTasks: []
    };

    var _addModules = function (conf) {
        if ("css" in conf)
            conf["css"]["module"] = gulpCss;
        if ("js" in conf)
            conf["js"]["module"] = gulpJs;
        if ("img" in conf)
            conf["img"]["module"] = gulpImg;
        if ("html" in conf)
            conf["html"]["module"] = gulpHtml;
        return conf;
    };

    modulesConfigurations = _addModules(modulesConfigurations);
    for (var key in modulesConfigurations) {
        if (modulesConfigurations.hasOwnProperty(key) && modulesConfigurations[key].active) {
            var module = modulesConfigurations[key].module;
            module.init(modulesConfigurations[key]);
            tksNames = module.getTasksNames();
            _iConf["tasksToCompleteBeforeBrowser"] = _iConf["tasksToCompleteBeforeBrowser"].concat(tksNames);
            _iConf["tasksThatReloadBrowser"] = _iConf["tasksThatReloadBrowser"].concat(tksNames);
            _iConf["startupTasks"] = _iConf["startupTasks"].concat(tksNames);
        }
    }

    if (browserConfiguration.active) {
        gulpServer.init(browserConfiguration, tasksToCompleteBeforeBrowser, tasksThatReloadBrowser);
        startupTasks.push(gulpServer.getTasksNames());
    }
    var _init = function () {
        modulesConfigurations = _addModules(modulesConfigurations);
        for (var key in modulesConfigurations) {
            if (modulesConfigurations.hasOwnProperty(key) && modulesConfigurations[key].active) {

            }
        }
    };
    var _start = function () {

    };


    return {
        start: function (cb) {
            var onStarted = function () {
                if (typeof cb === "function")
                    cb(startupTasks);
            };
            gulp.task('default', startupTasks, onStarted);
        }
    }
};