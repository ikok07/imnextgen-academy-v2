import {z} from "zod";
import {BookedCalendarEvent} from "@/src/entities/models/meetings/booked-calendar-event";

export const calendarEventSchema = z.object({
    summary: z.string(),
    description: z.string(),
    start: z.object({
        dateTime: z.string()
    }),
    end: z.object({
        dateTime: z.string()
    })
});

export const calendarRawResponse = z.object({
    id: z.string()
});

export const getCalendarEventsOptionsSchema = z.object({
    timeMin: z.number().optional(),
    timeMax: z.number().optional(),
    calendarId: z.string()
});

export const createCalendarEventOptionsSchema = z.object({
    calendarId: z.string(),
    event: calendarEventSchema
});

export const updateCalendarEventOptionsSchema = createCalendarEventOptionsSchema.and(z.object({
    eventId: z.string()
}));

export const deleteCalendarEventOptionsSchema = z.object({
    calendarId: z.string(),
    eventId: z.string()
})

export type CalendarEvent = z.infer<typeof calendarEventSchema>;
export type CalendarRawResponse = z.infer<typeof calendarRawResponse>;

export type GetCalendarEventsOptions = z.infer<typeof getCalendarEventsOptionsSchema>;
export type CreateCalendarEventOptions = z.infer<typeof createCalendarEventOptionsSchema>;
export type UpdateCalendarEventOptions = z.infer<typeof updateCalendarEventOptionsSchema>;
export type DeleteCalendarEventOptions = z.infer<typeof deleteCalendarEventOptionsSchema>;

export interface ICalendarService {
    getCalendarEvents(opts: GetCalendarEventsOptions): Promise<BookedCalendarEvent[]>
    createCalendarEvent(opts: CreateCalendarEventOptions): Promise<CalendarRawResponse>
    updateCalendarEvent(opts: UpdateCalendarEventOptions): Promise<CalendarRawResponse>
    deleteCalendarEvent(opts: DeleteCalendarEventOptions): Promise<void>
}