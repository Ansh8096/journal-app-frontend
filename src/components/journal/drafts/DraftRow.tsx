import {
    MoreHorizontal,
    Trash2,
} from "lucide-react";

import {
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { buildEditDraftRoute } from "@/constants/app/routes";

import { formatRelativeTime } from "@/utils/formatting/formatRelativeTime";

import { useDeleteDraft } from "@/hooks/journal/useDeleteDraft";

import type {
    DraftCardData,
} from "@/types/journal/draft.types";

import DeleteDraftDialog from "./DeleteDraftDialog";

interface DraftRowProps {
    draft: DraftCardData;
}

/*
 * Mood is no longer shown as a full text badge in the row
 * (the target layout has no room for it), but it isn't
 * dropped either — it's encoded as the color of the small
 * dot next to the updated time, with the mood name still
 * available via a native tooltip on hover.
 */
const moodDotColors: Record<string, string> = {
    HAPPY: "bg-green-500",
    CALM: "bg-teal-500",
    GRATEFUL: "bg-purple-500",
    NEUTRAL: "bg-muted-foreground/40",
    EXCITED: "bg-yellow-500",
    ANGRY: "bg-red-500",
    FOCUSED: "bg-blue-500",
    STRESSED: "bg-orange-500",
    MOTIVATED: "bg-amber-500",
};

function getMoodDotColor(mood: string | null): string {
    if (!mood) {
        return "bg-muted-foreground/40";
    }

    return moodDotColors[mood] ?? "bg-muted-foreground/40";
}

function formatMoodLabel(mood: string | null): string | undefined {
    if (!mood) {
        return undefined;
    }

    return (
        mood.charAt(0).toUpperCase() +
        mood.slice(1).toLowerCase()
    );
}

export default function DraftRow({
    draft,
}: DraftRowProps) {
    const navigate =
        useNavigate();

    const {
        mutate: deleteDraft,
        isPending: isDeletePending,
    } = useDeleteDraft();

    const [
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
    ] = useState(false);

    const displayTitle =
        draft.title ||
        "Untitled Draft";

    const handleContinue = () => {
        navigate(
            buildEditDraftRoute(
                draft.id,
            ),
        );
    };

    const handleConfirmDelete = () => {
        deleteDraft(
            {
                journalId: draft.id,
            },
            {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                },
            },
        );
    };

    const dotColor = getMoodDotColor(draft.mood);
    const moodLabel = formatMoodLabel(draft.mood);

    const thumbnail = (
        <div className="
            h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br
            from-slate-200
            via-slate-100
            to-blue-100
            dark:from-slate-800
            dark:via-slate-900
            dark:to-slate-800"
        >
            {draft.coverImageUrl ? (
                <img
                    src={draft.coverImageUrl}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
            ) : (
                <div className="flex h-full items-center justify-center text-[10px] font-medium text-muted-foreground/60">
                    Draft
                </div>
            )}
        </div>
    );

    const updatedWithDot = (
        <div
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
            title={
                moodLabel
                    ? `Mood: ${moodLabel}`
                    : undefined
            }
        >
            <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`}
            />

            <span className="truncate">
                Updated {formatRelativeTime(draft.updatedAt)}
            </span>
        </div>
    );

    /*
     * Explicit indigo classes instead of the bg-primary
     * token — the app's --primary theme variable isn't
     * resolving to purple/indigo, so this hardcodes the
     * target's soft-indigo fill directly rather than
     * inheriting a gray-looking token.
     */
    const continueButton = (
        <Button
            type="button"
            size="sm"
            className="
                h-9
                shrink-0
                rounded-lg
                bg-violet-100
                px-3.5
                text-xs
                font-medium
                text-violet-700
                shadow-none
                transition-colors
                duration-200
                ease-out
                hover:bg-violet-200
                hover:text-violet-700
                active:scale-[0.98]
                active:bg-violet-200/80
                focus-visible:ring-2
                focus-visible:ring-violet-400
                focus-visible:ring-offset-2
                dark:bg-violet-900/30
                dark:text-violet-300
                dark:hover:bg-violet-900/50
                dark:hover:text-violet-200
                dark:active:bg-violet-900/60
            "
            disabled={isDeletePending}
            onClick={handleContinue}
        >
            Continue
        </Button>
    );

    const moreActionsMenu = (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 shrink-0 rounded-lg text-muted-foreground transition-colors duration-200 ease-out hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-muted-foreground/30 focus-visible:ring-offset-2"
                    aria-label={`More actions for ${displayTitle}`}
                    disabled={isDeletePending}
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className="text-destructive transition-colors duration-150 ease-out focus:text-destructive"
                    disabled={isDeletePending}
                    onSelect={() =>
                        setIsDeleteDialogOpen(true)
                    }
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Draft
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <>
            <div className="group rounded-lg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-muted/40 hover:shadow-sm focus-within:-translate-y-0.5 focus-within:bg-muted/40 focus-within:shadow-sm">
                {/* Mobile layout (stacked) */}
                <div className="flex flex-col gap-2 p-3 sm:hidden">
                    <div className="flex items-start gap-3">
                        {thumbnail}

                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-semibold transition-colors duration-200 ease-out group-hover:text-violet-700">
                                {displayTitle}
                            </h3>

                            <p className="mt-1 truncate text-xs text-muted-foreground">
                                {draft.preview ||
                                    "No content yet."}
                            </p>
                        </div>

                        {moreActionsMenu}
                    </div>

                    <div className="flex items-center justify-between gap-3 pl-[68px]">
                        {updatedWithDot}
                        {continueButton}
                    </div>
                </div>

                {/* Desktop / tablet layout (grid row) */}
                <div
                    className="
                        hidden
                        items-center
                        gap-4
                        px-4
                        py-3
                        sm:grid
                        sm:grid-cols-[56px_minmax(0,1fr)_170px_92px_40px]
                    "
                >
                    {thumbnail}

                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold transition-colors duration-200 ease-out group-hover:text-violet-700 dark:group-hover:text-violet-400">
                            {displayTitle}
                        </h3>

                        <p className="mt-1 truncate text-xs text-muted-foreground">
                            {draft.preview ||
                                "No content yet."}
                        </p>
                    </div>

                    {updatedWithDot}

                    {continueButton}

                    {moreActionsMenu}
                </div>

            </div>

            {/* Delete confirmation */}
            <DeleteDraftDialog
                open={isDeleteDialogOpen}
                draftTitle={displayTitle}
                isDeleting={isDeletePending}
                onCancel={() =>
                    setIsDeleteDialogOpen(false)
                }
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}