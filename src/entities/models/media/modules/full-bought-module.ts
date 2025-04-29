import {z} from "zod";
import {profilesSchema} from "@/drizzle/schema/profiles";
import {modulesTableSchema} from "@/drizzle/schema/modules";

export const fullBoughtModuleSchema = z.object({
    id: z.string().uuid(),
    profile: profilesSchema,
    module: modulesTableSchema
});

export type FullBoughtModule = z.infer<typeof fullBoughtModuleSchema>;