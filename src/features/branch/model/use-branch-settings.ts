import { rqClient } from "@/shared/api/instance";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import type { DocTypesRecord } from "./use-doc-types";


export type SignerId = string;
export type RowSigner = number;

export type SignerModel = {
    id: SignerId;
    row: RowSigner;
    jobTitleId: number | null;
    email: string;
}
export type SignersRecord = Record<SignerId, SignerModel>;

export type DocTypeModel = {
    //idSigner: SignerId,
    docId: number;//docId
    name: string;
    checked: boolean;
}
export type RowSetting = number;
export type SettingId = string;
type SettingsModel = {
    row: RowSetting;
    typeId: number | null;
    code: string;
}

//export type SignersDocsRecord = Record<Row, DocTypeModel[]>;


export type DocsSignerRecord = Record<SignerId, DocTypeModel[]>;

export type SettingsRecord = Record<RowSetting, SettingsModel>;

const removeRecord = <T>(signer: Record<string | number, T>, currentRow: string | number): Record<string | number, T> => {
    const copy = { ...signer };

    if (!copy[currentRow]) {
        return signer;
    }

    delete copy[currentRow];

    return copy;
};

const removeRowRecord = (rows: RowSignersRecord, currentRow: number): RowSignersRecord => {
    const copy = { ...rows };

    if (!copy[currentRow]) {
        return rows;
    }
    if (copy[currentRow - 1]) {
        copy[currentRow - 1].nextRow = copy[currentRow + 1] ? currentRow + 1 : null;
    }
    if (copy[currentRow + 1]) {
        copy[currentRow + 1].prevRow = copy[currentRow - 1] ? currentRow - 1 : null;
    }

    delete copy[currentRow];

    return copy;
};
/*const removeRowRecord = (rows: Record<number, string>, id: string): Record<number, string> => {
    return Object.fromEntries(
        Object.entries(rows).filter(([_, value]) => value !== id)
    );
};*/

const rerow = (rows: Record<number, string>): Record<number, string> => {
    return Object.values(rows).reduce((acc, row, index) => {
        acc[index + 1] = row
        return acc;
    }, {} as Record<number, string>)
}
type PrevRow = number | null;
type ObjId = string;
type NextRow = number | null;
type RowType = {
    prevRow: PrevRow,
    objId: ObjId,
    nextRow: NextRow,
};
export type RowSignersRecord = Record<RowSigner, RowType>;
export type RowSettingsRecord = Record<RowSetting, SettingId>
export function useBranchSettings(
    docTypesRecord: DocTypesRecord | undefined,
    docTypes: { id: number, docType: string }[] | undefined,
    branchId: number | null
) {
    const [rowSignersState, setRowSignersState] = useState<RowSignersRecord>({});
    const [removedRowSigners, setRemovedRowSigners] = useState<RowSigner[]>([]);

    const [signersState, setSignersState] = useState<SignersRecord>({});
    //const [removedSigners, setRemovedSigners] = useState<RowSigner[]>([]);

    const [rowSettingsState, setRowSettingsState] = useState<RowSettingsRecord>({});

    const [docsSignersState, setDocsSignersState] = useState<DocsSignerRecord>({});
    //const [removedDocSigners, setRemovedDocSigners] = useState<SignerId[]>([]);

    const [settingsState, setSettingsState] = useState<SettingsRecord>({});

    const branchSettings = rqClient.useQuery('get', '/branch-settings', {
        enabled: !!branchId, // ВАЖНО: только если branch есть
        params: {
            query: {
                branchId: branchId || -1,
            },
        },
    },
        {//queryOptions
            enabled: branchId != undefined && branchId != null,
        },
    );
    const processedBranchSettings = useMemo(() => ({
        signers: branchSettings.data?.signers.map(signer => ({ ...signer, id: nanoid() })),
        settings: branchSettings.data?.settings.map(setting => ({ ...setting, id: nanoid() })),
    }), [branchSettings.data]);


    const rowSignersCache = useMemo(() => processedBranchSettings.signers?.reduce((acc, signer) => {
        const prevRow = acc[signer.row - 1] ? signer.row - 1 : null;
        acc[signer.row] = { prevRow, objId: signer.id, nextRow: null };
        if (signer.row - 1 !== 0) {
            acc[signer.row - 1] = { ...acc[signer.row - 1], nextRow: signer.row };
        }
        return acc;
    }, {} as RowSignersRecord), [processedBranchSettings]);
    const rowSettingsCache = useMemo(() => processedBranchSettings.settings?.reduce((acc, setting) => {
        acc[setting.row] = setting.id;
        return acc;
    }, {} as RowSettingsRecord), [processedBranchSettings]);

    const rowSigners = useMemo(() => {
        return removedRowSigners.reduce(removeRowRecord, {
            ...rowSignersCache,
            ...rowSignersState,
        });
    }, [rowSignersCache, rowSignersState, removedRowSigners]);
    console.log(rowSigners)
    const rowSignersLength = useMemo(() => {
        return Math.max(Object.keys(rowSignersCache ?? 0).length, Object.keys(rowSignersState).length)
    }, [rowSigners]);
    console.log('rowSignersLength', rowSignersLength)
    const rowSignersLastRow = useMemo(() => {
        const sort = Object.keys(rowSigners).sort((a, b) => +a - +b);
        return +sort[sort.length - 1];
    }, [rowSigners]);
    console.log('rowSignersLastRow', rowSignersLastRow)
    //const rowSigners = { ...rowSignersCache, ...rowSignersState };
    //console.log(rowSigners)
    const rowSettings = { ...rowSettingsCache, ...rowSettingsState };

    const signersCache = useMemo(() => {
        //return processedBranchSettings.signers?.map(signer => signer as SignerModel)
        return processedBranchSettings.signers?.reduce((acc, signer) => {
            acc[signer.id] = signer;
            return acc;
        }, {} as SignersRecord);
    }, [processedBranchSettings]);



    const signers = { ...signersCache, ...signersState };
    console.log(signers);
    /*const signers = useMemo(() => {
        return removedSigners.reduce(removeRecord, {
            ...signersCache,
            ...signersState,
        }
        );
    }, [signersCache, signersState, removedSigners]);*/

    const docsSignersCache = useMemo(() => {
        return processedBranchSettings.signers?.reduce((acc, signer) => {
            acc[signer.id] = acc[signer.id] ?? [];

            for (const setting of signer.docTypes) {
                acc[signer.id].push({ ...setting, name: docTypesRecord?.[setting.docId].docType ?? '' });
            }
            return acc;
        }, {} as DocsSignerRecord)
    }, [processedBranchSettings]);

    const docsSigners = { ...docsSignersCache, ...docsSignersState };
    /*const docsSigners = useMemo(() => {
        return removedDocSigners.reduce(removeRecord, {
            ...docsSignersCache,
            ...docsSignersState,
        });
    }, [docsSignersCache, docsSignersState, removedDocSigners]);*/

    /*const signersSettings = useMemo(() => (branchSettings.data?.signers ?? [])
        .map(signer => ({
            ...signer,
            docTypes: signer.docTypes.map(dt => {
                const found = (docTypes ?? []).find(dts => dts.id === dt.docId);
                return {
                    id: dt.docId,
                    name: found?.docType ?? '',
                    checked: dt.checked,
                };
            })
        })
        ), [branchSettings.data?.signers, docTypes]);
    //console.log(signersSettings)
    const signers = signersState ?? [...signersSettings];*/

    const settingsCache = useMemo(() => {
        return processedBranchSettings.settings?.reduce((acc, setting) => {
            acc[setting.row] = setting;
            return acc;
        }, {} as SettingsRecord);
    }, [processedBranchSettings]);

    const settings = { ...settingsCache, ...settingsState };

    //mutation
    //const branchSettingsMutation = rqClient.useMutation('post', '');

    /*if (branchSettings.data && docTypes) {
        if (!(signers.length && settings.length)) {
            setSigners(branchSettings.data.signers.map(item => ({
                ...item,
                docTypes: item.docTypes.map(dt => {
                    const found = docTypes.find(dts => dts.id === dt.docId);
                    return {
                        id: dt.docId,
                        name: found?.docType ?? '', // если не нашли — пустая строка
                        checked: dt.checked,
                    };
                })
            })));
            setSettings(branchSettings.data.settings);
        }
    
    }*/

    function setSigners(signers?: SignersRecord) {
        if (!signers) return;

        setSignersState(prev => ({
            ...prev,
            ...signers
        }));
    }

    function setDocsSigner(docsSigner?: DocsSignerRecord) {
        if (!docsSigner) return;

        setDocsSignersState(prev => ({
            ...prev,
            ...docsSigner
        }))
    }

    const createSigner = () => {
        if (!rowSigners || !docTypes) return;
        const newRow = rowSignersLength + 1;
        const newId = nanoid();
        const prevRow = isNaN(rowSignersLastRow) ? null : rowSignersLastRow;
        const prevRowSigner = isNaN(rowSignersLastRow) ? null : { [rowSignersLastRow]: { ...rowSigners[rowSignersLastRow], nextRow: newRow } };
        console.log('newRow', newRow);
        console.log('prevRowSigner', prevRowSigner);
        console.log('newObject', { prevRow, objId: newId, nextRow: null })
        setRowSignersState(prev => ({
            ...prev,
            ...(prevRowSigner ?? {}),
            [newRow]: { prevRow, objId: newId, nextRow: null }
        }));
        setSigners({
            [newId]: {
                id: newId,
                row: 1,
                jobTitleId: null,
                email: '',
            }
        });
        setDocsSigner({
            [newId]:
                docTypes.map(docType => ({
                    docId: docType.id,
                    name: docType.docType,
                    checked: true,
                })) as DocTypeModel[]
        });
    }

    const deleteSigner = (row: number): void => {
        setRemovedRowSigners(prev => [...prev, row]);
        //setRemovedSigners((lastState) => [...lastState, currentRow]);
    };


    function setSettings(settings?: SettingsRecord) {
        if (!settings) return;

        setDocsSignersState(prev => ({
            ...prev,
            ...settings
        }))
    }

    const createSetting = (settings?: SettingsRecord) => {
        if (!settings) return;

        const settingsSortArr = Object.values(settings).sort((a, b) => a.row - b.row);
        const newRow = settingsSortArr[settingsSortArr.length - 1].row + 1;
        setSettings({
            [newRow]: {
                row: newRow,
                typeId: null,
                code: '',
            }
        });
    }

    const deleteSetting = (currentRow: number, setting?: SettingsRecord): void => {
        if (!setting) return;
        //setRemovedDocSigners((lastState) => [...lastState, signers[currentRow].id]);
    }

    const moveRowUp = (currentRow: number) => {
        console.log('currentRow', currentRow)
        const prevRow = rowSigners[currentRow].prevRow;
        if (prevRow) {
            const prevObj = rowSigners[prevRow].objId
            const currentObj = rowSigners[currentRow].objId;

            setRowSignersState(prev => ({
                ...prev,
                [prevRow]: { ...rowSigners[prevRow], objId: currentObj },
                [currentRow]: { ...rowSigners[currentRow], objId: prevObj }
            }));
        }
        return;
    };
    const moveRowDown = (currentRow: number) => {
        const nextRow = rowSigners[currentRow].nextRow;
        if (nextRow) {
            const prevObj = rowSigners[nextRow].objId
            const currentObj = rowSigners[currentRow].objId;

            setRowSignersState(prev => ({
                ...prev,
                [nextRow]: { ...rowSigners[nextRow], objId: currentObj },
                [currentRow]: { ...rowSigners[currentRow], objId: prevObj }
            }));
        }
        return;
    };

    return {
        rowSigners,
        rowSettings,
        isPending: branchSettings.isPending,
        signers,
        docsSigners,
        setDocsSigner,
        setSigners,
        settings,
        createSigner,
        deleteSigner,
        deleteSetting,
        createSetting,
        moveRowUp,
        moveRowDown,
    }
}