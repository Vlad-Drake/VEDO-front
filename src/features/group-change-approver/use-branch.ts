import { useBranches } from "@/shared/model/use-branches";
import type { ListCheckboxModel } from "@/shared/ui/listCheckboxKit/listCheckboxKit";
import { useState } from "react";

export function useBranchWithState() {
    const [branches, setBranches] = useState<ListCheckboxModel[]>([]);

    const branchesRequest = useBranches();
    //console.log(branchesRequest.branches.data)
    if (branchesRequest.branches.data && branches.length === 0) {
        setBranches((branchesRequest.branches.data.list).map(item => ({
            id: item.id,
            name: item.branch,
            checked: false,
        })));

    }

    return {
        branches,
        setBranches,
    }
}