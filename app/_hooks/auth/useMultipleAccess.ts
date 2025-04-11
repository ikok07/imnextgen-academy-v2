import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {checkMultipleResourcesAccess} from "@/app/actions";
import {CheckResourceOptions} from "@/src/application/services/auth/authorization.service.interface";

export function useMultipleAccess(opts: Partial<CheckResourceOptions> & {enabled?: boolean}) {
    const {data, isLoading} = useErrorQuery({
        queryFn: () => checkMultipleResourcesAccess(opts),
        refetchInterval: 30000,
        enabled: opts.enabled
    });

    const results = data?.success ? data.value : [];

    return {
        results,
        isLoading
    }
}