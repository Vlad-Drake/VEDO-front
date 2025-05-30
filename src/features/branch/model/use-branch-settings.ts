import { rqClient } from "@/shared/api/instance";

export function useBranchSettings(branchId: number | null) {
    const branchSettings = rqClient.useQuery('get', '/branch-settings', {
        enabled: !!branchId, // ВАЖНО: только если branch есть
        params: {
            query: {
                branchId: branchId || -1,
            },
        },
    });

    return branchSettings
}