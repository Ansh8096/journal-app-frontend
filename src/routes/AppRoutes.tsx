import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";
import { ROUTES } from "@/constants/routes";
import JournalPage from "@/pages/journal/MyJournalsPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import DashBoardPage from "@/pages/dashboard/DashboardPage";
import CreateJournalPage from "@/pages/journal/CreateJournalPage";
import JournalDetailsPage from "@/pages/journal/JournalDetailsPage";
import EditJournalPage from "@/pages/journal/EditJournalPage";
import EditDraftPage from "@/pages/journal/EditDraftPage";
import MyDrafts from "@/pages/journal/MyDraftsPage";
import OAuth2CallbackPage from "@/pages/auth/OAuth2CallbackPage";


const AppRoutes = () => {
    return (
        <Routes>
        
        {/* Default */}
    
            <Route
                path="/"
                element={
                    <Navigate
                        to={ROUTES.DASHBOARD}
                        replace
                    />
                }
            />
    
            {/* Public */}
            <Route element={<PublicRoute />}>
                <Route
                    path={ROUTES.LOGIN}
                    element={<LoginPage />}
                />
    
                <Route
                    path={ROUTES.SIGNUP}
                    element={<SignupPage />}
                />

                <Route
                    path="/oauth2/callback"
                    element={
                        <OAuth2CallbackPage />
                    }
                />

            </Route>
            
            {/* Protected */}
            <Route element={<ProtectedRoute />}>

                <Route
                    path={ROUTES.DASHBOARD }
                    element={<DashBoardPage />}
                />

                <Route
                    path={ROUTES.PROFILE}
                    element={<ProfilePage />}
                />

                <Route 
                    path={ROUTES.JOURNAL_DETAILS}
                    element={<JournalDetailsPage/>}
                />
                
                <Route
                    path={ROUTES.JOURNALS}
                    element={<JournalPage />}
                />
    
                <Route
                    path={ROUTES.SETTINGS}
                    element={<SettingsPage />}
                />
        
                <Route 
                    path={ROUTES.NEW_JOURNAL}
                    element={<CreateJournalPage/>}
                />
                
                
                <Route 
                    path={ROUTES.EDIT_JOURNAL}
                    element={<EditJournalPage/>}
                />

                <Route 
                    path={ROUTES.EDIT_DRAFT}
                    element={<EditDraftPage/>}
                />
\
                <Route
                    path={ROUTES.DRAFTS}
                    element={<MyDrafts/>}
                />
                
            </Route>            
            
          {/* 404 */}
            
            <Route
                path="*"
                element={
                <Navigate
                    to="/"
                    replace
                />
                }
            />
    
        </Routes>
    );
}

export default AppRoutes;
