import {
    CalendarEvent, CalendarRawResponse,
    CreateCalendarEventOptions, DeleteCalendarEventOptions,
    GetCalendarEventsOptions,
    ICalendarService, UpdateCalendarEventOptions
} from "@/src/application/services/calendar/calendar.service.interface";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {google} from "googleapis";
import {OAuth2Client} from "google-auth-library";
import {BookedCalendarEvent} from "@/src/entities/models/meetings/booked-calendar-event";

export class GoogleCalendarService implements ICalendarService {

    private getAuth() {
        const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY as string)
        const SCOPES = ["https://www.googleapis.com/auth/calendar"];

        return new google.auth.GoogleAuth({
            credentials,
            scopes: SCOPES
        });
    }

    private async getCalendar() {
        const auth = this.getAuth();

        const authClient = (await auth.getClient()) as OAuth2Client;
        return google.calendar({version: "v3", auth: authClient});
    }

    async getCalendarEvents({timeMin, timeMax, calendarId}: GetCalendarEventsOptions): Promise<BookedCalendarEvent[]> {
        try {
            const calendar = await this.getCalendar();

            const formattedTimeMin = timeMin ? new Date(+timeMin).toISOString() : null;
            const formattedTimeMax = timeMax ? new Date(+timeMax).toISOString() : null;

            const options: {
                calendarId: string,
                singleEvents: boolean,
                timeMin: string | undefined,
                timeMax: string | undefined
            } = {
                calendarId,
                singleEvents: true,
                timeMin: undefined,
                timeMax: undefined
            }

            if (formattedTimeMin) options.timeMin = formattedTimeMin;
            if (formattedTimeMax) options.timeMax = formattedTimeMax;
            const res = await calendar.events.list(options);

            if (!res.data.items) return [];

            return res.data.items.map(obj => ({
                start: new Date(obj.start!.dateTime || obj.start!.date!).valueOf(),
                end: new Date(obj.end!.dateTime || obj.end!.date!).valueOf()
            })) as BookedCalendarEvent[];
        } catch (e) {
            throw new DatabaseError(`Failed to get google calendar events! Error: ${e}`);
        }
    }
    async createCalendarEvent({calendarId, event}: CreateCalendarEventOptions): Promise<CalendarRawResponse> {
        try {
            const calendar = await this.getCalendar();

            // @ts-ignore
            const {data} = await calendar.events.insert({
                auth: this.getAuth(),
                calendarId,
                resource: event
            });

            return data as CalendarRawResponse;
        } catch (e) {
            throw new DatabaseError(`Failed to create event! Error: ${e}`);
        }
    }
    async updateCalendarEvent({calendarId, eventId, event}: UpdateCalendarEventOptions): Promise<CalendarRawResponse> {
        try {
            const calendar = await this.getCalendar();

            // @ts-ignore
            const {data} = await calendar.events.patch({
                auth: this.getAuth(),
                calendarId,
                eventId,
                resource: event
            });

            return data as CalendarRawResponse;
        } catch (e) {
            throw new DatabaseError(`Failed to update event! Error: ${e}`);
        }
    }
    async deleteCalendarEvent({calendarId, eventId}: DeleteCalendarEventOptions): Promise<void> {
        try {
            const calendar = await this.getCalendar();

            await calendar.events.delete({
                auth: this.getAuth(),
                calendarId,
                eventId
            })
        } catch (e) {
            throw new DatabaseError(`Failed to delete event! Error: ${e}`);
        }
    }
}