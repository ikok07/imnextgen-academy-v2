import {z} from "zod";

export const fullMentorScheduleDaySchema = z.object({
    dayOfWeek: z.number(),
    startHour: z.number(),
    startMinutes: z.number(),
    durationMinutes: z.number(),
    preferred_duration_minutes: z.number().optional()
});

export const fullMentorScheduleSchema = z.object({
    profile_id: z.string(),
    days: z.array(fullMentorScheduleDaySchema)
});

export type FullMentorScheduleDay = z.infer<typeof fullMentorScheduleDaySchema>;
export type FullMentorSchedule = z.infer<typeof fullMentorScheduleSchema>;