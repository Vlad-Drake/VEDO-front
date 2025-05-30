import { rqClient } from "@/shared/api/instance";

export function useDocInfo(docId: number | null) {
    const docInfo = rqClient.useQuery('get', '/doc-info', {
        enabled: !!docId,
        params: {
            query: {
                docId: docId || -1,
            }
        }
    })

    return docInfo;
}