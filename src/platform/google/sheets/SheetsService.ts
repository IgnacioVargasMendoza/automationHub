namespace Platform.Google {
    export class SheetsService {
        private spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet | null = null;

        constructor(private spreadsheetId?: string) { }

        private getSpreadsheet(): GoogleAppsScript.Spreadsheet.Spreadsheet {
            if (!this.spreadSheet) {
                this.spreadSheet = this.spreadsheetId
                    ? SpreadsheetApp.openById(this.spreadsheetId)
                    : SpreadsheetApp.getActiveSpreadsheet();
            }
            return this.spreadSheet;
        }

        public getSheet(name: string): GoogleAppsScript.Spreadsheet.Sheet {
            const sheet = this.getSpreadsheet().getSheetByName(name);
            if (!sheet) {
                throw new Error(`Sheet not found: ${name}`);
            }
            return sheet;
        }

        public readRange(sheetName: string, rangeA1: string): any[][] {
            const sheet = this.getSheet(sheetName);
            return sheet.getRange(rangeA1).getValues();
        }

        public getDataRange(sheetName: string): any[][] {
            return this.getSheet(sheetName).getDataRange().getValues();
        }

        public appendRow(sheetName: string, row: any[]): void {
            this.getSheet(sheetName).appendRow(row);
        }

        public clearSheet(sheetName: string): void {
            this.getSheet(sheetName).clear();
        }
    }
}
