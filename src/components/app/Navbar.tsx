import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    User,
    Settings,
    LogOut,
    Menu
} from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/app/routes"
import { getUserInitials } from "@/utils/user/user";
import ThemeToggle from "./ThemeToggle";

type NavbarProps = {
    sidebarCollapsed: boolean;
    onToggleSidebar: () => void;
};

export default function Navbar({
    sidebarCollapsed,
    onToggleSidebar,
}: NavbarProps) {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    const initials = getUserInitials(user.username);

    return (
        <header
            className="
            flex
            sticky
            top-0
            z-50
            h-14
            items-center
            justify-between
            border-b
            bg-background
            py-3
            px-6
            "
        >

            <div className="flex flex-1 items-center gap-6">

                {/* Menu and search bar ...*/}
                <TooltipProvider>
                    <Tooltip key={sidebarCollapsed ? "expanded" : "collapsed"}>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onToggleSidebar}
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent side="bottom">
                            {sidebarCollapsed
                                ? "Expand Sidebar"
                                : "Collapse Sidebar"
                            }
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </div>



            <div className="flex items-center gap-2">

                {/* Theme */}
                <ThemeToggle />

                {/* Right Section */}

                <DropdownMenu> {/*'DropdownMenu'-> is the parent container, it manages Open state, Close state, Positioning, Keyboard navigation, Accessibility */}

                    {/* 'DropdownMenuTrigger' defines: What should open the dropdown? (in our case: button)*/}
                    {/* asChild is used, beacuse without this Radix creates its own button, which is invalid */}
                    <DropdownMenuTrigger asChild>

                        <Button
                            variant="ghost"
                            className="flex items-center gap-3 px-2"
                        >
                            <Avatar >
                                <AvatarImage src={user?.profileImageUrl ?? undefined} />
                                <AvatarFallback>
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <span className="font-medium">
                                {user?.username}
                            </span>
                        </Button>

                    </DropdownMenuTrigger>

                    {/* Defines the dropdown panel. */}
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => navigate(ROUTES.PROFILE)}>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem onSelect={() => navigate(ROUTES.SETTINGS)}>
                            <Settings className='mr-2 h-4 w-4' />
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="text-red-500"
                            onSelect={logout}
                        >
                            <LogOut className='mr-2 h-4 w-4' />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </header>
    );

}
