/// <reference path="../../core/domain/Automation.ts" />

namespace Features.Jira.Infrastructure {
    export interface JiraAuthHeaders {
        'Authorization': string;
        'Content-Type': string;
        'Accept': string;
        [key: string]: string;
    }

    export function getJiraAuthHeaders(ctx: Features.Core.Domain.AutomationContext): JiraAuthHeaders {
        const email = ctx.config.getString('jira.userEmail');
        const token = ctx.config.getString('jira.apiToken');

        const funcArgs = `${email}:${token}`;
        const encoded = Utilities.base64Encode(funcArgs);

        return {
            'Authorization': `Basic ${encoded}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }
}
