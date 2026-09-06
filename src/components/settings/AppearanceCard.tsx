import {
    Info,
    Moon,
    Monitor,
    Palette,
    Sun,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    useTheme,
    type Theme,
} from "@/contexts/ThemeContext";

import ThemeOptionCard from "./ThemeOptionCard";

const THEME_OPTIONS: Array<{
    value: Theme;
    title: string;
    description: string;
    icon: typeof Sun;
}> = [
    {
        value: "light",
        title: "Light",
        description: "Clean and bright",
        icon: Sun,
    },
    {
        value: "dark",
        title: "Dark",
        description: "Easy on the eyes",
        icon: Moon,
    },
    {
        value: "system",
        title: "System",
        description: "Follow system settings",
        icon: Monitor,
    },
];

export default function AppearanceCard() {
    const {
        theme,
        resolvedTheme,
        setTheme,
    } = useTheme();

    const isSystemTheme =
        theme === "system";

    const resolvedThemeLabel =
        resolvedTheme === "dark"
            ? "dark"
            : "light";

    return (
        <Card className="overflow-hidden rounded-md">
            <CardContent className="p-4 sm:p-7">
                {/* Appearance Header */}
                <div className="flex items-start gap-4">
                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-violet-100
                            dark:bg-violet-950/40
                        "
                    >
                        <Palette
                            className="
                                h-6
                                w-6
                                text-violet-600
                                dark:text-violet-400
                            "
                            aria-hidden="true"
                        />
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-xl font-semibold">
                            Appearance
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            Customize how JournalFlow looks and feels.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-6 border-t" />

                {/* Theme */}
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                        Theme
                    </h3>

                    <p className="text-sm leading-6 text-muted-foreground">
                        Select a theme for the application.
                    </p>
                </div>

                {/* Theme Options */}
                <div className="mt-4 grid gap-5 md:grid-cols-3">
                    {THEME_OPTIONS.map(
                        (option) => (
                            <ThemeOptionCard
                                key={
                                    option.value
                                }
                                value={
                                    option.value
                                }
                                title={
                                    option.title
                                }
                                description={
                                    option.description
                                }
                                icon={
                                    option.icon
                                }
                                selected={
                                    theme ===
                                    option.value
                                }
                                onSelect={
                                    setTheme
                                }
                            />
                        ),
                    )}
                </div>

                {/* Information */}
                <div
                    className="
                        mt-5
                        flex
                        items-start
                        gap-3
                        rounded-lg
                        border
                        border-violet-200/70
                        bg-violet-50
                        px-4
                        py-3
                        dark:border-violet-900/40
                        dark:bg-violet-950/20
                    "
                >
                    <Info
                        className="
                            mt-0.5
                            h-5
                            w-5
                            shrink-0
                            text-violet-600
                            dark:text-violet-400
                        "
                        aria-hidden="true"
                    />

                    <div className="min-w-0">
                        <p className="text-sm font-medium text-violet-800 dark:text-violet-300">
                            Theme changes will apply across the
                            application.
                        </p>

                        {isSystemTheme && (
                            <p className="mt-1 text-xs leading-5 text-violet-700/80 dark:text-violet-400/80">
                                System mode is currently using{" "}
                                <span className="font-medium">
                                    {resolvedThemeLabel}
                                </span>{" "}
                                mode based on your device settings.
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}