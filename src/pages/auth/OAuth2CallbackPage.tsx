import {
    useEffect,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    toast,
} from "sonner";

import {
    useAuth,
} from "@/hooks/useAuth";

import {
    ROUTES,
} from "@/constants/app/routes";

export default function OAuth2CallbackPage() {

    const {
        loginWithGoogle,
    } = useAuth();

    const navigate =
        useNavigate();

    useEffect(() => {

        let cancelled = false;

        const completeLogin =
            async () => {

                try {

                    await loginWithGoogle();

                    if (cancelled) {
                        return;
                    }

                    navigate(
                        ROUTES.DASHBOARD,
                        {
                            replace: true,
                        },
                    );

                } catch (error) {

                    console.error(
                        "Google authentication failed:",
                        error,
                    );

                    if (cancelled) {
                        return;
                    }

                    toast.error(
                        "Google sign-in failed. Please try again.",
                    );

                    navigate(
                        ROUTES.LOGIN,
                        {
                            replace: true,
                        },
                    );
                }
            };

        void completeLogin();

        return () => {
            cancelled = true;
        };

    }, [
        loginWithGoogle,
        navigate,
    ]);

    return (
        <div
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-background
            "
        >
            <p className="text-sm text-muted-foreground">
                Completing Google sign-in...
            </p>
        </div>
    );
}