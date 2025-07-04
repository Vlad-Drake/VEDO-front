import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import styles from './table-control-ui.module.scss';
import { nanoid } from "nanoid";
import { TablesButtons } from "./tables-btns";
import { SkeletonKit } from "@/shared/ui/skeleton-kit";

export type Row = number;

type PrevRow = number | null;
type ObjId = string;
type NextRow = number | null;
export type RowType = {
    prevRow: PrevRow,
    objId: ObjId,
    nextRow: NextRow,
};
export type RowsRecord = Record<Row, RowType>;

const removeRowRecord = (rows: RowsRecord, currentRow: number): RowsRecord => {
    const copy = { ...rows };

    if (!copy[currentRow]) {
        return rows;
    }
    if (copy[currentRow].prevRow) {
        copy[copy[currentRow].prevRow].nextRow = copy[currentRow].nextRow ?? null;
    }
    if (copy[currentRow].nextRow) {
        copy[copy[currentRow].nextRow].prevRow = copy[currentRow].prevRow ?? null;
    }

    delete copy[currentRow];

    return copy;
};
type CreateObjectFn = (id: string) => void;
export function TableControlUI({
    children,
    rowsCache,
    createObject,
    isPending,
    addText,
    saveBtn,
}: {
    children: (id: string) => React.ReactNode,
    rowsCache?: RowsRecord,
    createObject?: CreateObjectFn,
    isPending: boolean,
    addText: string,
    saveBtn: (changed: boolean, rows: RowsRecord, resetCache: () => void) => React.ReactNode,
}) {
    const [rowsState, setRowsState] = useState<RowsRecord>({});
    const [removedRows, setRemovedRows] = useState<Row[]>([]);

    const rows = useMemo(() => {
        return removedRows.reduce(removeRowRecord, {
            ...rowsCache,
            ...rowsState,
        });
    }, [rowsCache, rowsState, removedRows]);

    const rowsLength = useMemo(() => {
        return Object.keys({
            ...rowsCache,
            ...rowsState,
        }).length
    }, [rows]);

    const rowsLastRow = useMemo(() => {
        const sort = Object.keys(rows);//.sort((a, b) => +a - +b);
        return +sort[sort.length - 1];
    }, [rows]);

    const deleteRow = (row: number): void => {
        setRemovedRows(prev => [...prev, row]);
    };

    const moveRowUp = (currentRow: number) => {
        const prevRow = rows[currentRow].prevRow;
        if (prevRow) {
            const prevObj = rows[prevRow].objId
            const currentObj = rows[currentRow].objId;

            setRowsState(prev => ({
                ...prev,
                [prevRow]: { ...rows[prevRow], objId: currentObj },
                [currentRow]: { ...rows[currentRow], objId: prevObj }
            }));
        }
        return;
    };

    const createRow = () => {
        if (!rows || !createObject) return;
        const newRow = rowsLength + 1;
        const newId = nanoid();
        const prevRow = isNaN(rowsLastRow) ? null : rowsLastRow;
        const prevRowSigner = isNaN(rowsLastRow) ? null : { [rowsLastRow]: { ...rows[rowsLastRow], nextRow: newRow } };

        const newRowSigner = { [newRow]: { prevRow, objId: newId, nextRow: null } };


        setRowsState(prev => ({
            ...prev,
            ...(prevRowSigner ?? {}),
            ...newRowSigner,
        }));
        createObject(newId);
    }

    const moveRowDown = (currentRow: number) => {
        const nextRow = rows[currentRow].nextRow;
        if (nextRow) {
            const prevObj = rows[nextRow].objId
            const currentObj = rows[currentRow].objId;

            setRowsState(prev => ({
                ...prev,
                [nextRow]: { ...rows[nextRow], objId: currentObj },
                [currentRow]: { ...rows[currentRow], objId: prevObj }
            }));
        }
        return;
    };


    const rowsChanged = useMemo(() => {
        return Object.keys(rowsState).length || Object.keys(removedRows).length ? true : false;
    }, [rowsState, removedRows])

    const resetCache = () => {
        setRowsState({});
        setRemovedRows([]);
    }

    return (
        <>
            {!isPending &&
                <AnimatePresence>
                    {rows && Object.entries(rows)
                        //.sort((a, b) => +a[0] - +b[0])
                        .map(row =>
                            <motion.div
                                key={row[1].objId}
                                layout
                                initial={{ opacity: 0, x: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.3 }}
                                className={styles["list"]}
                            >
                                {children(row[1].objId)}

                                <TablesButtons
                                    clickTop={() => moveRowUp(+row[0])}
                                    clickDown={() => moveRowDown(+row[0])}
                                    clickDelete={() => deleteRow(+row[0])}
                                />

                            </motion.div>
                        )}
                    <motion.div layout className={styles["add-row"]} key="plus">
                        <p>{addText}</p>
                        <button
                            onClick={createRow}
                        >
                            ✚
                        </button>
                    </motion.div>
                </AnimatePresence>}
            {
                isPending &&
                [...Array(2)].map((_, index) =>
                    <div key={index} className={styles["list"]}>
                        <SkeletonKit type='rect' />
                        <SkeletonKit type='rect' />
                        <SkeletonKit type='rect' />
                    </div>
                )
            }
            {saveBtn(rowsChanged, rows, resetCache)}
        </>
    );
}