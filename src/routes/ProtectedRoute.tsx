import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/constants/app/routes";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import FullscreenLoader from "@/components/common/FullscreenLoader";

const ProtectedRoute = () =>{
    const {isAuthenticated, loading} = useAuth();
    const location = useLocation();

    if(loading) return <FullscreenLoader/> ;

    if (!isAuthenticated) {
        return (
            <Navigate
                to={ROUTES.LOGIN}
                state={{ from: location }}
                replace // Using replace removes the protected URL from the history stack, resulting in a smoother user experience.
            />
        );
    }

    return <Outlet/>;
}

export default ProtectedRoute;