import {z} from "zod";

export const startSalesMeetingOptionsSchema = z.object({
    automationUrl: z.string(),
    backendUrl: z.string(),
    userId: z.string(),
    firstName: z.string(),
    email: z.string().email(),
    hour: z.string(), // HH:mm
    date: z.string(), // dd.MM.yyyy
    meetingUrl: z.string(),
    meetingStartDateSeconds: z.number()
});

export type StartSalesMeetingOptions = z.infer<typeof startSalesMeetingOptionsSchema>;

export interface IAutomationsService {
    startSalesMeetingAutomation(opts: StartSalesMeetingOptions): Promise<void>
}