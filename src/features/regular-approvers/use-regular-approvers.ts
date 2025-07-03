import { rqClient } from "@/shared/api/instance";
import { queryClient } from "@/shared/api/query-client";
import type { ApiSchemas } from "@/shared/api/schema";

export function useRegularApprovers() {

    const data = rqClient.useQuery('get', '/regular-approvers');

    const createRegularApproverMutation = rqClient.useMutation("post", "/create-regular-approver", {
        onSuccess: () => {

            console.log('test')
            queryClient.invalidateQueries({
                queryKey: ["get", "/regular-approvers"]
            })
        },
        onError: (err) => {
            console.error(' onError', err);
        }
    });
    const createRegularApprover = (data: ApiSchemas["CreateRegularApproverRequest"]) => {
        createRegularApproverMutation.mutate({ body: data })
    }

    return {
        regularApprovers: data.data?.list,
        isPending: data.isPending,
        createRegularApprover,
        error: { error: data.error, isError: data.isError },
    };
}
