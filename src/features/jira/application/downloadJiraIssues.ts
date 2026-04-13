/// <reference path="../../core/domain/Automation.ts" />
/// <reference path="../infrastructure/jiraClient.ts" />

namespace Features.Jira.Application {
    export function downloadJiraIssues(ctx: Features.Core.Domain.AutomationContext, jql: string, sheetName: string): Features.Core.Domain.AutomationResult {
        try {
            const client = new Features.Jira.Infrastructure.JiraClient(ctx);
            const results = client.searchIssues(jql, ['summary', 'status', 'assignee', 'created']);

            // Validation
            if (!results.issues || !Array.isArray(results.issues)) {
                return { ok: false, error: 'Invalid response from Jira' };
            }

            const data: any[][] = results.issues.map((issue: any) => [
                issue.key,
                issue.fields.summary,
                issue.fields.status?.name,
                issue.fields.assignee?.displayName || 'Unassigned',
                issue.fields.created
            ]);

            if (data.length === 0) {
                return { ok: true, processed: 0, warnings: ['No issues found'] };
            }

            // Headers
            const headers = ['Key', 'Summary', 'Status', 'Assignee', 'Created'];

            // Write to Sheet
            const sheet = ctx.services.sheets.getSheet(sheetName);
            sheet.clear();
            sheet.appendRow(headers);

            const range = sheet.getRange(2, 1, data.length, data[0].length);
            range.setValues(data);

            return { ok: true, processed: data.length };

        } catch (e: any) {
            return { ok: false, error: e.message };
        }
    }
}
