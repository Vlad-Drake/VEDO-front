export const moveRowUp = <T extends { row: number }>(currentRow: number, signers: Record<number, T>): Record<number, T> | undefined => {
    if (signers[currentRow - 1]) {
        const currentObj = signers[currentRow];
        const nextObj = signers[currentRow - 1];

        return {
            [currentRow - 1]: { ...currentObj, row: currentObj.row - 1 },
            [currentRow]: { ...nextObj, row: currentRow }
        };
    }
    return;
};
export const moveRowDown = <T extends { row: number }>(currentRow: number, signers: Record<number, T>): Record<number, T> | undefined => {
    if (signers[currentRow + 1]) {
        const currentObj = signers[currentRow];
        const prevObj = signers[currentRow + 1];

        return {
            [currentRow + 1]: { ...currentObj, row: currentObj.row + 1 },
            [currentRow]: { ...prevObj, row: currentRow }
        };
    }
    return;
};
/*export const deleteRow = (currentRow: number, signers: SignersRecord): SignersRecord | undefined => {
    return state.filter((sign) => sign.row !== row);
};*/
/*export const addRow = (signers: SignersRecord | undefined): SignersRecord | undefined => {
    if(!signers) return;
    const signersSortArr = Object.values(signers).sort((a,b) => a.row - b.row);
    const newRow = signersSortArr[signersSortArr.length-1].row + 1;
    return {
        [newRow]: {
            id: nanoid(),
            row: newRow,
            jobTitleId: null,
            email: '',
        }
    };
}*/