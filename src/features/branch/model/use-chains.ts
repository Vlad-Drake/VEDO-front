import { rqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";

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

    function updateChain(chain: ApiSchemas['ChainsItem']) {

    }

    return {
        data: chains.data?.list,
        isPending: chains.isPending,
        updateChain,
    };
}