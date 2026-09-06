import {
    Edit3,
    Eye,
    MoreHorizontal,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    buildEditJournalRoute,
} from "@/constants/app/routes";

import type {
    JournalSummary,
} from "@/types/api/journal";

interface JournalCardFooterProps {
    journal: JournalSummary;
    onView?: (
        journal: JournalSummary,
    ) => void;
}

export default function JournalCardFooter({
    journal,
    onView,
}: JournalCardFooterProps) {
    const navigate =
        useNavigate();

    const handleEditJournal = () => {
        navigate(
            buildEditJournalRoute(
                journal.id,
            ),
        );
    };

    return (
        <div className="mt-3 flex items-center justify-between text-xs text-white/80">
            <span>
                Updated{" "}
                {new Date(
                    journal.updatedAt ??
                        journal.createdAt,
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    },
                )}
            </span>

            <div className="flex items-center gap-1.5">
                {/* View */}
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                        onView?.(journal)
                    }
                    className="
                        h-7
                        gap-1
                        rounded-full
                        px-2.5
                        text-xs
                        text-white
                        hover:bg-white/15
                        hover:text-white
                    "
                >
                    <Eye className="h-3.5 w-3.5" />

                    View
                </Button>

                {/* More actions */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={`More options for ${journal.title}`}
                            className="
                                h-7
                                w-7
                                rounded-full
                                text-white
                                hover:bg-white/15
                                hover:text-white
                            "
                        >
                            <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="center"
                        className="rounded-md"
                    >
                        <DropdownMenuItem
                            onSelect={
                                handleEditJournal
                            }
                            className="rounded-md"
                        >
                            <Edit3 className="mr-2 h-4 w-4" />

                            Edit Journal
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}