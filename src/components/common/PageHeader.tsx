import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;

    icon?: LucideIcon;
    iconClassName?: string;

    actionLabel?: string;
    actionIcon?: LucideIcon;
    actionIconPosition?: "left" | "right";

    onAction?: () => void;

    actionVariant?:
        | "default"
        | "outline"
        | "secondary"
        | "ghost"
        | "destructive"
        | "link";

    actionClassName?: string;

    className?: string;
}

export default function PageHeader({
    title,
    description,
    icon: Icon,
    iconClassName = "text-muted-foreground",
    actionLabel,
    actionIcon: ActionIcon,
    actionIconPosition = "left",
    onAction,
    actionVariant = "default",
    actionClassName,
    className,
}: PageHeaderProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
                className,
            )}
        >
            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold leading-none tracking-tight">
                        {title}
                    </h1>

                    {Icon && (
                        <Icon
                            className={cn(
                                "h-8 w-8",
                                iconClassName,
                            )}
                            aria-hidden="true"
                        />
                    )}
                </div>

                {description && (
                    <p className="text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {actionLabel && (
                <Button
                    size="lg"
                    variant={actionVariant}
                    onClick={onAction}
                    className={cn(
                        "rounded-xl",
                        actionClassName,
                    )}
                >
                    {ActionIcon &&
                        actionIconPosition === "left" && (
                            <ActionIcon
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                            />
                        )}

                    {actionLabel}

                    {ActionIcon &&
                        actionIconPosition === "right" && (
                            <ActionIcon
                                className="ml-2 h-4 w-4"
                                aria-hidden="true"
                            />
                        )}
                </Button>
            )}
        </div>
    );
}