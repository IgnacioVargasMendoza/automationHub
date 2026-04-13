/// <reference path="../../core/domain/Automation.ts" />
/// <reference path="jiraAuth.ts" />

namespace Features.Jira.Infrastructure {
    export class JiraClient {
        private baseUrl: string;

        constructor(private ctx: Features.Core.Domain.AutomationContext) {
            this.baseUrl = `https://${ctx.config.getString('jira.domain')}`;
        }

        searchIssues(jql: string, fields: string[] = ['*all'], maxResults: number = 50): any {
            const url = `${this.baseUrl}/rest/api/3/search`;
            const payload = {
                jql,
                fields,
                maxResults,
                startAt: 0
            };

            const headers = getJiraAuthHeaders(this.ctx);
            const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
                method: 'post',
                headers: headers,
                payload: JSON.stringify(payload),
                muteHttpExceptions: true
            };

            const response = this.ctx.services.http.fetch(url, options);
            return JSON.parse(response.getContentText());
        }
    }
}
