'use strict';
/*************************************************/
//                    E X A M P L E
/*************************************************/

function GulpExample(opts) {
    GulpBase.apply(this, arguments);
}

util.inherits(GulpExample, GulpBase);

GulpExample.prototype._buildStreamFunction = function () {
    var taskConf = _conf["taskConfiguration"];
    return function () {
        var stream;
        // Add here streams & pipes of gulp packages
        return stream;
    };
};

module.exports = GulpExample;