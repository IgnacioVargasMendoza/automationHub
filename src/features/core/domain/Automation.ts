/// <reference path="../../../platform/config/ConfigService.ts" />
/// <reference path="../../../platform/runtime/logger.ts" />
/// <reference path="../../../platform/state/StateService.ts" />
/// <reference path="../../../platform/google/sheets/SheetsService.ts" />
/// <reference path="../../../platform/google/gmail/GmailService.ts" />
/// <reference path="../../../platform/google/drive/DriveService.ts" />
/// <reference path="../../../platform/google/calendar/CalendarService.ts" />
/// <reference path="../../../platform/http/HttpClient.ts" />

namespace Features.Core.Domain {
    export interface AutomationContext {
        logger: Platform.Runtime.Logger;
        config: Platform.Config.ConfigService;
        state: Platform.State.StateService;
        services: {
            sheets: Platform.Google.SheetsService;
            gmail: Platform.Google.GmailService;
            drive: Platform.Google.DriveService;
            calendar: Platform.Google.CalendarService;
            http: Platform.Http.HttpClient;
        };
        now(): Date;
    }

    export interface AutomationResult {
        ok: boolean;
        processed?: number;
        warnings?: string[];
        error?: string;
        details?: any;
    }

    export interface Automation {
        id: string;
        description?: string;
        run(ctx: AutomationContext): AutomationResult;
    }
}
