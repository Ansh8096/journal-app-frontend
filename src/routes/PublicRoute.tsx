import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/constants/app/routes";
import { useAuth } from "@/hooks/useAuth";
import FullscreenLoader from "@/components/common/FullscreenLoader";

const PublicRoute = ()=>{

    const {isAuthenticated, loading} = useAuth();

    if(loading) return <FullscreenLoader/> ;

    if(isAuthenticated){
        return(
            <Navigate
                to={ROUTES.DASHBOARD}
                replace
            />
        );
    }

    return <Outlet/>;
}

export default PublicRoute;