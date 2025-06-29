import { useDocTypes } from "@/shared/model/use-doc-types";
import { useMemo } from "react";

export type DocId = number;
export type DocTypesRecord = Record<DocId, { id: DocId, docType: string }>;

export function useDocTypesProcessed() {
    const docTypes = useDocTypes();

    const docsTypesProcessed = useMemo(() => {
        return docTypes.docTypes.data?.list.reduce((acc, docType) => {
            acc[docType.id] = docType;
            return acc;
        }, {} as DocTypesRecord);
    }, [docTypes.docTypes.data])

    return {
        docTypes: docTypes.docTypes.data?.list,
        docTypesRecord: docsTypesProcessed,
        isPending: docTypes.docTypes.isPending,
    };
}