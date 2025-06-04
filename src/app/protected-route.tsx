//import { ROUTES } from "@/shared/model/routers";
//import { useSession } from "@/shared/model/session";
import { useLoadingPage } from "@/shared/model/loadingPage";
import { /*Navigate, */Outlet } from "react-router-dom";

export function ProtectedRoute() {
    //const { session } = useSession();
    //const {reset} = useLoadingPage();
    /*if(!session) {
            return <Navigate to={ROUTES.LOGIN}/>
    }*/
    
    
    //reset();
    return <Outlet />;
}
