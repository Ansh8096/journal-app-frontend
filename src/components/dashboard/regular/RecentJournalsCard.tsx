import {
    ArrowRight,
    RefreshCw,
    Smile,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import RecentJournalRow from "./RecentJournalRow";
import type { RecentJournalRowData } from "./RecentJournalRow";
import RecentJournalsSkeleton from "./skeleton/RecentJournalsSkeleton";

import { useJournalList } from "@/hooks/journal/useJournalList";

import type {
    JournalSearchCriteria,
    JournalSummary,
} from "@/types/api/journal";

import { journalConstants } from "@/constants/journal/journal-constants";
import { DEFAULT_JOURNAL_SORT } from "@/constants/journal/journal-sort";

// IMPORTANT:
// Reuse the exact mood configuration from Journal Details.
import { MOOD_OPTIONS } from "@/constants/journal/journal-details";

import { htmlToText } from "@/utils/htmlToText";


// ---------------------------------------------------------
// Get the exact mood configuration used by Journal Details
// ---------------------------------------------------------

function getMoodOption(mood: string) {
    return MOOD_OPTIONS.find(
        (option) => option.value === mood
    );
}


// ---------------------------------------------------------
// Date formatting
// ---------------------------------------------------------

function formatJournalDate(createdAt: string): string {
    return new Date(createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function formatJournalTime(createdAt: string): string {
    return new Date(createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    });
}


// ---------------------------------------------------------
// Map API journal → Recent Journal Row
// ---------------------------------------------------------

const recentJournalsCriteria: JournalSearchCriteria = {
    page: journalConstants.pagination.defaultPage,
    size: 4,
    sort: DEFAULT_JOURNAL_SORT,
};

function mapJournalToRecentJournal(
    journal: JournalSummary
): RecentJournalRowData {

    const moodOption = getMoodOption(
        journal.mood
    );

    return {
        id: journal.id,

        title: journal.title,

        preview: htmlToText(
            journal.contentPreview
        ),

        mood: journal.mood,

        // Reuse the exact colors from Journal Details
        moodColor: moodOption
            ? `${moodOption.bgClass} ${moodOption.colorClass}`
            : "bg-muted text-muted-foreground",

        // Reuse the exact Lucide icon from Journal Details
        moodIcon:
            moodOption?.icon ??
            Smile,

        date: formatJournalDate(
            journal.createdAt
        ),

        time: formatJournalTime(
            journal.createdAt
        ),

        favorite: journal.favorite,

        image: journal.coverImageUrl,
    };
}


// ---------------------------------------------------------
// Component
// ---------------------------------------------------------

export default function RecentJournalsCard() {

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useJournalList(
        recentJournalsCriteria
    );

    /*
     * During the initial request there is no data yet.
     *
     * Show the full skeleton instead of an empty card.
     */
    if (isLoading) {
        return <RecentJournalsSkeleton />;
    }

    /*
     * If an initial request fails and we have no cached data,
     * show the error state.
     */
    if (isError && !data) {
        return (
            <Card>
                <CardContent className="p-6">

                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">

                        <div>
                            <h2 className="text-xl font-semibold">
                                Recent Journals
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Your latest journal entries.
                            </p>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                        >
                            <Link to="/journals">
                                View all
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                    </div>

                    {/* Error */}
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-10 text-center">

                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            <RefreshCw className="h-6 w-6 text-muted-foreground" />
                        </div>

                        <h3 className="text-base font-semibold">
                            Unable to load recent journals
                        </h3>

                        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            We couldn't load your latest journal entries.
                            Please try again.
                        </p>

                        <Button
                            type="button"
                            variant="outline"
                            className="mt-4"
                            onClick={() => refetch()}
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>

                    </div>

                </CardContent>
            </Card>
        );
    }


    const journals =
        data?.journals ?? [];


    /*
     * Successful request, but the user has no journals.
     */
    if (journals.length === 0) {
        return (
            <Card>
                <CardContent className="p-6">

                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">

                        <div>
                            <h2 className="text-xl font-semibold">
                                Recent Journals
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Your latest journal entries.
                            </p>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                        >
                            <Link to="/journals">
                                View all
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                    </div>

                    {/* Empty State */}
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-10 text-center">

                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            <Smile className="h-6 w-6 text-muted-foreground" />
                        </div>

                        <h3 className="text-base font-semibold">
                            No journals yet
                        </h3>

                        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            Start writing your first journal entry and it
                            will appear here.
                        </p>

                        <Button
                            className="mt-4"
                            asChild
                        >
                            <Link to="/journals/new">
                                Create Journal
                            </Link>
                        </Button>

                    </div>

                </CardContent>
            </Card>
        );
    }


    const recentJournals =
        journals.map(
            mapJournalToRecentJournal
        );


    return (
        <Card>
            <CardContent className="p-6">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-semibold">
                            Recent Journals
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Your latest journal entries.
                        </p>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                    >
                        <Link to="/journals">
                            View all
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                </div>


                {/* Background fetching indicator */}
                {isFetching && (
                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-muted-foreground
                        "
                    >
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />

                        Updating recent journals...
                    </div>
                )}


                {/* Journals */}
                <div className="divide-y rounded-lg border">

                    {recentJournals.map(
                        (journal) => (
                            <RecentJournalRow
                                key={journal.id}
                                journal={journal}
                            />
                        )
                    )}

                </div>

            </CardContent>
        </Card>
    );
}