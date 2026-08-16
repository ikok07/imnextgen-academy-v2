import {
    CheckResourceOptions,
    CheckUserAccessOptions, DecisionResults,
    IAuthorizationService
} from "@/src/application/services/auth/authorization.service.interface";
import {AuthorizationError} from "@/src/entities/errors/auth/authorization";

type Principal = CheckUserAccessOptions["principal"];
type Resource = CheckUserAccessOptions["resource"];

// In-process replacement for the Cerbos embedded PDP. The policy bundle host
// (lite.cerbos.cloud) was decommissioned, so the rules from cerbos/*.yaml are
// evaluated here instead. Keep this file in sync with the YAML policies.
export class LocalAuthorizationService implements IAuthorizationService {
    async hasAccess(opts: CheckUserAccessOptions): Promise<boolean> {
        try {
            return isAllowed(opts.principal, opts.resource, opts.action);
        } catch (e) {
            console.error(e);
            throw new AuthorizationError(`Failed to check if user has access to resource! ${e}`);
        }
    }

    async checkResources(opts: CheckResourceOptions): Promise<DecisionResults> {
        try {
            return opts.resources.map(({resource, actions}) => ({
                resourceId: resource.id,
                actions: Object.fromEntries(actions.map(action => [
                    action,
                    isAllowed(opts.principal, resource, action) ? "EFFECT_ALLOW" : "EFFECT_DENY"
                ]))
            }));
        } catch (e) {
            console.error(e);
            throw new AuthorizationError(`Failed to check if user has access to resources! ${e}`);
        }
    }
}

function isAllowed(principal: Principal, resource: Resource, action: string): boolean {
    const roles = principal.roles;
    const p = principal.attr ?? {};
    const r = resource.attr ?? {};
    const has = (...allowed: string[]) => roles.some(role => allowed.includes(role));
    const paidModules: unknown[] = Array.isArray(p.paid_modules) ? p.paid_modules : [];

    switch (resource.kind) {
        case "module":
            if (has("admin")) return ["select", "insert", "update", "delete"].includes(action);
            if (has("mentor", "moderator") && action === "select") return true;
            if (has("user") && action === "select") {
                switch (r.moduleAccess) {
                    case "free":
                        return true;
                    case "subscription":
                        return p.access === "subscription";
                    case "paid":
                    case "pre-order":
                        return paidModules.includes(resource.id);
                    case "subscription-or-paid":
                        return paidModules.includes(resource.id) || p.access === "subscription";
                }
            }
            return false;

        case "meeting":
            if (has("admin", "moderator", "mentor")) return ["select", "insert", "update", "delete"].includes(action);
            if (has("user") && action === "select") {
                if (r.access === "free") return true;
                if (r.access === "premium") return p.access === "subscription";
            }
            return false;

        case "navlink": {
            if (!has("user", "mentor", "moderator", "admin") || action !== "select") return false;
            const disallowed: unknown[] = Array.isArray(r.disallowedRoles) ? r.disallowedRoles : [];
            return disallowed.length === 0 || roles.some(role => !disallowed.includes(role));
        }

        case "profile":
            if (has("admin")) return ["select", "create", "update", "delete"].includes(action);
            if (has("mentor", "moderator") && action === "select") return true;
            if (has("user") && resource.id === principal.id) return ["select", "update", "delete"].includes(action);
            return false;

        case "specific-meeting":
            if (has("admin")) return ["select", "create", "update", "delete"].includes(action);
            if (has("moderator") && action === "select") return true;
            if (has("mentor")) {
                if (action === "create") return true;
                if (["select", "update", "delete"].includes(action) && r.mentor_profile_id === principal.id) return true;
            }
            if (has("user") && action === "select" && r.profile_id === principal.id) return true;
            return false;

        default:
            return false;
    }
}
