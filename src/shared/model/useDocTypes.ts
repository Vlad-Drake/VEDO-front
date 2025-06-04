import { rqClient } from "@/shared/api/instance";

export function useDocTypes() {
    const docTypes = rqClient.useQuery('get', '/doc-types');
    return {
        docTypes,
    }
}