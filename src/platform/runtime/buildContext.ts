/// <reference path="../../features/core/domain/Automation.ts" />
/// <reference path="../../platform/config/ConfigService.ts" />
/// <reference path="../../platform/state/StateService.ts" />
/// <reference path="../../platform/runtime/logger.ts" />
/// <reference path="../../platform/google/sheets/SheetsService.ts" />
/// <reference path="../../platform/google/gmail/GmailService.ts" />
/// <reference path="../../platform/google/drive/DriveService.ts" />
/// <reference path="../../platform/google/calendar/CalendarService.ts" />
/// <reference path="../../platform/http/HttpClient.ts" />

namespace Platform.Runtime {
    export function buildContext(): Features.Core.Domain.AutomationContext {
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
}
