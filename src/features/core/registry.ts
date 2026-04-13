/// <reference path="domain/Automation.ts" />

namespace Features.Core.Registry {
    const registry = new Map<string, Features.Core.Domain.Automation>();

    export function registerAutomation(automation: Features.Core.Domain.Automation) {
        if (registry.has(automation.id)) {
            console.warn(`Overwriting automation with id: ${automation.id}`);
        }
        registry.set(automation.id, automation);
    }

    export function getRegistry(): Map<string, Features.Core.Domain.Automation> {
        return registry;
    }

    export function getAutomation(id: string): Features.Core.Domain.Automation | undefined {
        return registry.get(id);
    }
}
