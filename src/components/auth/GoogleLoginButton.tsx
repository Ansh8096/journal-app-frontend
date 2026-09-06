// GoogleLoginButton.tsx
import { Button } from "@/components/ui/button";

function getBackendBaseUrl(): string {
    const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL as string;

    return apiBaseUrl.replace(
        /\/api\/v1\/?$/,
        "",
    );
}

interface GoogleLoginButtonProps {
    mode?: "login" | "signup";
}

export default function GoogleLoginButton({
    mode = "login",
}: GoogleLoginButtonProps) {

    const handleGoogleLogin = () => {

        const backendBaseUrl =
            getBackendBaseUrl();

        const endpoint =
            mode === "signup"
                ? "/api/v1/auth/oauth2/google/signup"
                : "/api/v1/auth/oauth2/google/login";

        window.location.href =
            `${backendBaseUrl}${endpoint}`;
    };

    return (
        <Button
            type="button"
            variant="outline"
            className="w-full rounded-sm transition-all duration-200 ease-out hover:bg-muted/60 active:scale-[0.99]"
            onClick={handleGoogleLogin}
        >
            <GoogleIcon />

            <span>
                {mode === "signup"
                    ? "Sign up with Google"
                    : "Continue with Google"}
            </span>
        </Button>
    );
}

function GoogleIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mr-2 shrink-0"
        >
            <path
                fill="#4285F4"
                d="M21.35 12.27c0-.71-.06-1.4-.18-2.05H12v3.89h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.2Z"
            />
            <path
                fill="#34A853"
                d="M12 21.8c2.63 0 4.84-.87 6.45-2.34l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.51A9.75 9.75 0 0 0 12 21.8Z"
            />
            <path
                fill="#FBBC05"
                d="M6.54 13.93a5.9 5.9 0 0 1 0-3.78V7.64H3.3a9.8 9.8 0 0 0 0 8.8l3.24-2.51Z"
            />
            <path
                fill="#EA4335"
                d="M12 6.12c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.17 14.63 2.2 12 2.2a9.75 9.75 0 0 0-8.7 5.44l3.24 2.51C7.31 7.84 9.46 6.12 12 6.12Z"
            />
        </svg>
    );
}