import SignupForm from "@/components/auth/SignupForm";
import AuthLayout from "@/layouts/auth/AuthLayout";

import { signupBranding } from "@/constants/auth/auth-branding";

const SignupPage = () => {
    return (
        <AuthLayout branding={signupBranding}>
            <SignupForm />
        </AuthLayout>
    );
};

export default SignupPage;