import { useState } from 'react';
import type { ApiSchemas } from '@/shared/api/schema';
import { rqClient } from '@/shared/api/instance';
import { useLoadingPage } from "@/shared/model/loadingPage";

export function useJobTitles() {
    //const navigate = useNavigate();
    const [responseData, setResponseData] = useState<ApiSchemas['JobTitlesResponse'] | null>(null);
    const { loadingPage, loading, error: errorPage, done } = useLoadingPage();
    const jobTitlesMutation = rqClient.useMutation('post', '/jobTitle', {
        /*onSettled() {
            navigate(ROUTES.HOME);
        }*/
        onSuccess(data) {
            //navigate(ROUTES.HOME);
            console.log('response', data, jobTitlesMutation);
            
            setResponseData(data);
        },
        onError(error) {
            console.log('error', error)
            errorPage(error.message);
        }
    });

    const jobTitles = (data: ApiSchemas['JobTitlesRequest']) => {
        jobTitlesMutation.mutate({ body: data });
    }

    const errorMessage = jobTitlesMutation.isError ? jobTitlesMutation.error.message : undefined;

    return {
        jobTitles,
        data: responseData,
        isPending: jobTitlesMutation.isPending,
        errorMessage
    }
}