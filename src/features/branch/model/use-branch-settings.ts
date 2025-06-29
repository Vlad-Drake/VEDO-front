import { rqClient } from "@/shared/api/instance";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import type { DocTypesRecord } from "./use-doc-types";

export type SignerId = string;

export type SignerModel = {
    id: SignerId;
    row: number;
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

type SettingsModel = {
    row: number;
    typeId: number | null;
    code: string;
}

//export type SignersDocsRecord = Record<Row, DocTypeModel[]>;

export type SignersRecord = Record<SignerId, SignerModel>;
export type DocsSignerRecord = Record<SignerId, DocTypeModel[]>

export function useBranchSettings(
    docTypes: DocTypesRecord | undefined,
    branchId: number | null
) {
    const [signersState, setSigners] = useState<Partial<SignersRecord>>({});
    const [settingsState, setSettings] = useState<SettingsModel[]>([]);

    const branchSettings = rqClient.useQuery('get', '/branch-settings', {
        enabled: !!branchId, // ВАЖНО: только если branch есть
        params: {
            query: {
                branchId: branchId || -1,
            },
        },
    });
    const processedBranchSettings = useMemo(() => ({
        signers: branchSettings.data?.signers.map(signer => ({ ...signer, id: nanoid() })),
        settings: branchSettings.data?.settings.map(setting => ({ ...setting, id: nanoid() })),
    }), [branchSettings.data]);

    const signersCache = useMemo(() => {
        return processedBranchSettings.signers?.map(signer => signer as SignerModel
        )
    }, [processedBranchSettings]);

    const docsSignersCache = useMemo(() => {
        return processedBranchSettings.signers?.reduce((acc, signer) => {
            acc[signer.id] = acc[signer.id] ?? [];

            for (const setting of signer.docTypes) {
                acc[signer.id].push({ ...setting, name: docTypes?.[setting.docId].docType ?? '' });
            }
            return acc;
        }, {} as DocsSignerRecord)
    }, [processedBranchSettings]);

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
    const settings = [...(branchSettings.data?.settings ?? []), ...settingsState];




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


    return {
        isPending: branchSettings.isPending,
        signers: { ...signersCache, ...signersState },
        docsSigners: docsSignersCache,
        setSigners,
        settings,
        setSettings
    }
}