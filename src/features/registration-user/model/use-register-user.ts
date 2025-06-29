//import { useNavigate } from 'react-router-dom';
//import { ROUTES } from '@/shared/model/routers';
import type { ApiSchemas } from "@/shared/api/schema";
import { rqClient } from "@/shared/api/instance";

export function useRegisterUser(resetForm: () => void) {
  //const navigate = useNavigate();

  const registerUserMutation = rqClient.useMutation("post", "/registration", {
    /*onSettled() {
            navigate(ROUTES.HOME);
        }*/
    onSuccess() {
      //navigate(ROUTES.HOME);
      resetForm();
    },
    /*onError(error) {
            
        }*/
  });

  const registerUserQuery = (data: ApiSchemas["RegistrationRequest"]) => {
    registerUserMutation.mutate({ body: data });
  };

  const errorMessage = registerUserMutation.isError
    ? registerUserMutation.error.message
    : undefined;

  return {
    registerUserQuery,
    isPending: registerUserMutation.isPending,
    errorMessage,
  };
}
