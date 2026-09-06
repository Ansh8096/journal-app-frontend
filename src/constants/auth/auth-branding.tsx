import type { LucideIcon } from "lucide-react";
import loginFormImage from "@/assets/login_form_1.jpg";
import signupFormImage from "@/assets/signup_form_1.jpg";

import {
    CloudSun,
    LockKeyhole,
    Smile,
    BarChart3,
} from "lucide-react";
import type { ReactNode } from "react";

export interface AuthFeature {
    icon: LucideIcon;
    title: string;
    description: string;
    /*
     * Optional per-feature icon-chip colors. Left unset, features
     * fall back to the original uniform white/10 chip (Login's
     * established look). Signup's target uses distinct colors per
     * feature, so it sets these explicitly.
     */
    iconWrapClassName?: string;
    iconClassName?: string;
}

export interface AuthBrandingContent {
    title: ReactNode;
    titleHighlight?: ReactNode;
    subtitle: string;
    features: AuthFeature[];
    illustration?: string;
    /*
     * Promoted out of AuthBranding.tsx, where it was previously
     * hardcoded and shared by every page — that meant Signup would
     * have silently displayed Login's quote text. Now each page
     * supplies its own.
     */
    quote: string;
}

export const loginBranding: AuthBrandingContent = {
    title: (
    <>
        <span className="hidden xl:inline">
            Capture your thoughts.      
        </span>
        
        <br />
        <span className="hidden xl:inline">
            Cherish your
        </span>
    </>
),
    titleHighlight: "journey.",

    subtitle:
        "A private space for your ideas, reflections, and moments that matter.",

    features: [
        {
            icon: LockKeyhole,
            title: "Private & Secure",
            description: "Your thoughts are safe with us.",
            iconWrapClassName: "bg-violet-500/90",
            iconClassName: "text-white",
        },
        {
            icon: Smile,
            title: "Mood Tracking",
            description: "Understand your emotions better.",
            iconWrapClassName: "bg-teal-600/90",
            iconClassName: "text-white",
        },
        {
            icon: CloudSun,
            title: "Weather Insights",
            description: "Relive moments with weather.",
            iconWrapClassName: "bg-amber-700/90",
            iconClassName: "text-white",
        },
    ],

    illustration: loginFormImage,

    quote: "The more you write, the more you understand yourself.",
};

export const signupBranding: AuthBrandingContent = {
    title: (
        <>
            <span className="hidden xl:inline">
                Begin your journey of 
            </span>

            <br />
        </>
    ) ,
    titleHighlight: "self-discovery.",

    subtitle:
        "Create your personal space to write, reflect, and grow every day.",

    features: [
        {
            icon: LockKeyhole,
            title: "Private & Secure",
            description: "Your thoughts are safe with end-to-end encryption.",
            iconWrapClassName: "bg-violet-500/90",
            iconClassName: "text-white",
        },
        {
            icon: Smile,
            title: "AI Mood Insights",
            description: "Understand your emotions better with AI.",
            iconWrapClassName: "bg-teal-600/90",
            iconClassName: "text-white",
        },
        {
            icon: CloudSun,
            title: "Weather Memories",
            description: "Add weather to your entries and cherish every moment.",
            iconWrapClassName: "bg-amber-700/90",
            iconClassName: "text-white",
        },
    ],

    illustration: signupFormImage,

    quote: "The best time to start was yesterday. The next best time is now.",
};

/*
 * Exported for reuse in SignupForm's "Weekly Journal Insights" icon
 * chip, which uses the same violet treatment as the feature icons
 * above rather than duplicating the color value.
 */
export const insightsIcon = BarChart3;