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
    //docTypes: DocTypeModel[];
}

export type DocTypeModel = {
    //idSigner: SignerId,
    docId: number;//docId
    name: string;
    checked: boolean;
}
export type RowSetting = number;
type SettingsModel = {
    row: RowSetting;
    typeId: number | null;
    code: string;
}

//export type SignersDocsRecord = Record<Row, DocTypeModel[]>;

export type SignersRecord = Record<RowSigner, SignerModel>;
export type DocsSignerRecord = Record<SignerId, DocTypeModel[]>;

export type SettingsRecord = Record<RowSetting, SettingsModel>;

export function useBranchSettings(
    docTypesRecord: DocTypesRecord | undefined,
    docTypes: { id: number, docType: string }[] | undefined,
    branchId: number | null
) {
    const [signersState, setSignersState] = useState<SignersRecord>({});
    const [docsSignersState, setDocsSignersState] = useState<DocsSignerRecord>({});
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

    const signersCache = useMemo(() => {
        //return processedBranchSettings.signers?.map(signer => signer as SignerModel)
        return processedBranchSettings.signers?.reduce((acc, signer) => {
            acc[signer.row] = signer;
            return acc;
        }, {} as SignersRecord);
    }, [processedBranchSettings]);

    const signers = { ...signersCache, ...signersState };

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

    const createSigner = (signers?: SignersRecord) => {
        if (!signers || !docTypes) return;

        const signersSortArr = Object.values(signers).sort((a, b) => a.row - b.row);
        const newRow = signersSortArr[signersSortArr.length - 1].row + 1;
        const newId = nanoid();
        setSigners({
            [newRow]: {
                id: newId,
                row: newRow,
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

    const deleteSigner = (currentRow: number, signer?: SignersRecord): void => {
        if (!signer) return;
        /*setSignersState(prev => {
            const keys = Object.keys(signer);
            const key = keys[currentRow];
            if (!key) return signer;
            const { [key]: _, ...rest } = signer;
            return rest;
        });*/
        /*setDocsSignersState(prev => ({
            ...prev,
            ...docsSigner
        }))*/
    };

    const createSetting = (settings?: SettingsRecord) => {
        if (!settings || !docCode) return;

        const signersSortArr = Object.values(signers).sort((a, b) => a.row - b.row);
        const newRow = signersSortArr[signersSortArr.length - 1].row + 1;
        const newId = nanoid();
        setSigners({
            [newRow]: {
                id: newId,
                row: newRow,
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

    const deleteSetting = (currentRow: number, setting?: SettingsRecord): void => {
        if (!setting) return;
        /*setSettingsState(prev => {
            ///
        });*/
    }

    return {
        isPending: branchSettings.isPending,
        signers,
        docsSigners,
        setDocsSigner,
        setSigners,
        settings,
        createSigner,
        deleteSigner
    }
}