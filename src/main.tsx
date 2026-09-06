import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App.tsx";

import { AuthProvider } from "./contexts/AuthContext.tsx";
import {
    ThemeProvider,
} from "./contexts/ThemeContext.tsx";

import { queryClient } from "@/lib/react-query";

import {
    QueryClientProvider,
} from "@tanstack/react-query";

import {
    ReactQueryDevtools,
} from "@tanstack/react-query-devtools";
import { SidebarProvider } from "./contexts/SidebarContext.tsx";

createRoot(
    document.getElementById("root")!,
).render(
    <QueryClientProvider
        client={queryClient}
    >
        <ThemeProvider>
            <BrowserRouter>
                <SidebarProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </SidebarProvider>

                {/* React Query Devtools */}
                {import.meta.env.DEV && (
                    <ReactQueryDevtools
                        initialIsOpen={false}
                    />
                )}
            </BrowserRouter>
        </ThemeProvider>
    </QueryClientProvider>,
);