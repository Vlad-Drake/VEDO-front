import { rqClient } from "@/shared/api/instance";

export function useRegularApprovers() {

    const data = rqClient.useQuery('get', '/regular-approvers');

    const createRegularApprover = (pref: string, email: string) => {

    }

    return {
        regularApprovers: data.data?.list,
        isPending: data.isPending,
        createRegularApprover,
    };
}