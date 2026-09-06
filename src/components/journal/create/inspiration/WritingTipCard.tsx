import * as React from "react";
import { Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { WritingTipContent } from "./WritingTipContent";

import type { WritingTip } from "@/types/journal/writing-tip";
import { cn } from "@/lib/utils";

export interface WritingTipCardProps {
    tip: WritingTip;
    className?: string;
}

export function WritingTipCard({
    tip,
    className,
}: WritingTipCardProps) {
    return (
        <Card
            className={cn(
    "group relative overflow-hidden",
    "border-violet-100",
    "bg-gradient-to-br from-violet-50 via-background to-violet-100/40",
    "shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
    "dark:border-violet-900/50",
    "dark:from-violet-950/40",
    "dark:via-background",
    "dark:to-violet-950/20",
    className,
)}
        >
            <Quote
    className="
        pointer-events-none
        absolute
        bottom-4
        right-5
        h-7
        w-7
        text-violet-200
        dark:text-violet-700
        transition-transform
        duration-300
        group-hover:scale-110
    "
    aria-hidden="true"
/>

            <CardContent className="relative z-10 p-5">
                <WritingTipContent tip={tip} />
            </CardContent>
        </Card>
    );
}

export default React.memo(WritingTipCard);