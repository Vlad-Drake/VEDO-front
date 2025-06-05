import { rqClient } from "@/shared/api/instance";

export function useBranchCode() {
    const branchCode = rqClient.useQuery('get', '/branch-codes');

    return {
        branchCode,
    }
}