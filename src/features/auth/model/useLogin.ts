import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routers';
import type { ApiSchemas } from '@/shared/api/schema';
import { rqClient } from '@/shared/api/instance';
import { useSession } from '@/shared/model/session';

export function useLogin() {
    const navigate = useNavigate();

    const session = useSession();
    const loginMutation = rqClient.useMutation('post', '/authorization', {
        /*onSettled() {
            navigate(ROUTES.HOME);
        }*/
        onSuccess(data) {
            session.login(data.accessToken);
            navigate(ROUTES.HOME);
        },
        /*onError(error) {
            
        }*/
    });

    const login = (data: ApiSchemas['LoginRequest']) => {
        loginMutation.mutate({ body: data });
    }

    const errorMessage = loginMutation.isError ? loginMutation.error.message : undefined;

    return {
        login,
        isPending: loginMutation.isPending,
        errorMessage
    }
}