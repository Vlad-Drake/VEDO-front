import { rqClient } from "@/shared/api/instance";
import { useState } from "react";

interface BranchesModel {
    id: number;
    branch: string;
}

export function useBranches() {
    
    const [branchesState, setBranchesState] = useState<BranchesModel[]>([]);

    const branches = rqClient.useQuery('get', '/branches');
    
    return {

        branches,
        branchesState,
        setBranchesState,
    };
}