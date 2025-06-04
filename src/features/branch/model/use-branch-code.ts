import { rqClient } from "@/shared/api/instance";
import { useState } from "react";

interface BranchCodeModel {
    id: number;
    code: string;
}

export function useBranchCode() {
    const branchCode = rqClient.useQuery('get', '/branch-codes');

    return {
        branchCode,
    }
}