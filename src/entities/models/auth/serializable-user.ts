import {z} from "zod";

export const serializableUserSchema = z.object({
    id: z.string(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    emailAddress: z.string(),
    phoneNumber: z.string().optional()
})

export type SerializableUser = z.infer<typeof serializableUserSchema>;