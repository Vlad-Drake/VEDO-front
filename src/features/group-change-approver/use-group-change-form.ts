import { useState } from "react";

export type BranchModel = {
    id: string | number,
    name: string,
    checked: boolean,
}

export function useGroupChangeForm(branchesCache: {
    id: number;
    name: string;
    checked: boolean;
}[]) {
    const [selectedJobTitleId, setSelectedJobTitleId] = useState<number | null>(null);
    const [email, setEmail] = useState<string>('');
    const [branchesState, setBranchesState] = useState<BranchModel[]>([]);

    const branches = Array.from(
        new Map(
            [...branchesCache, ...branchesState].map(item => [item.id, item])
        ).values()
    );

    return {
        branches,
        selectedJobTitleId, setSelectedJobTitleId,
        email, setEmail,
        setBranchesState,
    }
}