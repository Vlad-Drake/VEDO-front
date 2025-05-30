import { rqClient } from "@/shared/api/instance";

export function useDocs() {
    const docsMutation = rqClient.useMutation('get', '/docs', {
        onSuccess(data) {
            console.log(data)
        }
    });

    const getDocs = (docId: number, branchId: number, dateStart: string, dateEnd: string) => {
        docsMutation.mutate({
            params: {
                query: {
                    docId,
                    branchId,
                    dateStart,
                    dateEnd,
                }
            }
        });
    }
    return {
        getDocs,
        docsMutation
    }
}