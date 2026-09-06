// AuthHeader.tsx
import type { ReactNode } from "react";

interface AuthHeaderProps {
    /*
     * Widened from string to ReactNode — required so Signup can pass
     * a colored Sparkles icon instead of the raw "✨" glyph, whose
     * color can't be controlled via CSS. Fully backward-compatible:
     * Login's plain string title still works unchanged.
     */
    title: ReactNode;
    description: string;
}

const AuthHeader = ({
    title,
    description,
}: AuthHeaderProps) => {
    return (
        <div className="space-y-1 text-left">

            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                {title}
            </h1>

            <p className="text-sm text-muted-foreground">
                {description}
            </p>

        </div>
    );
};

export default AuthHeader;