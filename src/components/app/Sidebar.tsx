import {
    LayoutDashboard,
    BookOpen,
    SquarePen,
    FilePenLine,
    User,
    Settings,
    LogOut
} from 'lucide-react'


import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { NavLink } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/constants/app/routes';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../ui/button';
import SidebarDarkLogo from '@/assets/sidebar_dark_logo.png'
import SidebarLightLogo from '@/assets/sidebar_light_logo.png'
import { useTheme } from '@/contexts/ThemeContext';

// TypeScript now knows: sidebarCollapsed → boolean, setCollapsed → function
type SidebarProps = {
    sidebarCollapsed: boolean;
};

const menuItems = [
    {
        title: "Dashboard",
        path: ROUTES.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        title: "My Journals",
        path: ROUTES.JOURNALS,
        icon: BookOpen,
    },
    {
        title: "Create Journal",
        path: ROUTES.NEW_JOURNAL,
        icon: SquarePen,
    },
    {
        title: "My Drafts",
        path: ROUTES.DRAFTS,
        icon: FilePenLine,
    },
    {
        title: "Profile",
        path: ROUTES.PROFILE,
        icon: User,
    },
    {
        title: "Settings",
        path: ROUTES.SETTINGS,
        icon: Settings,
    },
];

const Sidebar = ({
    sidebarCollapsed,
}: SidebarProps) => {

    const { user, logout } = useAuth();
    const { resolvedTheme } = useTheme();

    if (!user) return null;

    const sidebarLogo =
        resolvedTheme === "dark"
            ? SidebarDarkLogo
            : SidebarLightLogo;

    return (
        // 'aside' -> HTML semantic tag. Used for sidebars and secondary content. 
        // Equivalent to: <div> but more meaningful...
        <aside className={`flex h-full flex-col border-r bg-background p-4 transition-all duration-300 ${sidebarCollapsed ? "w-20" : "w-56"}`}> {/* border-r -> add border on right side... */}

            <TooltipProvider
                delayDuration={300}
                skipDelayDuration={300}
            >
                {/* Logo:  */}
                <div
                    className={`
                                group
                                mb-8
                                flex
                                items-center
                                ${sidebarCollapsed
                                    ? "justify-center"
                                    : "justify-start gap-3"
                                }
                            `}
                >
                    <img
                        src={sidebarLogo}
                        alt="JournalFlow"
                        className="
                            h-9
                            w-9
                            shrink-0
                            object-contain
                            transition-all
                            duration-300
                            ease-out
                            group-hover:scale-110
                            group-hover:-rotate-3
                            group-hover:brightness-110
                        "
                    />

                    {!sidebarCollapsed && (
                        <span
                            className="
                                mt-2
                                text-2xl
                                font-bold
                                tracking-tight
                                transition-colors
                                duration-300
                                ease-out
                                group-hover:text-violet-600
                                dark:group-hover:text-violet-400
                            "
                        >
                            JournalFlow
                        </span>
                    )}
                </div>

                {/* 'nav' -> HTML tag for navigation links. */}
                <nav className="flex-1 space-y-2" > {/* 'flex-1' consumes all available space and pushes everything below it to the bottom... */}

                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Tooltip
                                key={`${item.path}-${sidebarCollapsed}`}
                            >
                                <TooltipTrigger asChild>
                                    <div>
                                        <NavLink
                                            to={item.path}
                                            end
                                            className={({ isActive }) =>
                                                `
                                                    group/item
                                                    flex
                                                    items-center
                                                    ${sidebarCollapsed
                                                        ? "justify-center"
                                                        : "gap-3"
                                                    }
                                                    rounded-lg
                                                    p-2
                                                    transition-all
                                                    duration-200
                                                    ease-out

                                                    ${isActive
                                                        ? "bg-primary text-primary-foreground"
                                                        : `
                                                            text-muted-foreground
                                                            hover:bg-muted
                                                            hover:text-foreground
                                                            hover:translate-x-1
                                                        `
                                                    }
                                                `
                                            }
                                        >
                                            <Icon
                                                className="
                                                    h-5
                                                    w-5
                                                    shrink-0
                                                    transition-transform
                                                    duration-200
                                                    ease-out
                                                    group-hover/item:scale-110
                                                "
                                            />

                                            {!sidebarCollapsed && (
                                                <span
                                                    className="
                                                        transition-colors
                                                        duration-200
                                                        ease-out
                                                    "
                                                >
                                                    {item.title}
                                                </span>
                                            )}
                                        </NavLink>
                                    </div>
                                </TooltipTrigger>

                                {sidebarCollapsed && (
                                    <TooltipContent side="right">
                                        {item.title}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        );
                    })}
                </nav>

                <Separator className='my-4' />

                <div className="mt-auto">
                    <Tooltip key={`logout-${sidebarCollapsed}`}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                onClick={logout}
                                className={`
                                    group/logout
                                    w-full
                                    rounded-lg
                                    text-destructive
                                    transition-all
                                    duration-200
                                    ease-out

                                    ${sidebarCollapsed
                                        ? "justify-center px-2"
                                        : "justify-start gap-3"
                                    }

                                    hover:bg-destructive/10
                                    hover:text-destructive
                                    hover:translate-x-1
                                    hover:shadow-sm

                                    focus-visible:ring-2
                                    focus-visible:ring-destructive/30
                                    focus-visible:ring-offset-2
                                `}
                            >
                                <LogOut
                                    className="
                                        h-5
                                        w-5
                                        shrink-0
                                        transition-transform
                                        duration-200
                                        ease-out
                                        group-hover/logout:scale-110
                                    "
                                />

                                {!sidebarCollapsed && (
                                    <span
                                        className="
                                            transition-colors
                                            duration-200
                                            ease-out
                                        "
                                    >
                                        Logout
                                    </span>
                                )}
                            </Button>
                        </TooltipTrigger>

                        {sidebarCollapsed && (
                            <TooltipContent side="right">
                                Logout
                            </TooltipContent>
                        )}
                    </Tooltip>
                </div>

            </TooltipProvider>

        </aside>

    );
}

export default Sidebar;
