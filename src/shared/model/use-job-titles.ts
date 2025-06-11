import { rqClient } from '@/shared/api/instance';

export function useJobTitles() {
    const jobTitles = rqClient.useQuery('get', '/jobTitle');

    return {
        jobTitles,
    };
}