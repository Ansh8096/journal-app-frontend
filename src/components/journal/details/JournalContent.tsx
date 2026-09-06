import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { moodConfig } from "./JournalDetailsConfig";
import { moodBadgeStyles } from "./JournalDetailsConfig";
import type { JournalResponse } from "@/types/api/journal";
import RichTextViewer from "@/components/common/RichTextViewer";

interface JournalContentProps {
    journal: JournalResponse;
}

export default function JournalContent({
    journal,
}: JournalContentProps) {
    const mood = moodConfig[journal.mood];
    const badgeStyle = moodBadgeStyles[journal.mood];
    const MoodIcon = mood.icon;

    return (
        <section className="space-y-5">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                    {journal.title}
                </h1>

                <Badge
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full border-0 px-3 py-1 text-xs font-medium ${badgeStyle.bg} ${badgeStyle.text}`}
                >
                    <MoodIcon className="h-3.5 w-3.5" />
                    {mood.label}
                </Badge>


            </div>

            {/* My Journal Card */}
            <Card
                className="
                    border-violet-100
                    bg-gradient-to-br
                    from-white
                    via-white
                    to-violet-50/40
                    shadow-sm
                    dark:border-violet-900/40
                    dark:from-background
                    dark:via-background
                    dark:to-violet-950/30
                "
            >
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <div
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-violet-100
                                dark:bg-violet-900/40
                            "
                        >
                            <BookOpen
                                className="
            h-4
            w-4
            text-violet-600
            dark:text-violet-400
        "
                            />
                        </div>
                        My Journal
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                    <RichTextViewer
                        html={journal.content}
                        className="
                            prose
                            prose-neutral
                            max-w-none
                            dark:prose-invert
                        "
                    />
                </CardContent>
            </Card>
        </section>
    );
}