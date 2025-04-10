import {
    CheckResourceOptions,
    CheckUserAccessOptions, DecisionResults,
    IAuthorizationService
} from "@/src/application/services/auth/authorization.service.interface";
import {AutoUpdatingLoader, Embedded} from "@cerbos/embedded";
import {AuthorizationError} from "@/src/entities/errors/auth/authorization";

export class CerbosService implements IAuthorizationService {
    cerbos = new Embedded(
        new AutoUpdatingLoader(process.env.CERBOS_HUB_EMBEDDED_POLICY_URL!)
    )

    async hasAccess(opts: CheckUserAccessOptions): Promise<boolean> {
        try {
            return this.cerbos.isAllowed(opts);
        } catch(e) {
            console.error(e);
            throw new AuthorizationError(`Failed to check if user has access to resource! ${e}`);
        }
    }

    async checkResources(opts: CheckResourceOptions): Promise<DecisionResults> {
        try {
            const decision = await this.cerbos.checkResources(opts);
            const actions: DecisionResults = [];

            for (const result of decision.results) {
                actions.push({
                    resourceId: result.resource.id,
                    actions: result.actions
                })
            }
            console.log(opts.resources.map(r => r.resource));
            console.log(actions);
            return actions;
        } catch(e) {
            console.error(e);
            throw new AuthorizationError(`Failed to check if user has access to resources! ${e}`);
        }
    }
}