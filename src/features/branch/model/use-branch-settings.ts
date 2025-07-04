import { rqClient } from "@/shared/api/instance";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import type { DocTypesRecord } from "./use-doc-types";
import type { RowsRecord } from "../ui/table-control-ui";
import { queryClient } from "@/shared/api/query-client";


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

    const branchSignersMutation = rqClient.useMutation('put', '/update-branch-signers');

    function updateBranchSigners(changedRows: RowsRecord, resetCacheTableControlUI: () => void) {
        if (!branchId) return;

        const dataReqiest = Object.entries(changedRows).map(([key, row]) => ({
            row: +key,
            jobTitleId: signers[row.objId].jobTitleId,
            email: signers[row.objId].email,
            docTypes: docsSigners[row.objId],
        }));

        branchSignersMutation.mutate({
            body: { branchId: branchId, signers: dataReqiest }
        }, {
            onSuccess: () => {
                setSignersState({});
                setDocsSignersState({});
                resetCacheTableControlUI();
                queryClient.invalidateQueries({
                    queryKey: ["get", "/branch-signers"]
                })
            }
        })
    }

    const branchSettingsMutation = rqClient.useMutation('put', '/update-branch-settings');

    function updateBranchSettings(changedRows: RowsRecord, resetCacheTableControlUI: () => void) {
        if (!branchId) return;
        const dataReqiest = Object.entries(changedRows).map(([key, row]) => ({
            row: +key,
            typeId: settings[row.objId].typeId,
            code: settings[row.objId].code
        }));

        branchSettingsMutation.mutate({
            body: { branchId: branchId, settings: dataReqiest }
        }, {
            onSuccess: () => {
                setSettingsState({});
                resetCacheTableControlUI();
                queryClient.invalidateQueries({
                    queryKey: ["get", "/branch-settings"]
                })
            }
        })
    }

    const branchSigners = rqClient.useQuery('get', '/branch-signers', {
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
    const processedBranchSigners = useMemo(() => ({
        signers: branchSigners.data?.signers.map(signer => ({ ...signer, id: nanoid() })),
    }), [branchSigners.data])
    const processedBranchSettings = useMemo(() => ({
        settings: branchSettings.data?.settings.map(setting => ({ ...setting, id: nanoid() })),
    }), [branchSettings.data])

    const rowSignersCache = useMemo(() => processedBranchSigners.signers?.reduce((acc, signer) => {
        const prevRow = acc[signer.row - 1] ? signer.row - 1 : null;
        acc[signer.row] = { prevRow, objId: signer.id, nextRow: null };
        if (signer.row - 1 !== 0) {
            acc[signer.row - 1] = { ...acc[signer.row - 1], nextRow: signer.row };
        }
        return acc;
    }, {} as RowsRecord), [processedBranchSigners]);

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
        return processedBranchSigners.signers?.reduce((acc, signer) => {
            acc[signer.id] = signer;
            return acc;
        }, {} as SignersRecord);
    }, [processedBranchSigners]);

    const signers = { ...signersCache, ...signersState };

    const docsSignersCache = useMemo(() => {
        return processedBranchSigners.signers?.reduce((acc, signer) => {
            acc[signer.id] = acc[signer.id] ?? [];

            for (const setting of signer.docTypes) {
                acc[signer.id].push({ ...setting, name: docTypesRecord?.[setting.docId].docType ?? '' });
            }
            return acc;
        }, {} as DocsSignerRecord)
    }, [processedBranchSigners, docTypesRecord]);

    const docsSigners = { ...docsSignersCache, ...docsSignersState };

    const settingsCache = useMemo(() => {
        return processedBranchSettings.settings?.reduce((acc, setting) => {
            acc[setting.id] = setting;
            return acc;
        }, {} as SettingsRecord);
    }, [processedBranchSettings]);

    const settings = { ...settingsCache, ...settingsState };

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
        settingsChanged,
        updateBranchSigners,
        updateBranchSettings,
        errorUpdateSigners: {
            code: branchSignersMutation.error?.code,
            message: branchSignersMutation.error?.message,
            isError: branchSignersMutation.isError,
        },
        errorUpdateSettings: {
            code: branchSettingsMutation.error?.code,
            message: branchSettingsMutation.error?.message,
            isError: branchSettingsMutation.isError,
        }
    }
}