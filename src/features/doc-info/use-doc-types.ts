import { useDocTypes } from "@/shared/model/use-doc-types";
import { useRef, useState } from "react";

export function useDocTypesWithState(docTypeParam: string | undefined) {
    const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
    const docName = useRef<string>('');
    const types = useDocTypes();

    if (types.docTypes.data) {
        //console.log('data', docTypeParam)
        if (docTypeParam && docTypeParam !== 'all' && selectedDocId === null) {
            const item = types.docTypes.data?.list.find(item => item.docType === docTypeParam)
            //console.log(item?.id)
            setSelectedDocId(item?.id ?? null);
            docName.current = item?.docType ?? '';
        }
    }
    if (types.docTypes.error) {
        console.log('error')
    }

    return {
        data: types.docTypes.data,
        selectedDocId,
        setSelectedDocId,
        docName
    }
}