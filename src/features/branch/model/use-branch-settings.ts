import { rqClient } from "@/shared/api/instance";
import { useState } from "react";

interface SignerModel {
    row: number;
    jobTitleId: number | null;
    email: string;
    docTypes: DocTypeModel[];
}
export interface DocTypeModel {
    id: number;//docId
    name: string;
    checked: boolean;
}
interface SettingsModel {
    row: number;
    typeId: number | null;
    code: string;
}

export function useBranchSettings(
    docTypes: {
        id: number,
        docType: string
    }[] | undefined,
    branchId: number | null
) {
    const [signers, setSigners] = useState<SignerModel[]>([]);
    const [settings, setSettings] = useState<SettingsModel[]>([]);

    //mutation
    //const branchSettingsMutation = rqClient.useMutation('post', '');

    const branchSettings = rqClient.useQuery('get', '/branch-settings', {
        enabled: !!branchId, // ВАЖНО: только если branch есть
        params: {
            query: {
                branchId: branchId || -1,
            },
        },
    });

    if(branchSettings.data && docTypes) {
        if(!(signers.length && settings.length)) {
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
        
    }


    return {
        branchSettings,
        signers,
        setSigners,
        settings,
        setSettings
    }
}