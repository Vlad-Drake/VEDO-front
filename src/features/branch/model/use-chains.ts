import { rqClient } from "@/shared/api/instance";

export function useChains(branchId: number | null) {
    const chains = rqClient.useQuery('get', '/chains', {
        params: {
            query: {
                branchId: branchId ?? -1,
            },
        },
    },
    {//queryOptions
        enabled: branchId != undefined && branchId != null,
    },
);

    return {
        data: chains.data?.list,
        isPending: chains.isPending,
    };
}