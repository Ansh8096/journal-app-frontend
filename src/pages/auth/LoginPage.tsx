import LoginForm from "@/components/auth/LoginForm";
import AuthLayout from "@/layouts/auth/AuthLayout";

import { loginBranding } from "@/constants/auth/auth-branding";

const LoginPage = () => {
    return (
        <AuthLayout branding={loginBranding}>
            <LoginForm />
        </AuthLayout>
    );
};

export default LoginPage;