"use strict";
var Platform;
(function (Platform) {
    var Google;
    (function (Google) {
        class GmailService {
            sendEmail(recipient, subject, body, options) {
                GmailApp.sendEmail(recipient, subject, body, options);
            }
            createDraft(recipient, subject, body, options) {
                return GmailApp.createDraft(recipient, subject, body, options);
            }
        }
        Google.GmailService = GmailService;
    })(Google = Platform.Google || (Platform.Google = {}));
})(Platform || (Platform = {}));
