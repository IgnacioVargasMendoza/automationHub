namespace Platform.Google {
    export class GmailService {
        sendEmail(recipient: string, subject: string, body: string, options?: any): void {
            GmailApp.sendEmail(recipient, subject, body, options);
        }

        createDraft(recipient: string, subject: string, body: string, options?: any): GoogleAppsScript.Gmail.GmailDraft {
            return GmailApp.createDraft(recipient, subject, body, options);
        }
    }
}
