import {getAllModules} from "@/app/dashboard/actions";
import ModuleBox from "@/app/_components/dashboard/classroom/ModuleBox";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCloudOffline} from "react-icons/io5";
import {checkMultipleResourcesAccess, getUserBoughtModules, getUserSubscription} from "@/app/actions";
import {getUser} from "@/app/_utils/actions/auth";

export default async function ModulesGrid() {
    try {
        const userObject = await getUser();

        if (!userObject.success || !userObject.value.user) throw new Error("Get user server action was not successful!");

        const [modulesResponse, subscriptionResponse, boughtModulesResponse] = await Promise.all([getAllModules(), getUserSubscription(userObject.value.user!.id), getUserBoughtModules(userObject.value.user.id)]);
        if (!modulesResponse.success) throw new Error("Get all modules server action was not successful!");
        if (!subscriptionResponse.success) throw new Error("Get subscription server action was not successful!");
        if (!boughtModulesResponse.success) throw new Error("Get bought modules server action was not successful!");

        const accessResponse = await checkMultipleResourcesAccess({
            principal: {
                id: userObject.value.user.id,
                roles: userObject.value.user.publicMetadata["roles"] as string[],
                attr: {
                    access: subscriptionResponse.value
                    &&
                    subscriptionResponse.value.subscription_tier != "inactive" ? "subscription" : "free"
                }
            },
            resources: modulesResponse.value.map(m => ({
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

        if (!accessResponse.success) throw new Error("Check multiple resources server action was not successful!");
        console.log(accessResponse.value.map(obj => ({id: obj.resourceId, actions: JSON.stringify(obj.actions)})));
        return modulesResponse.value.sort((a, b) => a.order_number - b.order_number).map((module, index) => {
            return <ModuleBox
                key={index}
                module={module}
                moduleAllowed={accessResponse.value.some((obj) => obj.resourceId === module.id && obj.actions["select"] === "EFFECT_ALLOW")}
            />
        })
    } catch(e) {
        console.error(e);
        return <PrimaryErrorMessage
            Icon={IoCloudOffline}
            title="Възникна грешка"
            message="Модулите не бяха заредени. Моля, опитай отново!"
            className="col-span-full max-w-[20rem] mx-auto"
        />
    }
}