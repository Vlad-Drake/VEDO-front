import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routers';
import type { ApiSchemas } from '@/shared/api/schema';
import { rqClient } from '@/shared/api/instance';

export function useLogin() {
    const navigate = useNavigate();

    const loginMutation = rqClient.useMutation('post', '/authorization', {
        onSettled() {
            navigate(ROUTES.HOME);
        }
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