import { rqClient } from '@/shared/api/instance';
import { useState } from 'react';



export function useJobTitles() {
    //const [jobTitlesState, setJobTitlesState] = useState<JobTitleModel[]>([]);
    const jobTitles = rqClient.useQuery('get', '/jobTitle');

    return {
        jobTitles,
        //jobTitlesState,
        //setJobTitlesState,
    };
}