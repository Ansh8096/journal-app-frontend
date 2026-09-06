import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import storage from "@/utils/storage/storage";

export type Theme =
    | "light"
    | "dark"
    | "system";

export type ResolvedTheme =
    | "light"
    | "dark";

interface ThemeContextValue {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeContext =
    createContext<ThemeContextValue | undefined>(
        undefined,
    );

const THEME_STORAGE_KEY =
    "journalflow-theme";

const DEFAULT_THEME: Theme =
    "light";

function isValidTheme(
    value: unknown,
): value is Theme {
    return (
        value === "light" ||
        value === "dark" ||
        value === "system"
    );
}

function getSystemTheme(): ResolvedTheme {
    if (
        typeof window === "undefined" ||
        !window.matchMedia
    ) {
        return "light";
    }

    return window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches
        ? "dark"
        : "light";
}

function getInitialTheme(): Theme {
    const storedTheme =
        storage.get<Theme>(
            THEME_STORAGE_KEY,
        );

    return isValidTheme(storedTheme)
        ? storedTheme
        : DEFAULT_THEME;
}

export function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const [
        theme,
        setThemeState,
    ] = useState<Theme>(
        getInitialTheme,
    );

    const [
        systemTheme,
        setSystemTheme,
    ] = useState<ResolvedTheme>(
        getSystemTheme,
    );

    /*
     * ----------------------------------------
     * 17 + 18
     *
     * Listen for operating-system/browser
     * color-scheme changes.
     * ----------------------------------------
     */
    useEffect(() => {
        if (
            typeof window === "undefined" ||
            !window.matchMedia
        ) {
            return;
        }

        const mediaQuery =
            window.matchMedia(
                "(prefers-color-scheme: dark)",
            );

        const handleSystemThemeChange = (
            event: MediaQueryListEvent,
        ) => {
            setSystemTheme(
                event.matches
                    ? "dark"
                    : "light",
            );
        };

        /*
         * Keep the current value synchronized
         * in case the system preference changed
         * before the listener was attached.
         */
        setSystemTheme(
            mediaQuery.matches
                ? "dark"
                : "light",
        );

        mediaQuery.addEventListener(
            "change",
            handleSystemThemeChange,
        );

        return () => {
            mediaQuery.removeEventListener(
                "change",
                handleSystemThemeChange,
            );
        };
    }, []);

    /*
     * ----------------------------------------
     * 19
     *
     * Resolve the user's preference into
     * the actual theme applied to the DOM.
     * ----------------------------------------
     */
    const resolvedTheme: ResolvedTheme =
        theme === "system"
            ? systemTheme
            : theme;

    /*
     * ----------------------------------------
     * Apply/remove .dark from <html>.
     * ----------------------------------------
     */
    useEffect(() => {
        const root =
            document.documentElement;

        root.classList.toggle(
            "dark",
            resolvedTheme === "dark",
        );
    }, [resolvedTheme]);

    /*
     * ----------------------------------------
     * 20
     *
     * Persist the USER'S preference.
     *
     * Important:
     * When the user selects "system", we
     * save "system", not the resolved
     * light/dark value.
     * ----------------------------------------
     */
    useEffect(() => {
        storage.set(
            THEME_STORAGE_KEY,
            theme,
        );
    }, [theme]);

    /*
     * ----------------------------------------
     * Change theme preference.
     * ----------------------------------------
     */
    const setTheme = useCallback(
        (nextTheme: Theme) => {
            setThemeState(nextTheme);
        },
        [],
    );

    const value =
        useMemo<ThemeContextValue>(
            () => ({
                theme,
                resolvedTheme,
                setTheme,
            }),
            [
                theme,
                resolvedTheme,
                setTheme,
            ],
        );

    return (
        <ThemeContext.Provider
            value={value}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const context =
        useContext(
            ThemeContext,
        );

    if (!context) {
        throw new Error(
            "useTheme must be used within ThemeProvider.",
        );
    }

    return context;
}