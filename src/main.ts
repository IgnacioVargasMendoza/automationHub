/**
 * =============================================================================
 * ⚠️ BUILD & DEPLOYMENT WARNING ⚠️
 * =============================================================================
 * THIS REPOSITORY MUST NOT BE BUNDLED INTO A SINGLE Code.gs FILE.
 *
 * The build system is configured to:
 * 1. Output multiple .gs files mirroring the src/ folder structure.
 * 2. Use TypeScript Namespaces to manage dependencies (no runtime imports).
 * 3. Fail if a single-file bundle is detected.
 *
 * PLEASE REFER TO README.md "Build & Deployment Rules" BEFORE MAKING CHANGES.
 * =============================================================================
 */

/// <reference path="features/core/registry.ts" />
/// <reference path="features/core/runner.ts" />
/// <reference path="features/jira/automation.ts" />

// =============================================================================
// REGISTRATION
// =============================================================================

// Register Jira Automations
Features.Jira.automations.forEach(Features.Core.Registry.registerAutomation);

// Register Placeholders for other features
['gmail.export', 'drive.ocr', 'calendar.sync', 'sheets.process'].forEach(id => {
    Features.Core.Registry.registerAutomation({
        id,
        description: `Placeholder for ${id}`,
        run: (ctx) => {
            ctx.logger.info(`Running placeholder for ${id}`);
            return { ok: true, warnings: ['Not implemented'] };
        }
    });
});

// =============================================================================
// GLOBAL ENTRYPOINTS (Apps Script)
// =============================================================================

function doRunAutomationById(id: string) {
    return Features.Core.Runner.runAutomationById(id);
}

function runJiraDownloadIssues() {
    return doRunAutomationById('jira.downloadIssues');
}

function runGmailExport() {
    return doRunAutomationById('gmail.export');
}

function runDriveOcr() {
    return doRunAutomationById('drive.ocr');
}

function runCalendarSync() {
    return doRunAutomationById('calendar.sync');
}

function runSheetsProcessing() {
    return doRunAutomationById('sheets.process');
}

function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Automations')
        .addItem('Download Jira Issues', 'runJiraDownloadIssues')
        .addSeparator()
        .addItem('Run Gmail Export', 'runGmailExport')
        .addItem('Run Drive OCR', 'runDriveOcr')
        .addItem('Run Calendar Sync', 'runCalendarSync')
        .addItem('Run Sheets Processing', 'runSheetsProcessing')
        .addToUi();
}
