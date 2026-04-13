namespace Platform.Google {
    export class CalendarService {
        getDefaultCalendar(): GoogleAppsScript.Calendar.Calendar {
            return CalendarApp.getDefaultCalendar();
        }

        getEvents(startTime: Date, endTime: Date): GoogleAppsScript.Calendar.CalendarEvent[] {
            return this.getDefaultCalendar().getEvents(startTime, endTime);
        }
    }
}
