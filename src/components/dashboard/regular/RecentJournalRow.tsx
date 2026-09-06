import {
    EllipsisVertical,
    Star,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { buildJournalDetailsRoute } from "@/constants/app/routes";

import {
    journalRowConfig,
} from "./Config";

export interface RecentJournalRowData {
    id: string;
    title: string;
    preview: string;
    mood: string;
    moodColor: string;
    moodIcon: LucideIcon;
    date: string;
    time: string;
    favorite: boolean;
    image: string | null;
}

interface RecentJournalRowProps {
    journal: RecentJournalRowData;
}

export default function RecentJournalRow({
    journal,
}: RecentJournalRowProps) {
    const MoodIcon = journal.moodIcon;

    const navigate = useNavigate();

    
    const journalDetailsRoute =
        buildJournalDetailsRoute(
            journal.id,
        );

    const handleViewJournal = () => {
        navigate(
            journalDetailsRoute,
        );
    };

    const moodIconBadge = (
        sizeClassName: string,
    ) => (
        <div
            className={`
                flex
                shrink-0
                items-center
                justify-center
                rounded-full
                ${journal.moodColor}
                transition-colors
                duration-200
                ease-out
                ${sizeClassName}
            `}
        >
            <MoodIcon
                aria-hidden="true"
                className="
                    h-1/2
                    w-1/2
                    text-current
                "
            />
        </div>
    );

    const favoriteStar = (
        <Star
            aria-label={
                journal.favorite
                    ? "Favorite journal"
                    : "Not a favorite journal"
            }
            className={`
                h-5
                w-5
                shrink-0
                transition-colors
                duration-200
                ease-out
                ${
                    journal.favorite
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                }
            `}
        />
    );

    const actionsMenu = (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    aria-label={`Actions for ${journal.title}`}
                    className="
                        inline-flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        text-muted-foreground
                        outline-none
                        transition-colors
                        duration-200
                        ease-out
                        hover:bg-muted
                        hover:text-foreground
                        focus-visible:ring-2
                        focus-visible:ring-primary
                        focus-visible:ring-offset-2
                    "
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <EllipsisVertical className="h-5 w-5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <DropdownMenuItem
                    onSelect={handleViewJournal}
                >
                    View Journal
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    const coverImage = journal.image ? (
        <Link
            to={journalDetailsRoute}
            aria-label={`View ${journal.title}`}
            className="
                block
                shrink-0
                overflow-hidden
                rounded-lg
                outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
            "
        >
            <img
                src={journal.image}
                alt=""
                className="
                    h-16
                    w-16
                    rounded-lg
                    object-cover
                    shadow-sm
                    transition-transform
                    duration-200
                    ease-out
                    hover:scale-105
                "
            />
        </Link>
    ) : (
        <Link
            to={journalDetailsRoute}
            aria-label={`View ${journal.title}`}
            className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-lg
                border
                border-dashed
                border-border
                bg-muted/40
                text-center
                text-xs
                text-muted-foreground
                outline-none
                transition-colors
                duration-200
                ease-out
                hover:bg-muted
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
            "
        >
            <img
                src={journalRowConfig.fallback.coverImage}
                alt=""
                className="
                    h-full
                    w-full
                    rounded-lg
                    object-cover
                    shadow-sm
                    transition-transform
                    duration-200
                    ease-out
                    hover:scale-105
                "
            />
        </Link>
    );

    return (
        <div
            className="
                group
                rounded-xl
                border
                border-border/60
                bg-card
                shadow-sm
                transition-all
                duration-200
                ease-out
                hover:-translate-y-0.5
                hover:border-border
                hover:bg-muted/20
                hover:shadow-md
            "
        >
            {/* Mobile layout */}
            <div className="flex flex-col gap-3 p-4 sm:hidden">

                <div className="flex items-start gap-3">
                    {moodIconBadge("h-10 w-10")}

                    <Link
                        to={journalDetailsRoute}
                        className="
                            min-w-0
                            flex-1
                            rounded-md
                            outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary
                            focus-visible:ring-offset-2
                        "
                    >
                        <h3
                            className="
                                truncate
                                font-semibold
                                transition-colors
                                duration-200
                                ease-out
                                group-hover:text-violet-700
                                dark:group-hover:text-violet-400
                            "
                        >
                            {journal.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {journal.preview}
                        </p>
                    </Link>

                    {actionsMenu}
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <Badge className={journal.moodColor}>
                            {journal.mood}
                        </Badge>

                        <span className="truncate text-xs text-muted-foreground">
                            {journal.date} · {journal.time}
                        </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        {favoriteStar}
                        {coverImage}
                    </div>
                </div>
            </div>

            {/* Tablet / desktop layout */}
            <div
                className="
                    hidden
                    sm:grid
                    sm:grid-cols-[56px_1fr_minmax(88px,120px)_minmax(88px,120px)_72px_60px]
                    sm:items-center
                    sm:gap-3
                    sm:p-4
                    lg:gap-4
                "
            >
                {/* Mood Icon */}
                <div className="flex justify-center">
                    {moodIconBadge("h-12 w-12")}
                </div>

                {/* Journal Information */}
                <Link
                    to={journalDetailsRoute}
                    className="
                        min-w-0
                        rounded-md
                        outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary
                        focus-visible:ring-offset-2
                    "
                >
                    <h3
                        className="
                            truncate
                            font-semibold
                            transition-colors
                            duration-200
                            ease-out
                            group-hover:text-violet-700
                            dark:group-hover:text-violet-400
                        "
                    >
                        {journal.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {journal.preview}
                    </p>
                </Link>

                {/* Mood */}
                <Badge
                    className={`${journal.moodColor} justify-self-start`}
                >
                    {journal.mood}
                </Badge>

                {/* Date / Time */}
<div className="text-sm">
    <p
        className="
            font-medium
            transition-colors
            duration-200
            ease-out
            group-hover:text-violet-700
            dark:group-hover:text-violet-400
        "
    >
        {journal.date}
    </p>

    <p
        className="
            text-muted-foreground
            transition-colors
            duration-200
            ease-out
            group-hover:text-violet-600
            dark:group-hover:text-violet-400
        "
    >
        {journal.time}
    </p>
</div>

                {/* Cover Image */}
                {coverImage}

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                    {favoriteStar}
                    {actionsMenu}
                </div>
            </div>
        </div>
    );
}