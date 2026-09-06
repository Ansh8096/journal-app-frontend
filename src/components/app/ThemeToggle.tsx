import {
    Moon,
    Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    useTheme,
} from "@/contexts/ThemeContext";

export default function ThemeToggle() {
    const {
        resolvedTheme,
        setTheme,
    } = useTheme();

    const isDark =
        resolvedTheme === "dark";

    const label =
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode";

    const handleToggle = () => {
        setTheme(
            isDark
                ? "light"
                : "dark",
        );
    };

    return (
        <TooltipProvider>
            <Tooltip key={resolvedTheme}>
                <TooltipTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={
                            label
                        }
                        onClick={
                            handleToggle
                        }
                    >
                        {isDark ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                </TooltipTrigger>

                <TooltipContent side="bottom">
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}