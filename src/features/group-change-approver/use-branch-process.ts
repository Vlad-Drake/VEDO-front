import { useBranches } from "@/shared/model/use-branches";
import { useMemo } from "react";

export function useBranchProcess() {
    const branchesRequest = useBranches();

    const branches = useMemo(() =>
        (branchesRequest.branches.data?.list ?? []).map(item => ({
            id: item.id,
            name: item.branch,
            checked: false,
        })), [branchesRequest.branches])

    return {
        branches,
        isPending: branchesRequest.branches.isPending,
    }
}