import {z} from "zod";
import {profilesSchema} from "@/drizzle/schema/profiles";
import {userRoleTypeSchema} from "@/drizzle/schema/user_roles";

export const fullProfileSchema = profilesSchema.and(z.object({
    roles: z.array(userRoleTypeSchema)
}));

export type FullProfile = z.infer<typeof fullProfileSchema>