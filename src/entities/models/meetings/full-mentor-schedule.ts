import {z} from "zod";

export const fullMentorScheduleSchema = z.object({
    profile_id: z.string(),
    days: z.array(z.object({
        dayOfWeek: z.number(),
        startHour: z.number(),
        startMinutes: z.number(),
        durationMinutes: z.number()
    }))
});

export type FullMentorSchedule = z.infer<typeof fullMentorScheduleSchema>;