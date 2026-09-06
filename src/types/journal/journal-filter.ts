import type { LucideIcon } from "lucide-react";

import type { Mood } from "../common/mood";

export interface JournalFiltersState {
    mood?: Mood;
    favorite: boolean;
}

export type JournalSortOption =
    | "publishedAt,desc"
    | "publishedAt,asc"
    | "title,asc"
    | "title,desc";

export interface JournalSortItem {
    label: string;
    value: JournalSortOption;
    icon: LucideIcon;
}