// DraftsOverviewCard.tsx
import {
    BarChart3,
    CalendarDays,
    Clock,
    FileText,
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

import {
    useDraftOverview,
} from "@/hooks/journal/useDraftOverview";

interface OverviewStatistic {
    key:
        | "totalDrafts"
        | "updatedToday"
        | "averageDraftAgeDays";

    label: string;

    icon: typeof FileText;

    /*
     * Per-stat color treatment — each tile gets its own tinted
     * background + a matching icon-circle color, instead of the
     * previous uniform gray treatment.
     */
    tileClassName: string;
    tileHoverClassName: string;
    iconWrapClassName: string;
    iconClassName: string;
}

const OVERVIEW_STATISTICS: OverviewStatistic[] = [
    {
        key: "totalDrafts",
        label: "Total Drafts",
        icon: FileText,
        tileClassName:
            "bg-violet-50 dark:bg-violet-950/30",
        tileHoverClassName:
            "hover:bg-violet-100 dark:hover:bg-violet-900/40",
        iconWrapClassName:
            "bg-violet-100 dark:bg-violet-900/40",
        iconClassName:
            "text-violet-600 dark:text-violet-400",
    },
    {
        key: "updatedToday",
        label: "Updated Today",
        icon: Clock,
        tileClassName:
            "bg-orange-50 dark:bg-orange-950/30",
        tileHoverClassName:
            "hover:bg-orange-100 dark:hover:bg-orange-900/40",
        iconWrapClassName:
            "bg-orange-100 dark:bg-orange-900/40",
        iconClassName:
            "text-orange-600 dark:text-orange-400",
    },
    {
        key: "averageDraftAgeDays",
        label: "Avg. Days Saved",
        icon: CalendarDays,
        tileClassName:
            "bg-green-50 dark:bg-green-950/30",
        tileHoverClassName:
            "hover:bg-green-100 dark:hover:bg-green-900/40",
        iconWrapClassName:
            "bg-green-100 dark:bg-green-900/40",
        iconClassName:
            "text-green-600 dark:text-green-400",
    },
];

export default function DraftsOverviewCard() {
    const {
        data: overview,
        isLoading,
        isError,
        refetch,
        isFetching,
    } = useDraftOverview();

    /*
     * ------------------------------------------------
     * LOADING
     * ------------------------------------------------
    */

    if (isLoading) {
        return (

            <Card className="rounded-md">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-white dark:bg-violet-500">
                            <BarChart3 className="h-4 w-4" />
                        </span>

                        Drafts Overview
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                        {OVERVIEW_STATISTICS.map(
                            (stat) => {
                                const Icon =
                                    stat.icon;

                                return (
                                    <div
                                        key={
                                            stat.key
                                        }
                                        className="rounded-xl bg-muted/30 p-3 text-center"
                                    >
                                        <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                            <Icon className="h-4 w-4 text-muted-foreground" />
                                        </div>

                                        <div className="mx-auto h-6 w-8 animate-pulse rounded bg-muted" />

                                        <div className="mx-auto mt-2 h-3 w-16 animate-pulse rounded bg-muted" />
                                    </div>
                                );
                            },
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    /*
     * ------------------------------------------------
     * ERROR
     * ------------------------------------------------
     */

    if (isError || !overview) {
        return (
            <Card className="rounded-md">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-white dark:bg-violet-500">
                            <BarChart3 className="h-4 w-4" />
                        </span>

                        Drafts Overview
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="rounded-lg border border-dashed p-5 text-center">
                        <p className="text-sm font-medium">
                            Unable to load draft overview
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            We couldn't load your draft statistics.
                            Please try again.
                        </p>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-4 transition-colors duration-200 ease-out"
                            onClick={() =>
                                refetch()
                            }
                            disabled={
                                isFetching
                            }
                        >
                            {isFetching ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <RefreshCw className="mr-2 h-4 w-4" />
                            )}

                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    /*
     * ------------------------------------------------
     * SUCCESS
     * ------------------------------------------------
     */

    const values: Record<
        OverviewStatistic["key"],
        number
    > = {
        totalDrafts:
            overview.totalDrafts,

        updatedToday:
            overview.updatedToday,

        averageDraftAgeDays:
            overview.averageDraftAgeDays,
    };

    return (
        <Card
            className="
                group
                rounded-md
                transition-all
                duration-200
                ease-out
                hover:-translate-y-0.5
                hover:shadow-md
            "
        >
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-white dark:bg-violet-500 transition-transform duration-200 ease-out group-hover:scale-105">
                        <BarChart3 className="h-4 w-4" />
                    </span>

                    Drafts Overview
                </CardTitle>
            </CardHeader>

            <CardContent >
                <div className="grid grid-cols-3 gap-2">
                    {OVERVIEW_STATISTICS.map(
                        (stat) => {
                            const Icon =
                                stat.icon;

                            return (
                                <div
                                    key={
                                        stat.key
                                    }
                                    className={`group/tile rounded-sm p-2 text-center transition-colors duration-200 ease-out ${stat.tileClassName} ${stat.tileHoverClassName}`}
                                >
                                    <div
                                        className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-200 ease-out group-hover/tile:scale-110 ${stat.iconWrapClassName}`}
                                    >
                                        <Icon
                                            className={`h-4 w-4 ${stat.iconClassName}`}
                                        />
                                    </div>

                                    <p className="text-lg font-semibold text-foreground">
                                        {
                                            values[
                                                stat.key
                                            ]
                                        }
                                    </p>

                                    <p className=" text-[10px] leading-tight text-muted-foreground">
                                        {
                                            stat.label
                                        }
                                    </p>
                                </div>
                            );
                        },
                    )}
                </div>
            </CardContent>
        </Card>
    );
}