import {
    Circle,
    History,
    Loader2,
    RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useDraftList } from "@/hooks/journal/useDraftList";

import { mapJournalSummaryToDraftCard } from "@/utils/journals/drafts/draft.mapper";
import { formatRelativeTime } from "@/utils/formatting/formatRelativeTime";

const ACTIVITY_DOT_COLORS = [
    "text-emerald-500",
    "text-blue-500",
    "text-violet-500",
];

export default function RecentActivityCard() {
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
    } = useDraftList({
        page: 0,
        size: 4,
        sort: "updatedAt,desc",
    });

    const activities =
        data?.journals.map(
            mapJournalSummaryToDraftCard,
        ) ?? [];

    return (
        <Card
            className="
                group
                rounded-2xl
                border
                border-emerald-200/70
                bg-emerald-50/65
                transition-all
                duration-200
                ease-out
                hover:-translate-y-0.5
                hover:shadow-md
                dark:border-emerald-800/50
                dark:bg-emerald-950/40
            "
        >
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                    <History
                        className="
                            h-5
                            w-5
                            text-emerald-600
                            dark:text-emerald-400
                            transition-transform
                            duration-200
                            ease-out
                            group-hover:-rotate-12
                        "
                    />

                    Recent Activity
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                {/* Loading */}
                {isLoading && (
                    <div className="space-y-3">
                        {Array.from({
                            length: 3,
                        }).map((_, index) => (
                            <div
                                key={index}
                                className="flex gap-2.5"
                            >
                                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-muted" />

                                <div className="min-w-0 flex-1 space-y-1.5">
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />

                                    <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {!isLoading &&
                    isError && (
                        <div className="rounded-lg border border-dashed p-4 text-center">
                            <p className="text-sm font-medium">
                                Unable to load recent activity
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                Please try again.
                            </p>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-3 transition-colors duration-200 ease-out"
                                onClick={() =>
                                    refetch()
                                }
                                disabled={
                                    isFetching
                                }
                            >
                                {isFetching ? (
                                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                                )}

                                Try Again
                            </Button>
                        </div>
                    )}

                {/* Empty */}
                {!isLoading &&
                    !isError &&
                    activities.length === 0 && (
                        <div className="rounded-lg border border-dashed p-5 text-center">
                            <History className="mx-auto h-5 w-5 text-muted-foreground" />

                            <p className="mt-2 text-sm font-medium">
                                No recent activity
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                Your recent draft activity will appear here.
                            </p>
                        </div>
                    )}

                {/* Activities */}
                {!isLoading &&
                    !isError &&
                    activities.length > 0 && (
                        <div className="space-y-3">
                            {activities.map(
                                (
                                    activity,
                                    index,
                                ) => (
                                    <div
                                        key={
                                            activity.id
                                        }
                                        className="flex gap-2.5"
                                    >
                                        <Circle
                                            className={`mt-1.5 h-1.5 w-1.5 shrink-0 fill-current ${
                                                ACTIVITY_DOT_COLORS[
                                                    index %
                                                        ACTIVITY_DOT_COLORS.length
                                                ]
                                            }`}
                                        />

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold">
                                                {
                                                    activity.title
                                                }
                                            </p>

                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                Updated{" "}
                                                {formatRelativeTime(
                                                    activity.updatedAt,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    )}
            </CardContent>
        </Card>
    );
}