'use strict';
/*************************************************/
//
//                    P A R E N T
//
/*************************************************/

function GulpBase(opts) {
    this.gulp = opts["gulp"]; //TODO Change to merge() objects
    this.getBrowserSyncInstance = opts["getBrowserSyncInstance"];
    this.logAction = opts["logAction"];
    this._conf = {};
}

GulpBase.prototype.constructor = GulpBase;

GulpBase.prototype.init = function (taskName, configuration) {
    this._conf["taskName"] = taskName;
    this._conf["taskConfiguration"] = configuration;
    this._conf["streamFunction"] = this._buildStreamFunction(configuration);
};

GulpBase.prototype.start = function () {
    this.gulp.task(this._conf["taskName"], this._conf["streamFunction"]);
    this.gulp.watch(this._conf["taskConfiguration"].watchPath, [this._conf["taskName"]]);
};

GulpBase.prototype._buildStreamFunction = function () {
    throw new Error("Child must implement '_buildStreamFunction' function.");
};

module.exports = GulpBase;