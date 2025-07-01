import { rqClient } from "@/shared/api/instance";

export function useDocInfo(docId: number | null) {
    const docInfo = rqClient.useQuery('get', '/doc-info', {
        params: {
            query: {
                docId: docId || -1,
            }
        }
    },
        {
            enabled: !!docId,
        }
    )

    return docInfo;
}