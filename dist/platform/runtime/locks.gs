"use strict";
var Platform;
(function (Platform) {
    var Runtime;
    (function (Runtime) {
        class LockServiceWrapper {
            /**
             * Tries to obtain a lock for the given resource.
             * @param resource The resource to lock
             * @param timeoutMs Max time to wait for lock in ms (default 30000)
             * @returns true if lock obtained, false otherwise
             */
            tryLock(resource, timeoutMs = 30000) {
                const lock = LockService.getScriptLock();
                try {
                    lock.waitLock(timeoutMs);
                    return true;
                }
                catch (e) {
                    console.warn(`Failed to acquire lock for ${resource}`);
                    return false;
                }
            }
            releaseLock() {
                LockService.getScriptLock().releaseLock();
            }
        }
        Runtime.LockServiceWrapper = LockServiceWrapper;
    })(Runtime = Platform.Runtime || (Platform.Runtime = {}));
})(Platform || (Platform = {}));
