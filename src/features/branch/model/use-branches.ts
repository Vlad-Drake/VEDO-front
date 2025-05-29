import { rqClient } from "@/shared/api/instance";
import { useState } from "react";

interface BranchesModel {
    id: number;
    branch: string;
}

export function useBranches() {
    const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
    const [branchesState, setBranchesState] = useState<BranchesModel[]>([]);

    const branches = rqClient.useQuery('get', '/branches');
    
    return {
        selectedBranchId,
        setSelectedBranchId,
        branches,
        branchesState,
        setBranchesState,
    };
}