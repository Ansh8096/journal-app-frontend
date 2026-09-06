import * as React from "react";
import { Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";
import type { WritingTip } from "@/types/journal/writing-tip";

export interface WritingTipContentProps {
    tip: WritingTip;
    className?: string;
}

export function WritingTipContent({
    tip,
    className,
}: WritingTipContentProps) {
    return (
        <div
            className={cn("space-y-3", className)}
            role="article"
            aria-labelledby="writing-tip-title"
        >
            <div className="flex items-center gap-1.5">
                <Lightbulb
    className="
        h-4
        w-4
        text-violet-600
        dark:text-violet-400
    "
    aria-hidden="true"
/>

<h3
    id="writing-tip-title"
    className="
        text-sm
        font-semibold
        text-violet-600
        dark:text-violet-400
    "
>
    {tip.title}
</h3>
            </div>

            <p className="whitespace-pre-line text-sm leading-6 text-foreground">
                {tip.message}
            </p>
        </div>
    );
}

export default React.memo(WritingTipContent);