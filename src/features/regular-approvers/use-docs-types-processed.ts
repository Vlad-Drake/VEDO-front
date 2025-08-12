import { useDocTypes } from "@/shared/model/use-doc-types";
import { useMemo } from "react";

type DocId = number;

type DocTypeModel = {
    id: DocId;
    docType: string;
    pref: string;
}

type DocsTypesRecord = Record<DocId, DocTypeModel>;

export function useDocTypesProcessed() {
    const docsTypes = useDocTypes();

    const docsTypesProcessed = useMemo(() =>
        docsTypes.docTypes.data?.list.reduce((acc, docType) => {
            acc[docType.id] = docType;
            return acc;
        }, {} as DocsTypesRecord), [docsTypes.docTypes.data])

    return { docsTypesProcessed }
}