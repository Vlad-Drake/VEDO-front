import { rqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import { useState } from "react";

export function useChains(branchId: number | null) {
    const [docChains, setDocChains] = useState<ApiSchemas["ChainsResponse"]["list"] | null>(null);

    const chains = rqClient.useQuery('get', '/chains', {
        queryOptions: {
            enabled: branchId != undefined && branchId != null,
        },
        params: {
            query: {
                branchId: branchId || -1,
            },
        },
    });

    if (chains.data?.list && !docChains) {
        setDocChains(chains.data.list);
    }

    return {
        docChains
    };
}