'use strict';

module.exports = function (gulp, modulesConfigurations, browserConfiguration) {
    var _gulpServer = require('./modules/gulp_server.js')(gulp);

    var _modulePerType = {
        "server": require('./modules/gulp_server.js'),
        "css": require('./modules/gulp_css.js'),
        "html": require('./modules/gulp_html.js'),
        "js": require('./modules/gulp_js.js'),
        "img": require('./modules/gulp_img.js')
    };
    var _conf = {
        tasksThatReloadBrowser: [],
        tasksToCompleteBeforeBrowser: [],
        startupTasks: [],
        tasks: {}
    };

    var _init = function () {
        var initSingleModule = function (module, taskName, taskConf) {
            var m = new module({
                "gulp": gulp,
                "getBrowserSyncInstance": _gulpServer.getBrowserSyncInstance,
                "logAction": console.log
            });
            m.init(taskName, taskConf);

            _conf["tasksToCompleteBeforeBrowser"] = _conf["tasksToCompleteBeforeBrowser"].concat([taskName]);
            _conf["tasksThatReloadBrowser"] = _conf["tasksThatReloadBrowser"].concat([taskName]);
            _conf["startupTasks"] = _conf["startupTasks"].concat([taskName]);
            _conf["tasks"][taskName] = m;
        };

        var moduleConfiguration;
        for (var type in modulesConfigurations) {
            if (modulesConfigurations.hasOwnProperty(type) && modulesConfigurations[type].active) {
                moduleConfiguration = modulesConfigurations[type];
                delete moduleConfiguration.active;
                var module = _modulePerType[type];
                if (typeof module === "undefined") {
                    throw new Error("Unknown module type '" + type + "' Expected one of : " + Object.keys(_modulePerType).toString());
                }
                for (var taskKey in moduleConfiguration) {
                    var taskConf = moduleConfiguration[taskKey];
                    var taskName = moduleConfiguration["name"] ? moduleConfiguration["name"] : type + "_" + taskKey;
                    if ("active" in taskConf && taskConf["active"] === true) {
                        initSingleModule(module, taskName, taskConf);
                    }
                }
            }
        }
    };
    var _initBrowserSync = function () {
        if (browserConfiguration.active) {
            _gulpServer.init(browserConfiguration, _conf["tasksToCompleteBeforeBrowser"], _conf["tasksThatReloadBrowser"]);
            _conf["startupTasks"].push(_gulpServer.getTasksNames());
        }
    };
    var start = function (cb) {
        for (var taskName in _conf["tasks"]) {
            if (_conf["tasks"].hasOwnProperty(taskName)) {
                _conf["tasks"][taskName].start();
            }
        }
        var onStarted = function () {
            if (typeof cb === "function")
                cb(_conf["startupTasks"]);
        };
        gulp.task('default', _conf["startupTasks"], onStarted);
    };

    if (!(typeof modulesConfigurations === "object")) {
        throw new Error("Expected json path or object as second argument.");
    }
    _init();
    _initBrowserSync();

    return {
        start: start
    }
};