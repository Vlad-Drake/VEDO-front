//import { ROUTES } from "@/shared/model/routers";
//import { useSession } from "@/shared/model/session";
import { /*Navigate, */Outlet } from "react-router-dom";

export function ProtectedRoute() {
  //const { session } = useSession();
  /*if(!session) {
        return <Navigate to={ROUTES.LOGIN}/>
    }*/

  return <Outlet />;
}
