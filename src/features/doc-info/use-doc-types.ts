import { useDocTypes } from "@/shared/model/use-doc-types";
import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export function useDocTypesWithState() {
    const { doctype: docTypeParam } = useParams<"doctype">();
    const [selectedDocIdState, setSelectedDocId] = useState<number | null>(null);
    const docName = useRef<string>('');
    const types = useDocTypes();

    if (types.docTypes.error) {
        console.log('error')
    }

    const docType = useMemo(() =>
        types.docTypes.data?.list.find(item => item.docType === docTypeParam),
        [types.docTypes.data]);

    docName.current = docName.current === '' ? docType?.docType ?? '' : docName.current;
    const selectedDocId = selectedDocIdState ?? docType?.id ?? null;

    return {
        data: types.docTypes.data,
        selectedDocId,
        setSelectedDocId,
        docName,
        isPending: types.docTypes.isPending,
    }
}