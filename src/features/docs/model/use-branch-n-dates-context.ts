import { useContext } from "react";
import { FormBranchNDatesContext } from "../ui/form-branch-n-dates-context";

export function useBranchNDatesContext() {
    const context = useContext(FormBranchNDatesContext);

    if (!context) {
        throw new Error("useBranchNDatesContext must be used within a BranchNDatesContextProvider");
    }

    return {
        resetBranchId: context.resetBranchId,
    }
}