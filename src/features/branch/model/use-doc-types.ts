import { rqClient } from "@/shared/api/instance";
import { useState } from "react";

interface DocTypesModel {
    id: number;
    docType: string;
}

export function useDocTypes() {
    const [docTypesState, setDocTypesState] = useState<DocTypesModel[]>([]);
    const docTypes = rqClient.useQuery('get', '/doc-types');

    return {
        docTypes,
        docTypesState,
        setDocTypesState
    }
}