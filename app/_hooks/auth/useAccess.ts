import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {checkAccess} from "@/app/actions";
import {CheckUserAccessOptions} from "@/src/application/services/auth/authorization.service.interface";

export function useAccess(opts: Partial<CheckUserAccessOptions> & {enabled?: boolean}) {
    const {data, isLoading} = useErrorQuery({
        queryFn: () => checkAccess(opts),
        queryKey: [opts.resource?.kind],
        refetchInterval: 30000,
        enabled: opts.enabled
    });

    return {
        accessGranted: data?.success && data.value,
        isLoading
    }
}