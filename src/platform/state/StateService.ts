/// <reference path="../config/ConfigService.ts" />

namespace Platform.State {
    export class StateService {
        constructor(private namespace: string = '') { }

        scope(prefix: string): StateService {
            return new StateService(this.namespace ? `${this.namespace}.${prefix}` : prefix);
        }

        get(key: string): string | null {
            const fullKey = this.getFullKey(key);
            return PropertiesService.getScriptProperties().getProperty(fullKey);
        }

        set(key: string, value: string): void {
            const fullKey = this.getFullKey(key);
            PropertiesService.getScriptProperties().setProperty(fullKey, value);
        }

        getJson<T>(key: string): T | null {
            const val = this.get(key);
            if (!val) return null;
            try {
                return JSON.parse(val) as T;
            } catch (e) {
                console.warn(`Failed to parse state for key ${key}`, e);
                return null;
            }
        }

        setJson(key: string, value: any): void {
            this.set(key, JSON.stringify(value));
        }

        delete(key: string): void {
            const fullKey = this.getFullKey(key);
            PropertiesService.getScriptProperties().deleteProperty(fullKey);
        }

        private getFullKey(key: string): string {
            return this.namespace ? `${this.namespace}.${key}` : key;
        }
    }
}
