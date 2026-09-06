import {
    ArrowDownUp,
    CalendarDays,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    FileText,
    Filter,
    Search,
    X,
} from "lucide-react";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Input,
} from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    useDraftList,
} from "@/hooks/journal/useDraftList";

import type {
    DraftJournalQuery,
} from "@/types/api/journal";

import type {
    Mood,
} from "@/types/common/mood";

import {
    MOODS,
} from "@/types/common/mood";

import type {
    DraftCardData,
} from "@/types/journal/draft.types";

import type {
    DraftFilterState,
} from "@/types/journal/draft-filter";

import {
    mapJournalSummaryToDraftCard,
} from "@/utils/journals/drafts/draft.mapper";

import DraftRow from "./DraftRow";

import {
    useDebounce,
} from "@/hooks/useDebounce";

const PAGE_SIZE = 5;

const SORT_OPTIONS = [
    {
        value: "updatedAt,desc",
        label: "Updated (Newest)",
    },
    {
        value: "updatedAt,asc",
        label: "Updated (Oldest)",
    },
    {
        value: "createdAt,desc",
        label: "Created (Newest)",
    },
    {
        value: "createdAt,asc",
        label: "Created (Oldest)",
    },
    {
        value: "title,asc",
        label: "Title (A-Z)",
    },
    {
        value: "title,desc",
        label: "Title (Z-A)",
    },
] as const;

type DraftSort =
    (typeof SORT_OPTIONS)[number]["value"];

export default function AllDraftsSection() {
    /*
     * ------------------------------------------------
     * SEARCH
     * ------------------------------------------------
     */

    const [
        searchQuery,
        setSearchQuery,
    ] = useState("");

    const debouncedSearchQuery =
        useDebounce(
            searchQuery,
            400,
        );

    const normalizedSearchQuery =
        useMemo(
            () =>
                debouncedSearchQuery
                    .trim(),

            [debouncedSearchQuery],
        );

    /*
     * ------------------------------------------------
     * SORT
     * ------------------------------------------------
     */

    const [
        sort,
        setSort,
    ] = useState<DraftSort>(
        SORT_OPTIONS[0].value,
    );

    /*
     * ------------------------------------------------
     * FILTERS
     * ------------------------------------------------
     */

    const [
        filters,
        setFilters,
    ] = useState<DraftFilterState>({
        mood: undefined,
        tag: "",
        from: "",
        to: "",
    });

    const [
        isFilterOpen,
        setIsFilterOpen,
    ] = useState(false);

    /*
     * ------------------------------------------------
     * PAGINATION
     * ------------------------------------------------
     */

    const [
        page,
        setPage,
    ] = useState(0);

    /*
     * ------------------------------------------------
     * RESET PAGE WHEN SEARCH/FILTER/SORT CHANGES
     * ------------------------------------------------
     */

    useEffect(() => {
        setPage(0);
    }, [
        normalizedSearchQuery,
        filters.mood,
        filters.tag,
        filters.from,
        filters.to,
        sort,
    ]);

    /*
     * ------------------------------------------------
     * API QUERY
     * ------------------------------------------------
     */

    const criteria =
        useMemo<DraftJournalQuery>(
            () => ({
                page,

                size:
                    PAGE_SIZE,

                query:
                    normalizedSearchQuery ||
                    undefined,

                mood:
                    filters.mood,

                tag:
                    filters.tag?.trim() ||
                    undefined,

                from:
                    filters.from ||
                    undefined,

                to:
                    filters.to ||
                    undefined,

                sort,
            }),
            [
                page,
                normalizedSearchQuery,
                filters.mood,
                filters.tag,
                filters.from,
                filters.to,
                sort,
            ],
        );

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useDraftList(
        criteria,
    );

    /*
     * ------------------------------------------------
     * API → UI MAPPING
     * ------------------------------------------------
     */

    const drafts: DraftCardData[] =
        data?.journals.map(
            mapJournalSummaryToDraftCard,
        ) ?? [];

    /*
     * ------------------------------------------------
     * DISPLAY VALUES
     * ------------------------------------------------
     */

    const totalPages =
        data?.totalPages ?? 0;

    const totalElements =
        data?.totalElements ?? 0;

    const currentPage =
        data?.page ?? page;

    const first =
        data?.first ?? true;

    const last =
        data?.last ?? true;

    const hasActiveFilters =
        Boolean(
            filters.mood ||
            filters.tag?.trim() ||
            filters.from ||
            filters.to,
        );

    /*
     * ------------------------------------------------
     * PAGINATION RANGE (for the "Showing X to Y of Z" label)
     * ------------------------------------------------
     */

    const rangeStart =
        totalElements === 0
            ? 0
            : currentPage * PAGE_SIZE + 1;

    const rangeEnd =
        totalElements === 0
            ? 0
            : Math.min(
                (currentPage + 1) * PAGE_SIZE,
                totalElements,
            );

    /*
     * ------------------------------------------------
     * HANDLERS
     * ------------------------------------------------
     */

    const handlePreviousPage = () => {
        if (first) {
            return;
        }

        setPage(
            (current) =>
                Math.max(
                    current - 1,
                    0,
                ),
        );
    };

    const handleNextPage = () => {
        if (last) {
            return;
        }

        setPage(
            (current) =>
                current + 1,
        );
    };

    const handleMoodChange = (
        mood?: Mood,
    ) => {
        setFilters(
            (previous) => ({
                ...previous,
                mood,
            }),
        );
    };

    const handleTagChange = (
        value: string,
    ) => {
        setFilters(
            (previous) => ({
                ...previous,
                tag: value,
            }),
        );
    };

    const handleFromChange = (
        value: string,
    ) => {
        setFilters(
            (previous) => ({
                ...previous,
                from: value,
            }),
        );
    };

    const handleToChange = (
        value: string,
    ) => {
        setFilters(
            (previous) => ({
                ...previous,
                to: value,
            }),
        );
    };

    const clearFilters = () => {
        setFilters({
            mood: undefined,
            tag: "",
            from: "",
            to: "",
        });
    };

    /*
     * ------------------------------------------------
     * RENDER
     * ------------------------------------------------
     */

    return (
        <Card className="rounded-md">
            <CardContent className="space-y-5 p-5">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />

                    <h2 className="text-base font-semibold">
                        All Drafts
                    </h2>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                    {/* Search */}
                    <div className="min-w-0 flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                value={searchQuery}
                                onChange={(event) =>
                                    setSearchQuery(event.target.value)
                                }
                                placeholder="Search drafts by title or content..."
                                className="h-11 w-full rounded-lg border border-input bg-background pl-9"
                            />
                        </div>
                    </div>

                    {/* Sort */}
                    <Select
                        value={sort}
                        onValueChange={(value) => {
                            setSort(value as DraftSort);
                        }}
                    >
                        <SelectTrigger className="h-11 w-full rounded-lg border border-input bg-background xl:w-[220px] xl:shrink-0">
                            <div className="flex min-w-0 items-center gap-2">
                                <ArrowDownUp className="h-4 w-4 shrink-0" />

                                <SelectValue placeholder="Sort by" />
                            </div>
                        </SelectTrigger>

                        <SelectContent>
                            {SORT_OPTIONS.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Filter */}
                    <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full justify-between gap-3 rounded-lg border border-input bg-background xl:w-[120px] xl:shrink-0"
                        onClick={() =>
                            setIsFilterOpen(
                                (previous) => !previous,
                            )
                        }
                        aria-expanded={isFilterOpen}
                    >
                        <span className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />

                            Filter

                            {hasActiveFilters && (
                                <span className="h-2 w-2 rounded-full bg-primary" />
                            )}
                        </span>

                        <ChevronDown
                            className={`h-4 w-4 transition-transform ${isFilterOpen
                                    ? "rotate-180"
                                    : ""
                                }`}
                        />
                    </Button>
                </div>

                {/* Filter Panel */}
                {isFilterOpen && (
                    <div className="rounded-lg border bg-muted/20 p-4">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {/* Mood */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium">
                                    Mood
                                </label>

                                <Select
                                    value={
                                        filters.mood ??
                                        "ALL"
                                    }
                                    onValueChange={(
                                        value,
                                    ) => {
                                        handleMoodChange(
                                            value ===
                                                "ALL"
                                                ? undefined
                                                : (value as Mood),
                                        );
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select mood" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="ALL">
                                            All moods
                                        </SelectItem>

                                        {MOODS.map(
                                            (mood) => (
                                                <SelectItem
                                                    key={
                                                        mood
                                                    }
                                                    value={
                                                        mood
                                                    }
                                                >
                                                    {mood
                                                        .charAt(
                                                            0,
                                                        )
                                                        .toUpperCase() +
                                                        mood
                                                            .slice(
                                                                1,
                                                            )
                                                            .toLowerCase()}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Tag */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium">
                                    Tag
                                </label>

                                <Input
                                    value={
                                        filters.tag ??
                                        ""
                                    }
                                    onChange={(
                                        event,
                                    ) =>
                                        handleTagChange(
                                            event.target
                                                .value,
                                        )
                                    }
                                    placeholder="e.g. travel"
                                />
                            </div>

                            {/* From */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium">
                                    Updated From
                                </label>

                                <div className="relative">
                                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        type="date"
                                        value={
                                            filters.from ??
                                            ""
                                        }
                                        onChange={(
                                            event,
                                        ) =>
                                            handleFromChange(
                                                event
                                                    .target
                                                    .value,
                                            )
                                        }
                                        className="pl-9"
                                    />
                                </div>
                            </div>

                            {/* To */}
                            <div className="space-y-2">
                                <label className="text-xs font-medium">
                                    Updated To
                                </label>

                                <div className="relative">
                                    <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                    <Input
                                        type="date"
                                        value={
                                            filters.to ??
                                            ""
                                        }
                                        onChange={(
                                            event,
                                        ) =>
                                            handleToChange(
                                                event
                                                    .target
                                                    .value,
                                            )
                                        }
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Filter footer */}
                        <div className="mt-4 flex items-center justify-between border-t pt-4">
                            <p className="text-xs text-muted-foreground">
                                Filters are applied automatically.
                            </p>

                            {hasActiveFilters && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={
                                        clearFilters
                                    }
                                >
                                    <X className="mr-1.5 h-3.5 w-3.5" />
                                    Clear filters
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                {/* Fetching */}
                {isFetching &&
                    !isLoading && (
                        <p className="text-xs text-muted-foreground">
                            Updating drafts...
                        </p>
                    )}

                {/* Error */}
                {isError &&
                    !data && (
                        <div className="rounded-lg border border-dashed px-6 py-10 text-center">
                            <p className="text-sm font-medium">
                                Unable to load drafts
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Something went wrong while loading your drafts.
                            </p>

                            <Button
                                type="button"
                                variant="outline"
                                className="mt-4"
                                onClick={() =>
                                    refetch()
                                }
                            >
                                Try Again
                            </Button>
                        </div>
                    )}

                {/* Loading */}
                {isLoading && (
                    <div className="space-y-2">
                        {Array.from({
                            length: PAGE_SIZE,
                        }).map(
                            (_, index) => (
                                <div
                                    key={
                                        index
                                    }
                                    className="h-[76px] animate-pulse rounded-lg bg-muted"
                                />
                            ),
                        )}
                    </div>
                )}

                {/* Empty */}
                {!isLoading &&
                    !isError &&
                    data &&
                    drafts.length ===
                    0 && (
                        <div className="rounded-lg border border-dashed px-6 py-12 text-center">
                            <Search className="mx-auto h-6 w-6 text-muted-foreground" />

                            <h3 className="mt-3 text-sm font-semibold">
                                No drafts found
                            </h3>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Try changing your search or filters.
                            </p>
                        </div>
                    )}

                {/* Rows */}
                {!isLoading &&
                    !isError &&
                    drafts.length >
                    0 && (
                        <div className="divide-y overflow-hidden rounded-lg border">
                            {drafts.map(
                                (draft) => (
                                    <DraftRow
                                        key={
                                            draft.id
                                        }
                                        draft={
                                            draft
                                        }
                                    />
                                ),
                            )}
                        </div>
                    )}

                {/* Pagination */}
                {!isLoading &&
                    !isError &&
                    data && (
                        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                {totalElements ===
                                    0
                                    ? "No drafts"
                                    : `Showing ${rangeStart} to ${rangeEnd} of ${totalElements} drafts`}
                            </p>

                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9 rounded-lg transition-colors duration-200 ease-out disabled:opacity-40"
                                    disabled={
                                        first ||
                                        isFetching
                                    }
                                    onClick={
                                        handlePreviousPage
                                    }
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <Button
                                    type="button"
                                    size="icon"
                                    className="h-9 w-9 rounded-lg bg-foreground text-background hover:bg-foreground/90"
                                    aria-label={`Page ${currentPage + 1} of ${Math.max(totalPages, 1)}`}
                                    aria-current="page"
                                >
                                    {currentPage +
                                        1}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9 rounded-lg transition-colors duration-200 ease-out disabled:opacity-40"
                                    disabled={
                                        last ||
                                        isFetching
                                    }
                                    onClick={
                                        handleNextPage
                                    }
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
            </CardContent>
        </Card>
    );
}