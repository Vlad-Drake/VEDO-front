import { rqClient } from "@/shared/api/instance";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import type { DocTypesRecord } from "./use-doc-types";
import type { RowsRecord } from "../ui/table-control-ui";


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
    id: string,
    row: RowSetting;
    typeId: number | null;
    code: string;
}

export type DocsSignerRecord = Record<SignerId, DocTypeModel[]>;

export type SettingsRecord = Record<SettingId, SettingsModel>;

export type RowSettingsRecord = Record<RowSetting, SettingId>
export function useBranchSettings(
    docTypesRecord: DocTypesRecord | undefined,
    docTypes: { id: number, docType: string }[] | undefined,
    branchId: number | null
) {
    const [signersState, setSignersState] = useState<SignersRecord>({});
    const [docsSignersState, setDocsSignersState] = useState<DocsSignerRecord>({});

    const [settingsState, setSettingsState] = useState<SettingsRecord>({});

    const branchSettings = rqClient.useQuery('get', '/branch-settings', {
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
    }, {} as RowsRecord), [processedBranchSettings]);

    const rowSettingsCache = useMemo(() => processedBranchSettings.settings?.reduce((acc, setting) => {
        const prevRow = acc[setting.row - 1] ? setting.row - 1 : null;
        acc[setting.row] = { prevRow, objId: setting.id, nextRow: null };
        if (setting.row - 1 !== 0) {
            acc[setting.row - 1] = { ...acc[setting.row - 1], nextRow: setting.row };
        }
        return acc;
    }, {} as RowsRecord), [processedBranchSettings]);

    const signersCache = useMemo(() => {
        //return processedBranchSettings.signers?.map(signer => signer as SignerModel)
        return processedBranchSettings.signers?.reduce((acc, signer) => {
            acc[signer.id] = signer;
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
    }, [processedBranchSettings, docTypesRecord]);

    const docsSigners = { ...docsSignersCache, ...docsSignersState };

    const settingsCache = useMemo(() => {
        return processedBranchSettings.settings?.reduce((acc, setting) => {
            acc[setting.id] = setting;
            return acc;
        }, {} as SettingsRecord);
    }, [processedBranchSettings]);

    const settings = { ...settingsCache, ...settingsState };

    //mutation
    //const branchSettingsMutation = rqClient.useMutation('post', '');

    const createSigner = (newId: string) => {
        if (!docTypes) return;

        setSignersState(prev => ({
            ...prev,
            [newId]: {
                id: newId,
                row: 1,
                jobTitleId: null,
                email: '',
            }
        }));
        setDocsSignersState(prev => ({
            ...prev,
            [newId]:
                docTypes.map(docType => ({
                    docId: docType.id,
                    name: docType.docType,
                    checked: true,
                })) as DocTypeModel[]
        }));
    }

    const createSetting = (newId: string) => {
        setSettingsState(prev => ({
            ...prev,
            [newId]: {
                id: newId,
                row: 1,
                typeId: null,
                code: '',
            }
        }))
    }

    const signersChanged = useMemo(() => {
        return Object.keys(signersState).length || Object.keys(docsSignersState).length ? true : false;
    }, [signersState, docsSignersState]);
    const settingsChanged = useMemo(() => {
        return Object.keys(settingsState).length ? true : false;
    }, [settingsState])

    return {
        isPending: branchSettings.isPending,
        rowSignersCache,
        rowSettingsCache,
        signers,
        docsSigners,
        settings,
        createSigner,
        createSetting,
        setSignersState,
        setDocsSignersState,
        setSettingsState,
        signersChanged,
        settingsChanged
    }
}