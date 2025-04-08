import {z} from "zod";

export const checkUserAccessOptionsSchema = z.object({
    principal: z.object({
        id: z.string(),
        roles: z.array(z.string()),
        attr: z.record(z.string(), z.any()).optional()
    }),
    resource: z.object({
        kind: z.string(),
        id: z.string(),
        attr: z.record(z.string(), z.any()).optional()
    }),
    action: z.string()
})

export type CheckUserAccessOptions = z.infer<typeof checkUserAccessOptionsSchema>;

export interface IAuthorizationService {
    hasAccess(opts: CheckUserAccessOptions): Promise<boolean>
}