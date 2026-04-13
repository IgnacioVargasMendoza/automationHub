"use strict";
/// <reference path="../../features/core/domain/Automation.ts" />
/// <reference path="../../platform/config/ConfigService.ts" />
/// <reference path="../../platform/state/StateService.ts" />
/// <reference path="../../platform/runtime/logger.ts" />
/// <reference path="../../platform/google/sheets/SheetsService.ts" />
/// <reference path="../../platform/google/gmail/GmailService.ts" />
/// <reference path="../../platform/google/drive/DriveService.ts" />
/// <reference path="../../platform/google/calendar/CalendarService.ts" />
/// <reference path="../../platform/http/HttpClient.ts" />
var Platform;
(function (Platform) {
    var Runtime;
    (function (Runtime) {
        function buildContext() {
            return {
                logger: new Platform.Runtime.Logger(),
                config: new Platform.Config.ConfigService(),
                state: new Platform.State.StateService(),
                services: {
                    sheets: new Platform.Google.SheetsService(),
                    gmail: new Platform.Google.GmailService(),
                    drive: new Platform.Google.DriveService(),
                    calendar: new Platform.Google.CalendarService(),
                    http: new Platform.Http.HttpClient()
                },
                now: () => new Date()
            };
        }
        Runtime.buildContext = buildContext;
    })(Runtime = Platform.Runtime || (Platform.Runtime = {}));
})(Platform || (Platform = {}));
