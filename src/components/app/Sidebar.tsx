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
import { Separator} from '@/components/ui/separator';
import { ROUTES } from '@/constants/routes';
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
        path:   ROUTES.DASHBOARD,
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
} : SidebarProps) =>{ 

    const {user, logout} = useAuth();
    const { resolvedTheme } = useTheme();

    if(!user) return null;

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
        className={`
            h-9
            w-9
            shrink-0
            object-contain
        `}
    />

    {!sidebarCollapsed && (
        <span
            className="
                text-2xl
                font-bold
                tracking-tight
                mt-2
            "
        >
            JournalFlow
        </span>
    )}
</div>

            {/* 'nav' -> HTML tag for navigation links. */}
            <nav className="flex-1 space-y-2" > {/* 'flex-1' consumes all available space and pushes everything below it to the bottom... */}

                {menuItems.map( (item) => {
                    const Icon = item.icon;
                    return (
                        <Tooltip key={item.path}>  {/* 'Tooltip' -> this is a parent container... */}
                            {/* 'TooltipTrigger' ->  What should show the tooltip? */}
                            <TooltipTrigger asChild> 

                                <div>
                                    <NavLink
                                        to={item.path}
                                        end
                                        className={({ isActive }) =>
                                        `flex items-center
                                        ${sidebarCollapsed ? "justify-center" : "gap-3"}
                                        p-2 rounded-lg transition-colors
                                        ${
                                            isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                
                                        {!sidebarCollapsed && (
                                            <span>{item.title}</span>
                                        )}
                                    </NavLink>
                                </div>
                                
                            </TooltipTrigger>
                                
                            {sidebarCollapsed && (
                                <TooltipContent side="right"> {/* 'TooltipContent' -> This is the popup info itself... */} 
                                    {item.title}
                                </TooltipContent>
                            )}

                        </Tooltip>
                    );
                })}
            </nav>

            <Separator className='my-4'/>
            
            <div className="mt-auto">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            onClick={logout}
                            className={`
                                w-full
                                transition-colors
                                ${
                                    sidebarCollapsed
                                        ? "justify-center px-2"
                                        : "justify-start gap-3"
                                }
                                text-destructive
                                hover:bg-destructive/10
                                hover:text-destructive
                            `}
                        >
                            <LogOut className="h-5 w-5 shrink-0" />
                            
                            {!sidebarCollapsed && (
                                <span>Logout</span>
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
