/// <reference path="../core/domain/Automation.ts" />
/// <reference path="application/downloadJiraIssues.ts" />

namespace Features.Jira {
    export const jiraDownloadIssues: Features.Core.Domain.Automation = {
        id: 'jira.downloadIssues',
        description: 'Download issues from Jira to Sheets',
        run: (ctx: Features.Core.Domain.AutomationContext): Features.Core.Domain.AutomationResult => {
            const jql = ctx.config.getString('jira.defaultJql', false) || 'order by created DESC';
            const sheetName = ctx.config.getString('jira.targetSheet', false) || 'Jira Issues';

            return Features.Jira.Application.downloadJiraIssues(ctx, jql, sheetName);
        }
    };

    export const automations = [jiraDownloadIssues];
}
