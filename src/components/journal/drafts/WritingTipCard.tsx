// WritingTipCard.tsx
import { Lightbulb, Quote } from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { draftPageConfig } from "./Config";

export default function WritingTipCard() {
    const {
        writingTip,
    } = draftPageConfig;

    return (
        <Card
            className="
                group
                overflow-hidden
                rounded-md
                bg-orange-100/70
                dark:bg-orange-950/45
                border
                border-orange-200/70
                dark:border-orange-800/50
                transition-all
                duration-200
                ease-out
                hover:-translate-y-0.5
                hover:shadow-md
            "
        >
            <CardContent className="relative px-5 py-1">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <div className="flex h-3 w-5 items-center justify-center">
                        <Lightbulb
                            className="
                                h-5
                                w-5
                                text-yellow-500
                                dark:text-yellow-400
                                transition-transform
                                duration-200
                                ease-out
                                group-hover:-rotate-6
                            "
                        />
                    </div>

                    <h2 className="text-sm font-semibold">
                        {writingTip.title}
                    </h2>
                </div>

                {/* Tip — no max-w constraint (that's what was forcing a
                    3rd line); pr-8 reserves room for the quote mark
                    instead, and mt-2 (down from mt-4) tightens the card
                    to the target's more compact height. */}
                <p className="mt-2 pr-8 text-sm leading-5 text-muted-foreground">
                    {writingTip.description}
                </p>

                {/* Decorative quote — un-rotated (rotate-180 on a
                    closing-quote glyph was producing an opening-quote
                    shape), sized down to h-6 w-6, and a more solid amber
                    tone to match the target. */}
                <Quote
                    className="
                        absolute
                        bottom-3
                        right-4
                        h-6
                        w-6
                        fill-amber-400
                        text-amber-500/80
                        dark:fill-amber-300
                        dark:text-amber-300
                        transition-transform
                        duration-200
                        ease-out
                        group-hover:scale-110
                    "
                />
            </CardContent>
        </Card>
    );
}