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

export const checkResourcesOptionsSchema = z.object({
    principal: z.object({
        id: z.string(),
        roles: z.array(z.string()),
        attr: z.record(z.string(), z.any()).optional()
    }),
    resources: z.array(z.object({
        resource: z.object({
            kind: z.string(),
            id: z.string(),
            attr: z.record(z.string(), z.any()).optional()
        }),
        actions: z.array(z.string())
    }))
})

export const decisionResultsSchema = z.array(z.object({
    resourceId: z.string(),
    actions: z.object({}).passthrough()
}))

export type CheckUserAccessOptions = z.infer<typeof checkUserAccessOptionsSchema>;
export type CheckResourceOptions = z.infer<typeof checkResourcesOptionsSchema>;

export type DecisionResults = z.infer<typeof decisionResultsSchema>;

export interface IAuthorizationService {
    hasAccess(opts: CheckUserAccessOptions): Promise<boolean>
    checkResources(opts: CheckResourceOptions): Promise<DecisionResults>
}