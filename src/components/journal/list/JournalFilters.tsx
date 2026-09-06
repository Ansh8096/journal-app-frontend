import {
    RotateCcw,
    Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { type Mood } from "@/types/common/mood";

import { journalPageConfig } from "./JournalListConfig";

import { MoodFilter, FavoritesFilter } from "@/components/journal/list";

import type { ChangeEvent } from "react";
import type { JournalSortOption } from "@/types/journal/journal-filter";
import SortFilter from "./sortFilter";

interface JournalFiltersProps {
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;

    selectedMood?: Mood;
    onMoodChange: (mood?: Mood) => void;

    favoriteOnly: boolean;
    onFavoriteChange: (favorite: boolean) => void;

    sortBy: JournalSortOption;
    onSortChange: (sort: JournalSortOption) => void;

    hasActiveFilters: boolean;
    onClearFilters: () => void;
}

export default function JournalFilters({
    searchQuery,
    onSearchQueryChange,

    selectedMood,
    onMoodChange,

    favoriteOnly,
    onFavoriteChange,

    sortBy,
    onSortChange,

    hasActiveFilters,
    onClearFilters,
}: JournalFiltersProps) {

    return (
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            {/* Search */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder={journalPageConfig.placeholders.search}
                    className="h-11 pl-10"
                    value={searchQuery}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onSearchQueryChange(event.target.value)
                    }
                />
            </div>

            {/* Mood */}
            <MoodFilter
                value={selectedMood}
                onChange={onMoodChange}
            />

            {/* Sort */}
            <SortFilter
                value={sortBy}
                onChange={onSortChange}
            />

            {/* Favorites */}
            <FavoritesFilter
                checked={favoriteOnly}
                onCheckedChange={onFavoriteChange}
            />

            {/* Clear filter button */}
            {hasActiveFilters && (
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={onClearFilters}
                    className="h-11 w-11"
                >
                    <RotateCcw className="h-4 w-4" />
                    <span className="sr-only">Clear Filters</span>
                </Button>
            )}

        </div>
    );
}