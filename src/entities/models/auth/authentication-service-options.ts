import {z} from "zod";

export const authenticationServiceOptionsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export type AuthenticationServiceOptions = z.infer<typeof authenticationServiceOptionsSchema>;