/// <reference path="registry.ts" />
/// <reference path="domain/Automation.ts" />
/// <reference path="../../platform/runtime/buildContext.ts" />
/// <reference path="../../platform/runtime/locks.ts" />
/// <reference path="../../platform/runtime/errors.ts" />

namespace Features.Core.Runner {
    export function runAutomationById(id: string): Features.Core.Domain.AutomationResult {
        const automation = Features.Core.Registry.getAutomation(id);

        // Construct context using Platform factory
        const ctx = Platform.Runtime.buildContext();

        if (!automation) {
            ctx.logger.error(`Automation not found: ${id}`);
            return { ok: false, error: `Automation not found: ${id}` };
        }

        const lock = new Platform.Runtime.LockServiceWrapper();
        if (!lock.tryLock(id)) {
            ctx.logger.warn(`Could not acquire lock for ${id}`);
            return { ok: false, error: 'Could not acquire lock', details: { id } };
        }

        try {
            const start = new Date().getTime();
            ctx.logger.info(`Starting automation: ${id}`);

            ctx.state.scope('runner').set(`automation.${id}.lastRunStart`, new Date().toISOString());

            const result = automation.run(ctx);

            const duration = new Date().getTime() - start;
            ctx.logger.info(`Finished automation: ${id} in ${duration}ms`, result);

            ctx.state.scope('runner').set(`automation.${id}.lastRunEnd`, new Date().toISOString());
            ctx.state.scope('runner').set(`automation.${id}.lastResult`, JSON.stringify(result));

            return result;

        } catch (e) {
            const msg = Platform.Runtime.normalizeError(e);
            ctx.logger.error(`Error running automation ${id}: ${msg}`);
            return { ok: false, error: msg };
        } finally {
            lock.releaseLock();
        }
    }
}
