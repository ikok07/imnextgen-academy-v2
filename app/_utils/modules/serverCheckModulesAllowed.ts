import {checkAccess, checkMultipleResourcesAccess} from "@/app/actions";
import {z} from "zod";
import {subscriptionTierSchema} from "@/drizzle/schema/user_subscriptions";
import {Module, moduleAccessEnumSchema} from "@/drizzle/schema/modules";

export const serverCheckMultipleModulesAllowedOptionsSchema = z.object({
    userId: z.string(),
    roles: z.array(z.string()),
    subscription_tier: subscriptionTierSchema.optional(),
    paid_modules: z.array(z.string().uuid()),
    modules: z.array(z.custom<Module>())
});

export const serverCheckModuleAllowedOptionsSchema = serverCheckMultipleModulesAllowedOptionsSchema.omit({modules: true}).extend({
    moduleId: z.string().uuid(),
    moduleAccess: moduleAccessEnumSchema
});

export type ServerCheckMultpleModulesAllowedOptions = z.infer<typeof serverCheckMultipleModulesAllowedOptionsSchema>;
export type ServerCheckModuleAllowedOptions = z.infer<typeof serverCheckModuleAllowedOptionsSchema>;

export async function serverCheckMultipleModulesAllowed({userId, roles, subscription_tier, paid_modules, modules}: ServerCheckMultpleModulesAllowedOptions) {
    return await checkMultipleResourcesAccess({
        principal: {
            id: userId,
            roles: roles,
            attr: {
                access: !!subscription_tier && subscription_tier != "inactive" ? "subscription" : "free",
                paid_modules
            }
        },
        resources: modules.map(m => ({
            resource: {
                kind: "module",
                id: m.id,
                attr: {
                    moduleAccess: m.access
                }
            },
            actions: ["select"]
        })),
    });
}

export async function serverCheckModuleAllowed({userId, roles, subscription_tier, paid_modules, moduleId, moduleAccess}: ServerCheckModuleAllowedOptions) {
    return await checkAccess({
        principal: {
            id: userId,
            roles: roles,
            attr: {
                access: !!subscription_tier && subscription_tier != "inactive" ? "subscription" : "free",
                paid_modules
            }
        },
        resource: {
            kind: "module",
            id: moduleId,
            attr: {
                moduleAccess: moduleAccess
            }
        },
        action: "select"
    });
}