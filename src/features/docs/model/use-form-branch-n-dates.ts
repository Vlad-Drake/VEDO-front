import { useState } from "react";

export function useFormBranchNDates() {
    const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
    const [lastBranchId, setLastBranchId] = useState<number | null>(null);
    const [dateStart, setDateStart] = useState<Date | null>(new Date());
    const [dateEnd, setDateEnd] = useState<Date | null>(new Date());

    const resetBranchId = () => {
        setSelectedBranchId(null);
    }

    return {
        selectedBranchId, setSelectedBranchId,
        lastBranchId, setLastBranchId,
        dateStart, setDateStart,
        dateEnd, setDateEnd,
        resetBranchId
    }
}