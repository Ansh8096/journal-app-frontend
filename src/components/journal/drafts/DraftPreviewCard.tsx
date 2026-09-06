import {
    ArrowRight,
    MoreVertical,
    Trash2,
} from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { buildEditDraftRoute } from "@/constants/routes";

import {
    useDeleteDraft,
} from "@/hooks/journal/useDeleteDraft";

import type {
    DraftCardData,
} from "@/types/journal/draft.types";

import {
    formatRelativeTime,
} from "@/utils/formatRelativeTime";

import DeleteDraftDialog from "./DeleteDraftDialog";

/*
 * Reuse the same mood configuration used by
 * Journal Details.
 */
import {
    MOOD_OPTIONS,
} from "@/constants/journal/journal-details";

interface DraftPreviewCardProps {
    draft: DraftCardData;
}

export default function DraftPreviewCard({
    draft,
}: DraftPreviewCardProps) {
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
        draft.title.trim() ||
        "Untitled Draft";

    const handleContinueWriting =
        () => {
            navigate(
                buildEditDraftRoute(
                    draft.id,
                ),
            );
        };

    const handleConfirmDelete =
        () => {
            deleteDraft(
                {
                    journalId: draft.id,
                },
                {
                    onSuccess: () => {
                        setIsDeleteDialogOpen(
                            false,
                        );
                    },
                },
            );
        };

    /*
     * Show only the first tag.
     */
    const primaryTag =
        draft.tags[0];

    /*
     * Count the remaining tags.
     */
    const remainingTagCount =
        Math.max(
            draft.tags.length - 1,
            0,
        );

    const formatTag = (
        tag: string,
    ) =>
        tag.startsWith("#")
            ? tag
            : `#${tag}`;

    /*
     * Find the exact mood configuration
     * used by Journal Details.
     */
    const moodOption =
        draft.mood
            ? MOOD_OPTIONS.find(
                  (option) =>
                      option.value ===
                      draft.mood,
              )
            : undefined;

    const MoodIcon =
        moodOption?.icon;

    /*
     * Chip base.
     */
    const chipClassName =
        "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-none";

    /*
     * Keep the same mood label as the
     * shared Journal Details config.
     */
    const moodLabel =
        moodOption?.label ??
        (draft.mood
            ? draft.mood
                  .charAt(0)
                  .toUpperCase() +
              draft.mood
                  .slice(1)
                  .toLowerCase()
            : "");

    /*
     * Reuse the exact mood colors from
     * Journal Details.
     */
    const moodClassName =
        moodOption
            ? `${moodOption.bgClass} ${moodOption.colorClass}`
            : "bg-muted text-muted-foreground";

    return (
        <>
            <Card
                className="
                    group
                    flex
                    flex-col
                    gap-0
                    overflow-hidden
                    rounded-md
                    p-0
                    mb-0.5
                    transition-all
                    duration-200
                    ease-out
                    hover:-translate-y-0.5
                    hover:shadow-md
                "
            >
                {/* Cover */}
                <div
                    className="
                        relative
                        h-23
                        w-full
                        shrink-0
                        overflow-hidden
                        bg-gradient-to-br
                        from-slate-200
                        via-slate-100
                        to-blue-100
                        dark:from-slate-800
                        dark:via-slate-900
                        dark:to-slate-800
                    "
                >
                    {draft.coverImageUrl ? (
                        <img
                            src={
                                draft.coverImageUrl
                            }
                            alt=""
                            className="
                                h-full
                                w-full
                                rounded-none
                                object-cover
                                transition-transform
                                duration-300
                                ease-out
                                group-hover:scale-105
                            "
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <div className="text-xs font-medium text-muted-foreground/60">
                                Draft
                            </div>
                        </div>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                        >
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className={`absolute right-1.5 top-1.5 h-7 w-7 rounded-full transition-colors duration-200 ease-out ${
                                    draft.coverImageUrl
                                        ? "text-white drop-shadow-md hover:bg-white/20 focus-visible:bg-white/20"
                                        : "text-foreground/70 hover:bg-foreground/10 focus-visible:bg-foreground/10"
                                }`}
                                aria-label={`More actions for ${displayTitle}`}
                                disabled={
                                    isDeletePending
                                }
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                disabled={
                                    isDeletePending
                                }
                                onSelect={() =>
                                    setIsDeleteDialogOpen(
                                        true,
                                    )
                                }
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Draft
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Content */}
                <CardContent className="flex flex-col gap-2 p-3.5">
                    {/* Title + updated */}
                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold transition-colors duration-200 ease-out group-hover:text-violet-600 dark:group-hover:text-violet-400">
                            {displayTitle}
                        </h3>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                            Updated{" "}
                            {formatRelativeTime(
                                draft.updatedAt,
                            )}
                        </p>
                    </div>

                    {/* Mood + tags */}
                    <div className="flex h-5 items-center gap-1 overflow-hidden">
                        {MoodIcon && (
                            <span
                                className={`${chipClassName} max-w-[6.5rem] ${moodClassName}`}
                            >
                                <MoodIcon className="h-2.5 w-2.5 shrink-0" />

                                <span className="truncate">
                                    {moodLabel}
                                </span>
                            </span>
                        )}

                        {primaryTag && (
                            <span
                                className={`
                                    ${chipClassName}
                                    max-w-[5.5rem]
                                    bg-violet-50
                                    text-violet-700
                                    dark:bg-violet-900/30
                                    dark:text-violet-300
                                `}
                            >
                                <span className="truncate">
                                    {formatTag(
                                        primaryTag,
                                    )}
                                </span>
                            </span>
                        )}

                        {remainingTagCount >
                            0 && (
                            <span
                                className={`
                                    ${chipClassName}
                                    bg-violet-50
                                    text-violet-700
                                    dark:bg-violet-900/30
                                    dark:text-violet-300
                                `}
                            >
                                +
                                {
                                    remainingTagCount
                                }
                            </span>
                        )}
                    </div>

                    {/* Continue Writing */}
                    <Button
                        type="button"
                        variant="ghost"
                        className="
                            h-8
                            w-full
                            justify-center
                            gap-1.5
                            rounded-lg
                            bg-violet-50
                            text-xs
                            font-medium
                            text-violet-700
                            transition-colors
                            duration-200
                            ease-out
                            hover:bg-violet-100
                            active:bg-violet-200
                            dark:bg-violet-900/30
                            dark:text-violet-300
                            dark:hover:bg-violet-900/50
                        "
                        disabled={
                            isDeletePending
                        }
                        onClick={
                            handleContinueWriting
                        }
                    >
                        Continue Writing

                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                    </Button>
                </CardContent>
            </Card>

            {/* Delete confirmation */}
            <DeleteDraftDialog
                open={
                    isDeleteDialogOpen
                }
                draftTitle={
                    displayTitle
                }
                isDeleting={
                    isDeletePending
                }
                onCancel={() =>
                    setIsDeleteDialogOpen(
                        false,
                    )
                }
                onConfirm={
                    handleConfirmDelete
                }
            />
        </>
    );
}