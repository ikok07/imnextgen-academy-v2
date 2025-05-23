import {z} from "zod";

export const teamMemberSchema = z.object({
    image: z.string(),
    name: z.string(),
    role: z.string()
});

export type TeamMember = z.infer<typeof teamMemberSchema>;