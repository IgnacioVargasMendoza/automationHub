"use strict";
var Platform;
(function (Platform) {
    var Google;
    (function (Google) {
        class SheetsService {
            constructor(spreadsheetId) {
                this.spreadsheetId = spreadsheetId;
                this.spreadSheet = null;
            }
            getSpreadsheet() {
                if (!this.spreadSheet) {
                    this.spreadSheet = this.spreadsheetId
                        ? SpreadsheetApp.openById(this.spreadsheetId)
                        : SpreadsheetApp.getActiveSpreadsheet();
                }
                return this.spreadSheet;
            }
            getSheet(name) {
                const sheet = this.getSpreadsheet().getSheetByName(name);
                if (!sheet) {
                    throw new Error(`Sheet not found: ${name}`);
                }
                return sheet;
            }
            readRange(sheetName, rangeA1) {
                const sheet = this.getSheet(sheetName);
                return sheet.getRange(rangeA1).getValues();
            }
            getDataRange(sheetName) {
                return this.getSheet(sheetName).getDataRange().getValues();
            }
            appendRow(sheetName, row) {
                this.getSheet(sheetName).appendRow(row);
            }
            clearSheet(sheetName) {
                this.getSheet(sheetName).clear();
            }
        }
        Google.SheetsService = SheetsService;
    })(Google = Platform.Google || (Platform.Google = {}));
})(Platform || (Platform = {}));
