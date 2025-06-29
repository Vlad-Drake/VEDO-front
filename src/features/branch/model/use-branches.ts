import { rqClient } from "@/shared/api/instance";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

/*interface BranchesModel {
    id: number;
    branch: string;
}*/

export function useBranchesWithState() {
    const { branch: branchParam } = useParams<"branch">();
    const [selectedBranchIdState, setSelectedBranchId] = useState<number | null>(null);

    const branches = rqClient.useQuery('get', '/branches');

    const branch = useMemo(() => branches.data?.list.find(item => item.branch === branchParam), [branches.data])
    const selectedBranchId = selectedBranchIdState ?? branch?.id ?? null;

    return {
        branches,
        isPendingBranch: branches.isPending,
        selectedBranchId,
        setSelectedBranchId
    };
}