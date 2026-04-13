namespace Platform.Config {
    export class SecretsService {
        getSecret(key: string): string {
            const val = PropertiesService.getScriptProperties().getProperty(key);
            if (!val) {
                throw new Error(`Secret not found: ${key}`);
            }
            return val;
        }
    }
}
