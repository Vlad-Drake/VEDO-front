import { createContext } from "react";
import { useFormBranchNDates } from "../model/use-form-branch-n-dates";

export const FormBranchNDatesContext = createContext<ReturnType<typeof useFormBranchNDates> | null>(null)

export function FormBranchNDatesProvider({ children }: { children: React.ReactNode }) {
    const formBranchNDates = useFormBranchNDates();

    return (
        <FormBranchNDatesContext.Provider value={formBranchNDates}>
            {children}
        </FormBranchNDatesContext.Provider>
    );
}