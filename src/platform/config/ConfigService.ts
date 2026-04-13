/// <reference path="SecretsService.ts" />

namespace Platform.Config {
    export class ConfigService {
        private cache: Record<string, any> = {};

        constructor(private useCache: boolean = true) { }

        getString(key: string, required: boolean = true): string {
            const value = this.get(key);
            if (required && (value === undefined || value === null || value === '')) {
                throw new Error(`Missing required config: ${key}`);
            }
            return value ? String(value) : '';
        }

        getNumber(key: string, required: boolean = true): number {
            const value = this.get(key);
            if (required && (value === undefined || value === null)) {
                throw new Error(`Missing required config: ${key}`);
            }
            return Number(value);
        }

        getBoolean(key: string, defaultValue: boolean = false): boolean {
            const value = this.get(key);
            if (value === undefined || value === null) return defaultValue;
            return String(value).toLowerCase() === 'true';
        }

        private get(key: string): any {
            // Use global PropertiesService
            return PropertiesService.getScriptProperties().getProperty(key);
        }
    }
}
