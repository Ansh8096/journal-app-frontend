// AuthLayout.tsx
import type { ReactNode } from "react";
import type { AuthBrandingContent } from "@/constants/auth-branding";
import AuthBranding from "@/components/auth/AuthBranding";

export interface AuthLayoutProps {
    branding: AuthBrandingContent;
    children: ReactNode;
}

const AuthLayout = ({
    branding,
    children,
}: AuthLayoutProps) => {
    return (

        <div className="
    min-h-screen
    grid
    lg:grid-cols-2
    bg-violet-50/40
    dark:bg-background
">

            {/*
                Left Branding — items-center removed (was vertically
                centering the whole branding block as one unit, which
                is why the logo couldn't sit at the top and the quote
                couldn't sit at the bottom independently). justify-center
                kept to horizontally center the panel's content column;
                AuthBranding itself now owns the top/middle/bottom
                vertical distribution via h-full + justify-between.
            */}
            <div
                className="relative hidden lg:flex justify-center overflow-hidden bg-slate-90 bg-cover bg-center p-12 transition-all duration-300 ease-out"
                style={
                    branding.illustration
                        ?{
                            backgroundImage: `url(${branding.illustration})`,
                        }
                        : undefined
                }
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />

                <div className="relative z-10 w-full">
                    <AuthBranding content={branding} />
                </div>
            </div>

            {/* Right Content — untouched */}
            <div className="flex items-center justify-center p-6 sm:p-8">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;