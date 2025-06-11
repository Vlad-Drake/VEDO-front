import { rqClient } from "@/shared/api/instance";
import { useState } from "react";

/*interface BranchesModel {
    id: number;
    branch: string;
}*/

export function useBranchesWithState(branchParam: string | undefined) {
    const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);

    const branches = rqClient.useQuery('get', '/branches');

    if (branches.data) {
        if (branchParam && branchParam !== 'all' && selectedBranchId === null) {
            const item = branches.data?.list.find(item => item.branch === branchParam)
            setSelectedBranchId(item?.id ?? null);
        }
    }

    return {
        branches,
        selectedBranchId,
        setSelectedBranchId
    };
}