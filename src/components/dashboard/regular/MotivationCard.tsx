import { Lightbulb } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { regularDashboardConfig } from "./Config";

export default function MotivationCard() {
    const { motivation } = regularDashboardConfig;

    return (
        <Card
            className="
                group
                rounded-md
                border
                transition-all
                duration-300
                ease-out
                hover:-translate-y-0.5
                hover:shadow-md
                hover:border-yellow-200
                dark:hover:border-yellow-900/50
            "
        >
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb
                        className="
                            h-5
                            w-5
                            text-yellow-500
                            transition-transform
                            duration-300
                            ease-out
                            group-hover:scale-110
                            group-hover:-rotate-3
                        "
                    />

                    {motivation.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 p-6 md:p-5">
                <blockquote
                    className="
                        whitespace-pre-line
                        text-base
                        italic
                        leading-relaxed
                        transition-transform
                        duration-300
                        ease-out
                        group-hover:translate-x-0.5
                        md:text-lg
                    "
                >
                    "{motivation.quote}"
                </blockquote>

                <p className="text-sm leading-relaxed text-muted-foreground">
                    {motivation.description}
                </p>
            </CardContent>
        </Card>
    );
}