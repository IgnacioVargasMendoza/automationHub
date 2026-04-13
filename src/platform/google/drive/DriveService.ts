namespace Platform.Google {
    export class DriveService {
        getFileById(id: string): GoogleAppsScript.Drive.File {
            return DriveApp.getFileById(id);
        }

        createFile(name: string, content: string, mimeType: string): GoogleAppsScript.Drive.File {
            return DriveApp.createFile(name, content, mimeType);
        }
    }
}
