import { useDocTypes } from "@/shared/model/use-doc-types";
import { useMemo, useRef, useState } from "react";
import { useBranchNDatesContext } from "./use-branch-n-dates-context";
import { useParams } from "react-router-dom";

export function useDocTypesWithState() {
    const { docstype: docTypeParam } = useParams<"docstype">();
    const [selectedDocIdState, setSelectedDocId] = useState<number | null>(null);
    const docName = useRef<string>('');
    const types = useDocTypes();
    const formBranchNDates = useBranchNDatesContext();

    if (types.docTypes.error) {
        console.log('error docTypes')
    }

    const docTypeId = useMemo(() =>
        types.docTypes.data?.list.find(item => item.docType === docTypeParam),
        [types.docTypes.data]);
    docName.current = docName.current === '' ? docTypeId?.docType ?? '' : docName.current;
    const selectedDocId = selectedDocIdState ?? docTypeId?.id ?? null;

    const changeDocType = (event: string | number) => {
        const newId = Number(event);
        setSelectedDocId(newId);

        // setSelectedBranchId(null);
        formBranchNDates.resetBranchId();
    }

    return {
        data: types.docTypes.data,
        isPending: types.docTypes.isPending,
        selectedDocId,
        setSelectedDocId,
        docName,
        changeDocType
    }
}