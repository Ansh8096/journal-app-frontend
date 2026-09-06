import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

import type { QuickAction } from "./Config";

interface QuickActionCardProps {
    action: QuickAction;
}

export default function QuickActionCard({
    action,
}: QuickActionCardProps) {
    const Icon = action.icon;

    return (
        <Link to={action.href}>
            <Card
                className="
                    group
                    h-full
                    cursor-pointer
                    transition-all
                    duration-200
                    ease-out
                    hover:-translate-y-1
                    hover:border-violet-200
                    hover:shadow-md
                    focus-within:ring-2
                    focus-within:ring-violet-400
                "
            >
                <CardContent
                    className="
                        flex
                        flex-col
                        items-center
                        pt-3
                        px-9
                        text-center
                    "
                >
                    <Icon
                        className="
                            mb-3
                            h-8
                            w-8
                            text-primary
                            transition-colors
                            duration-200
                            ease-out
                            group-hover:text-violet-600
                            dark:group-hover:text-violet-400
                        "
                    />

                    <h3
                        className="
                            font-semibold
                            transition-colors
                            duration-200
                            ease-out
                            group-hover:text-violet-700
                            dark:group-hover:text-violet-400
                        "
                    >
                        {action.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                        {action.description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}