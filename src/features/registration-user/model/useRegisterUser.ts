import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routers';
import type { ApiSchemas } from '@/shared/api/schema';
import { rqClient } from '@/shared/api/instance';

export function useRegisterUser() {
    const navigate = useNavigate();

    const registerUserMutation = rqClient.useMutation('post', '/registration', {
        /*onSettled() {
            navigate(ROUTES.HOME);
        }*/
        onSuccess() {
            //navigate(ROUTES.HOME);
        },
        /*onError(error) {
            
        }*/
    });

    const registerUser = (data: ApiSchemas['RegistrationRequest']) => {
        registerUserMutation.mutate({ body: data });
    }

    const errorMessage = registerUserMutation.isError ? registerUserMutation.error.message : undefined;

    return {
        registerUser,
        isPending: registerUserMutation.isPending,
        errorMessage
    }
}