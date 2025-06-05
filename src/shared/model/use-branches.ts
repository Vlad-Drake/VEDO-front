import { rqClient } from "@/shared/api/instance";

export function useBranches() {
    const branches = rqClient.useQuery('get', '/branches');
    
    return {
        branches,
    };
}