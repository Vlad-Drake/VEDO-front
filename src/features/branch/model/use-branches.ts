import { rqClient } from "@/shared/api/instance";
import { useState } from "react";

interface BranchesModel {
    id: number;
    branch: string;
}

export function useBranches() {
    const branches = rqClient.useQuery('get', '/branches');
    
    return {
        branches,
    };
}