import {
    CalendarDays,
    FileText,
    Heart,
    ImageIcon,
    PencilLine,
    Star,
    Tags,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    formatJournalImageCount,
    getJournalDateTime,
    getWordCount
} from "@/utils/journals/journal-utils";

import { Badge } from "@/components/ui/badge";
import { moodConfig } from "./JournalDetailsConfig";
import { moodBadgeStyles } from "./JournalDetailsConfig";
import type { JournalResponse } from "@/types/api/journal";

interface JournalInfoCardProps {
    journal: JournalResponse;
}

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-[112px_minmax(0,1fr)] items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
                {icon}
                <span className="text-xs">{label}</span>
            </div>

            <div className="min-w-0 text-left text-xs font-medium text-foreground">
                {value}
            </div>
        </div>
    );
}

export default function JournalInfoCard({
    journal,
}: JournalInfoCardProps) {
    const mood = moodConfig[journal.mood];
    const badgeStyle = moodBadgeStyles[journal.mood];

    const created = getJournalDateTime(journal.createdAt);
    const updated = getJournalDateTime(journal.updatedAt);

    const MoodIcon = mood.icon;

    return (
        <Card
            className="
                rounded-2xl
                border-violet-200
                bg-gradient-to-br
                from-violet-50
                via-violet-50/70
                to-violet-100
                shadow-sm
                transition-all
                duration-300
                hover:shadow-md
                hover:border-violet-300
                dark:border-violet-900/40
                dark:from-background
                dark:via-violet-950/20
                dark:to-violet-950/30
            "
        >
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    Journal Info
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <InfoRow
                    icon={<Heart className="h-4 w-4" />}
                    label="Mood"
                    value={
                        <Badge
                            className={`gap-1.5 rounded-full border-0 transition-colors ${badgeStyle.bg} ${badgeStyle.text}`}
                        >
                            <MoodIcon className="h-3.5 w-3.5" />
                            {mood.label}
                        </Badge>
                    }
                />

                <InfoRow
                    icon={<Star className="h-4 w-4" />}
                    label="Favorite"
                    value={
                        <span className="flex items-center gap-1.5">
                            <Star
                                className={`h-3.5 w-3.5 ${journal.favorite
                                        ? "fill-amber-400 text-amber-400 dark:fill-amber-300 dark:text-amber-300"
                                        : "text-muted-foreground"
                                    }`}
                            />
                            {journal.favorite ? "Yes" : "No"}
                        </span>
                    }
                />

                <InfoRow
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Created"
                    value={
                        <span>
                            {created.date}
                            <span className="mx-1.5 text-muted-foreground">
                                •
                            </span>
                            {created.time}
                        </span>
                    }
                />

                <InfoRow
                    icon={<PencilLine className="h-4 w-4" />}
                    label="Last Updated"
                    value={
                        <span>
                            {updated.date}
                            <span className="mx-1.5 text-muted-foreground">
                                •
                            </span>
                            {updated.time}
                        </span>
                    }
                />

                <InfoRow
                    icon={<FileText className="h-4 w-4" />}
                    label="Word Count"
                    value={`${getWordCount(journal.content)} words`}
                />

                <InfoRow
                    icon={<ImageIcon className="h-4 w-4" />}
                    label="Images"
                    value={formatJournalImageCount(journal.images)}
                />

                <div className="border-t border-violet-100 pt-4 dark:border-violet-900/30">
                    <div className="mb-3 flex items-center gap-2">
                        <Tags className="h-4 w-4 text-violet-600 dark:text-violet-400" />

                        <span className="font-medium">
                            Tags
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {journal.tags.map((tag) => (
                            <Badge
                                key={tag}
                                className="
                                    rounded-full
                                    border-0
                                    bg-violet-100
                                    px-3
                                    py-1
                                    text-violet-700
                                    transition-colors
                                    hover:bg-violet-200
                                    dark:bg-violet-900/30
                                    dark:text-violet-300
                                    dark:hover:bg-violet-900/50
                                "
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}