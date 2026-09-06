// PickUpDraftCard.tsx
import {
    FileImage,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    draftPageConfig,
} from "./Config";

import pickupDraftIllustration from "@/assets/pickup-draft-card-illustration.png";

export default function PickUpDraftCard() {
    const {
        pickUp,
    } = draftPageConfig;

    return (
        <Card
            className="
                group
                overflow-hidden
                rounded-md
                bg-violet-50
                transition-all
                duration-200
                ease-out
                hover:-translate-y-0.5
                hover:shadow-md
                dark:bg-violet-950/20
            "
        >
            <CardContent className="px-5 py-2">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <FileImage className="h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400 transition-transform duration-200 ease-out group-hover:-rotate-6" />

                    <h2 className="text-sm font-semibold">
                        {pickUp.title}
                    </h2>
                </div>

                {/* Illustration */}
                <div className="mt-4 flex justify-center">
                    <img
                        src={
                            pickupDraftIllustration
                        }
                        alt="Pick up where you left off"
                        className="
                            h-auto
                            w-full
                            max-w-[180px]
                            object-contain
                            transition-transform
                            duration-200
                            ease-out
                            group-hover:scale-105
                        "
                    />
                </div>

                {/* Content */}
                <div className="mt-2 text-center">
                    <h3 className="text-sm font-semibold">
                        Your ideas are waiting.
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-foreground/70">
                        {pickUp.description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}