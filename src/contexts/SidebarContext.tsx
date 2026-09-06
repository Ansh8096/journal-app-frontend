import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import storage from "@/utils/storage/storage";
import { STORAGE_KEYS } from "@/constants/app/storage";

interface SidebarContextType {
    collapsed: boolean;

    toggleSidebar: () => void;

    setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext =
    createContext<SidebarContextType | undefined>(
        undefined,
    );

interface SidebarProviderProps {
    children: ReactNode;
}

export function SidebarProvider({
    children,
}: SidebarProviderProps) {

    /*
     * Restore the sidebar preference when the
     * application starts.
     */
    const [
        collapsed,
        setCollapsedState,
    ] = useState<boolean>(() => {

        const stored =
            storage.get<boolean>(
                STORAGE_KEYS.SIDEBAR_COLLAPSED,
            );

        return stored ?? false;
    });

    /*
     * ----------------------------------------
     * SET COLLAPSED
     * ----------------------------------------
     */
    const setCollapsed =
        useCallback(
            (value: boolean) => {

                setCollapsedState(value);

                storage.set(
                    STORAGE_KEYS.SIDEBAR_COLLAPSED,
                    value,
                );
            },
            [],
        );

    /*
     * ----------------------------------------
     * TOGGLE
     * ----------------------------------------
     */
    const toggleSidebar =
        useCallback(() => {

            setCollapsedState(
                (previous) => {

                    const next =
                        !previous;

                    storage.set(
                        STORAGE_KEYS.SIDEBAR_COLLAPSED,
                        next,
                    );

                    return next;
                },
            );

        }, []);

    const value =
        useMemo<SidebarContextType>(
            () => ({
                collapsed,
                toggleSidebar,
                setCollapsed,
            }),
            [
                collapsed,
                toggleSidebar,
                setCollapsed,
            ],
        );

    return (
        <SidebarContext.Provider
            value={value}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {

    const context =
        useContext(
            SidebarContext,
        );

    if (!context) {
        throw new Error(
            "useSidebar must be used inside SidebarProvider.",
        );
    }

    return context;
}