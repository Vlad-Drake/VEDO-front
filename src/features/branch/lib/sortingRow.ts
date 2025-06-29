export const moveRowUp = <T extends { row: number }>(row: number, state: T[]): T => {
    const index = state.findIndex((sign) => sign.row === row);
    if (index > 0) {
        const newState = [...state];

        const currentRow = newState[index];
        const prevRow = newState[index - 1];

        newState[index] = prevRow;
        newState[index - 1] = currentRow;

        return newState;
    } else {
        return state;
    }
};
export const moveRowDown = <T extends { row: number }>(row: number, state: T[]): T => {
    const index = state.findIndex((sign) => sign.row === row);
    if (index < state.length - 1) {
        const newState = [...state];

        const currentRow = newState[index];
        const prevRow = newState[index + 1];

        newState[index] = prevRow;
        newState[index + 1] = currentRow;

        return newState;
    } else {
        return state;
    }
};
export const deleteRow = <T extends { row: number }>(row: number, state: T[]): T => {
    return state.filter((sign) => sign.row !== row);
};
export const addRow = <T extends { row: number }>(state: T[], newRowData: Omit<T, 'row'>): T => {
    let maxRow = 1;
    if (state.length > 0) {
        maxRow = Math.max(...state.map(item => item.row)) + 1;
    }
    const newRow: T = { row: maxRow, ...newRowData } as T;
    return [...state, newRow];
}