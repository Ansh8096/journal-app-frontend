import { BookOpen, Quote } from "lucide-react";

import type { AuthBrandingContent } from "@/constants/auth-branding.tsx";

interface AuthBrandingProps {
    content: AuthBrandingContent;
}

const AuthBranding = ({
    content,
}: AuthBrandingProps) => {
    return (

        <div className="flex h-full max-w-lg flex-col justify-between">

            {/* TOP — Logo. "JournalFlow" as a single wordmark, matching
                the newest target for both Login and Signup — this
                intentionally replaces the previous split "Journal App"
                styling on both pages. */}
            <div className="flex items-center gap-2 text-left">

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600">
                    <BookOpen className="h-4 w-4 text-white" />
                </span>

                <h1 className="text-lg font-bold tracking-tight text-white">
                    JournalFlow
                </h1>

            </div>

            {/* MIDDLE — Headline, subtitle, features */}
            <div className="space-y-8 text-left">

                <div className="space-y-3">

                    <h2 className="text-3xl font-bold leading-tight text-white">
                        {content.title}

                        {content.titleHighlight && (
                            <>
                                {" "}
                                <span className="text-violet-300">
                                    {content.titleHighlight}
                                </span>
                            </>
                        )}
                    </h2>

                    <p className="text-base leading-relaxed text-white/70">
                        {content.subtitle}
                    </p>

                </div>

                <div className="space-y-4">

                    {content.features.map((feature) => {

                        const Icon = feature.icon;

                        return (

                            <div
                                key={feature.title}
                                className="flex items-start gap-3 text-left"
                            >

                                <span
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg backdrop-blur-sm ${
                                        feature.iconWrapClassName ??
                                        "bg-white/10"
                                    }`}
                                >
                                    <Icon
                                        className={`h-4 w-4 ${
                                            feature.iconClassName ?? "text-white"
                                        }`}
                                    />
                                </span>

                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-white">
                                        {feature.title}
                                    </p>

                                    <p className="text-sm text-white/60">
                                        {feature.description}
                                    </p>
                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>

            {/* BOTTOM — Quote. Slightly richer box (bg tint + icon)
                than the previous plain italic+border treatment — a
                small shared upgrade, so this also affects Login's
                quote block, not just Signup's. */}
            <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
                <Quote
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 fill-violet-400 text-violet-400/80"
                />

                <p className="text-left text-sm italic leading-relaxed text-white/70">
                    {content.quote}
                </p>
            </div>

        </div>

    );
};

export default AuthBranding;