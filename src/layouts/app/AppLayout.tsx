import Navbar from "../../components/app/Navbar";
import Sidebar from "../../components/app/Sidebar";
import { useSidebar } from "@/contexts/SidebarContext";

// In TypeScript, type is used to define the shape of data. Think of it like creating a blueprint.
// "This component expects a prop called children." and "children must be something React can render."
type AppLayoutProps= {
    children: React.ReactNode; // 'React.ReactNode' -> Anything React can display
}

const AppLayout = ({
    children
}:AppLayoutProps)=> {

    const {
        collapsed,
        toggleSidebar,
    } = useSidebar();

    return (
        <div className="h-screen flex flex-col">
            <Navbar 
                sidebarCollapsed={collapsed}
                onToggleSidebar={toggleSidebar}
            />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar 
                sidebarCollapsed={collapsed}
                />
                <main
                    className="
                    transition-all
                    duration-300
                    flex-1
                    overflow-y-auto
                    bg-muted/20"
                >
                    <div className="container mx-auto p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AppLayout;