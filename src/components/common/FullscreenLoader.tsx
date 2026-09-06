import light_logo from "@/assets/logo-2.png";
import dark_logo from "@/assets/journalflow_dark_logo.svg";

import { useTheme } from "@/contexts/ThemeContext";

const FullscreenLoader = () => {
    const { resolvedTheme } =
        useTheme();

    const logo =
        resolvedTheme === "dark"
            ? dark_logo
            : light_logo;

    return (
        <div
            className="
                flex
                min-h-screen
                flex-col
                items-center
                justify-center
                gap-8
                bg-background
            "
        >
            <img
                src={logo}
                alt="JournalFlow"
                className="
                    w-72
                    select-none
                    animate-breathe
                    sm:w-80
                    md:w-96
                "
                draggable={false}
            />
        </div>
    );
};

export default FullscreenLoader;

// FullscreenLoader is intended for situations where the entire application or page cannot be used yet, 
// such as bootstrapping authentication, restoring a session, or loading essential application state. 
// It occupies the full viewport with your branding.