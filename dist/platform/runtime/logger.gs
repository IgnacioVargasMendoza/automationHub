"use strict";
var Platform;
(function (Platform) {
    var Runtime;
    (function (Runtime) {
        class Logger {
            info(msg, ...args) {
                console.log(`[INFO] ${msg}`, ...args);
            }
            warn(msg, ...args) {
                console.warn(`[WARN] ${msg}`, ...args);
            }
            error(msg, ...args) {
                console.error(`[ERROR] ${msg}`, ...args);
            }
        }
        Runtime.Logger = Logger;
    })(Runtime = Platform.Runtime || (Platform.Runtime = {}));
})(Platform || (Platform = {}));
