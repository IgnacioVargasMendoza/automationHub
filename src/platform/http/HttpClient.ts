namespace Platform.Http {
    export class HttpClient {
        fetch(url: string, options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {}): GoogleAppsScript.URL_Fetch.HTTPResponse {
            const maxRetries = 3;
            let attempt = 0;

            while (attempt < maxRetries) {
                try {
                    const response = UrlFetchApp.fetch(url, options);
                    const code = response.getResponseCode();

                    // Retry on 429 (Rate Limit) or 5xx (Server Errors)
                    if (code === 429 || (code >= 500 && code < 600)) {
                        throw new Error(`HTTP ${code}`);
                    }

                    return response;
                } catch (e) {
                    attempt++;
                    console.warn(`HTTP Request failed (attempt ${attempt}/${maxRetries}): ${e}`);

                    if (attempt >= maxRetries) {
                        throw e;
                    }

                    // Exponential backoff: 1s, 2s, 4s...
                    Utilities.sleep(Math.pow(2, attempt - 1) * 1000);
                }
            }

            throw new Error('Unreachable code');
        }
    }
}
