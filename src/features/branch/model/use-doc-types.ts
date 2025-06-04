import { rqClient } from "@/shared/api/instance";
import type { ApiSchemas } from "@/shared/api/schema";
import { useRef, useState } from "react";

interface DocTypesModel {
    id: number;
    docType: string;
}
//docTypeParam: string | undefined
export function useDocTypes() {
    //const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
    //const docName = useRef<string>('');

    const docTypes = rqClient.useQuery('get', '/doc-types', {
        /*onSuccess: (data: ApiSchemas['DocTypeListResponse']) => {
            if (docTypeParam && docTypeParam !== 'all' && selectedDocId === null) {
                const item = data?.list.find(item => item.docType === docTypeParam)
                setSelectedDocId(item?.id ?? null);
                docName.current = item?.docType ?? '';
            }
            console.log('here')
        },
        onError: (error: ApiSchemas['Error']) => {
            console.log('Test error', error)
            //docTypes.docTypes.error ? `Ошибка получения кодов документов: ${docTypes.docTypes.error.message
        }*/

    });

    return {
        docTypes,
        //selectedDocId,
        //setSelectedDocId,
        //docName
    }
}