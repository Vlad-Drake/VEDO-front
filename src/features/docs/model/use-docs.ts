import { rqClient } from "@/shared/api/instance";

export function useDocs(docId: number | null) {
    const docsMutation = rqClient.useMutation('get', '/docs', {
        onSuccess(data) {
            console.log(data)
        }
    });

    const getDocs = (formDocs: { branchId: number, dateStart: string, dateEnd: string }) => {
        if (!(docId)) return;
        docsMutation.mutate({
            params: {
                query: {
                    docId,
                    branchId: formDocs.branchId,
                    dateStart: formDocs.dateStart,
                    dateEnd: formDocs.dateEnd,
                }
            }
        });
    }

    return {
        getDocs,
        docsMutation
    }
}