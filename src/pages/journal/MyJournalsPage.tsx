import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    JournalFilters,
    JournalGrid,
    JournalHeader,
    JournalPagination,
    JournalStats,
    JournalStatsSkeleton,
} from "@/components/journal/list";

import JournalGridSkeleton from "@/components/journal/list/JournalGridSkeleton";

import {
    journalEmptyStateConfig,
    journalErrorStateConfig,
} from "@/components/journal/list/JournalListConfig";

import EmptyStateCard from "@/components/common/EmptyStateCard";

import AppLayout from "@/layouts/app/AppLayout";

import {
    useJournalList,
    useJournalStatistics,
} from "@/hooks/journal";

import {
    useFavoriteJournal,
} from "@/hooks/journal/useFavoriteJournal";

import type {
    JournalSearchCriteria,
    JournalSummary,
} from "@/types/api/journal";

import { useDebounce } from "@/hooks/useDebounce";

import {
    journalConstants,
} from "@/constants/journal/journal-constants";

import type {
    JournalFiltersState,
} from "@/types/journal/journal-filter";

import {
    RotateCcw,
    SquarePen,
} from "lucide-react";

import {
    DEFAULT_JOURNAL_SORT,
} from "@/constants/journal/journal-sort";

import {
    useNavigate,
} from "react-router-dom";

import {
    ROUTES,
} from "@/constants/app/routes";

function renderDescription(
    description: {
        line1: string;
        line2: string;
    },
) {
    return (
        <>
            {description.line1}
            <br />
            {description.line2}
        </>
    );
}

function MyJournalsPage() {
    const navigate =
        useNavigate();

    /*
     * ----------------------------------------
     * Journal statistics
     * ----------------------------------------
     */
    const {
        data: statistics,
        isLoading:
        isStatisticsLoading,
    } = useJournalStatistics();

    /*
     * ----------------------------------------
     * Search state
     * ----------------------------------------
     */
    const [
        searchQuery,
        setSearchQuery,
    ] = useState("");

    /*
     * ----------------------------------------
     * Filter state
     * ----------------------------------------
     */
    const [
        filters,
        setFilters,
    ] = useState<JournalFiltersState>({
        mood: undefined,
        favorite: false,
    });

    /*
     * ----------------------------------------
     * Sort state
     * ----------------------------------------
     */
    const [
        sort,
        setSort,
    ] = useState(
        DEFAULT_JOURNAL_SORT,
    );

    /*
     * ----------------------------------------
     * Pagination state
     * ----------------------------------------
     */
    const [
        page,
        setPage,
    ] = useState<number>(
        journalConstants.pagination.defaultPage,
    );

    const [
        pageSize,
    ] = useState(
        journalConstants.pagination.defaultPageSize,
    );

    /*
     * ----------------------------------------
     * Favorite mutation
     * ----------------------------------------
     */
    const {
        mutate: toggleFavorite,
        isPending:
        isFavoriteUpdating,
    } = useFavoriteJournal();

    /*
     * ----------------------------------------
     * Search debounce
     * ----------------------------------------
     */
    const debouncedSearchQuery =
        useDebounce(
            searchQuery,
            journalConstants.search.debounceDelay,
        );

    const normalizedSearchQuery =
        useMemo(
            () =>
                debouncedSearchQuery.trim(),
            [debouncedSearchQuery],
        );

    /*
     * ----------------------------------------
     * Reset page whenever search/filter/sort
     * changes.
     * ----------------------------------------
     */
    useEffect(() => {
        setPage(
            journalConstants.pagination.defaultPage,
        );
    }, [
        normalizedSearchQuery,
        filters.mood,
        filters.favorite,
        sort,
    ]);

    /*
     * ----------------------------------------
     * Journal API criteria
     * ----------------------------------------
     */
    const criteria =
        useMemo<JournalSearchCriteria>(
            () => ({
                page,
                size: pageSize,

                query:
                    normalizedSearchQuery ||
                    undefined,

                mood:
                    filters.mood,

                favorite:
                    filters.favorite ||
                    undefined,

                sort,
            }),
            [
                page,
                pageSize,
                normalizedSearchQuery,
                filters.mood,
                filters.favorite,
                sort,
            ],
        );

    /*
     * ----------------------------------------
     * Journal list query
     * ----------------------------------------
     */
    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useJournalList(
        criteria,
    );

    /*
     * ----------------------------------------
     * Active filter state
     * ----------------------------------------
     */
    const hasActiveFilters =
        normalizedSearchQuery.length > 0 ||
        filters.mood !== undefined ||
        filters.favorite;

    /*
     * ----------------------------------------
     * Reset filters
     * ----------------------------------------
     */
    const resetFilters = () => {
        setSearchQuery("");

        setFilters({
            mood: undefined,
            favorite: false,
        });

        setPage(
            journalConstants.pagination.defaultPage,
        );
    };

    /*
     * ----------------------------------------
     * Favorite handler
     * ----------------------------------------
     *
     * The actual API mutation and cache
     * synchronization are already handled
     * inside useFavoriteJournal().
     * ----------------------------------------
     */
    const handleToggleFavorite = (
        journal: JournalSummary,
    ) => {
        /*
         * Prevent duplicate favorite requests
         * while the previous mutation is still
         * running.
         */
        if (isFavoriteUpdating) {
            return;
        }

        toggleFavorite({
            journalId: journal.id,

            request: {
                favorite:
                    !journal.favorite,
            },
        });
    };

    /*
     * ----------------------------------------
     * Render journal content
     * ----------------------------------------
     */
    function renderJournalContent() {
        /*
         * Initial loading
         */
        if (isLoading) {
            return (
                <JournalGridSkeleton />
            );
        }

        /*
         * API error
         */
        if (isError) {
            return (
                <div className="mt-8">
                    <EmptyStateCard
                        title={
                            journalErrorStateConfig.title
                        }
                        description={renderDescription(
                            journalErrorStateConfig.description,
                        )}
                        actionLabel={
                            journalErrorStateConfig.actionLabel
                        }
                        icon={
                            journalErrorStateConfig.icon
                        }
                        onAction={
                            refetch
                        }
                    />
                </div>
            );
        }

        /*
         * Empty result
         */
        if (
            !data ||
            data.journals.length === 0
        ) {
            return (
                <div className="mt-8">
                    <EmptyStateCard
                        title={
                            hasActiveFilters
                                ? journalEmptyStateConfig
                                    .noResults
                                    .title
                                : journalEmptyStateConfig
                                    .noJournals
                                    .title
                        }
                        description={
                            hasActiveFilters
                                ? journalEmptyStateConfig
                                    .noResults
                                    .description
                                : renderDescription(
                                    journalEmptyStateConfig
                                        .noJournals
                                        .description,
                                )
                        }
                        actionLabel={
                            hasActiveFilters
                                ? journalEmptyStateConfig
                                    .noResults
                                    .actionLabel
                                : journalEmptyStateConfig
                                    .noJournals
                                    .actionLabel
                        }
                        onAction={
                            hasActiveFilters
                                ? resetFilters
                                : undefined
                        }
                        actionLink={
                            hasActiveFilters
                                ? undefined
                                : journalEmptyStateConfig
                                    .noJournals
                                    .actionLink
                        }
                        icon={
                            hasActiveFilters
                                ? RotateCcw
                                : SquarePen
                        }
                    />
                </div>
            );
        }

        /*
         * Journal cards
         */
        return (
            <JournalGrid
                journals={
                    data.journals
                }
                onToggleFavorite={
                    handleToggleFavorite
                }
            />
        );
    }

    return (
        <AppLayout>
            <div className="space-y-8">
                {/* Header */}
                <JournalHeader
                    onCreate={() =>
                        navigate(
                            ROUTES.NEW_JOURNAL,
                        )
                    }
                />

                {/* Filters */}
                <JournalFilters
                    searchQuery={
                        searchQuery
                    }
                    onSearchQueryChange={
                        setSearchQuery
                    }
                    selectedMood={
                        filters.mood
                    }
                    onMoodChange={(
                        mood,
                    ) =>
                        setFilters(
                            (previous) => ({
                                ...previous,
                                mood,
                            }),
                        )
                    }
                    favoriteOnly={
                        filters.favorite
                    }
                    onFavoriteChange={(
                        favorite,
                    ) =>
                        setFilters(
                            (previous) => ({
                                ...previous,
                                favorite,
                            }),
                        )
                    }
                    sortBy={sort}
                    onSortChange={
                        setSort
                    }
                    hasActiveFilters={
                        hasActiveFilters
                    }
                    onClearFilters={
                        resetFilters
                    }
                />

                {/* Journal Statistics */}
                {isStatisticsLoading && (
                    <JournalStatsSkeleton />
                )}

                {!isStatisticsLoading &&
                    statistics && (
                        <JournalStats
                            statistics={
                                statistics
                            }
                        />
                    )}

                {/* Journal Grid */}
                {renderJournalContent()}

                {/* Pagination */}
                <JournalPagination
                    page={page}
                    pageSize={pageSize}
                    totalPages={
                        data?.totalPages ??
                        0
                    }
                    totalElements={
                        data?.totalElements ??
                        0
                    }
                    isFetching={
                        isFetching
                    }
                    onPageChange={
                        setPage
                    }
                />
            </div>
        </AppLayout>
    );
}

export default MyJournalsPage;