namespace Platform.Runtime {
    export class LockServiceWrapper {
        /**
         * Tries to obtain a lock for the given resource.
         * @param resource The resource to lock
         * @param timeoutMs Max time to wait for lock in ms (default 30000)
         * @returns true if lock obtained, false otherwise
         */
        tryLock(resource: string, timeoutMs: number = 30000): boolean {
            const lock = LockService.getScriptLock();
            try {
                lock.waitLock(timeoutMs);
                return true;
            } catch (e) {
                console.warn(`Failed to acquire lock for ${resource}`);
                return false;
            }
        }

        releaseLock(): void {
            LockService.getScriptLock().releaseLock();
        }
    }
}
