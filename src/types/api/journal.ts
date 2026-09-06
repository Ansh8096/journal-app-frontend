import type { Mood } from "../common/mood";

export type JournalStatus =
    | "DRAFT"
    | "PUBLISHED";


export interface CreateJournalRequest {
    title: string;
    content: string;
    mood: Mood;
    tags?: string[];
}

export interface UpdateJournalRequest {
    title?: string;
    content?: string;
    mood?: Mood;
    tags?: string[];
    removeImagePublicIds?: string[];
}

export interface UpdateFavoriteRequest {
    favorite: boolean;
}

export interface JournalImageResponse {
    imageUrl: string;
    publicId: string;
}

export interface JournalResponse {
    id: string;
    title: string;
    content: string;
    mood: Mood;
    favorite: boolean;
    coverImageUrl: string | null;
    images: JournalImageResponse[];
    tags: string[];
    status: JournalStatus;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface JournalSummary {
    id: string;
    title: string;
    contentPreview: string;
    mood: Mood;
    favorite: boolean;
    status: JournalStatus;
    coverImageUrl: string | null;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface JournalPageResponse {
    journals: JournalSummary[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface JournalSearchCriteria {
    page?: number;
    size?: number;
    query?: string;
    mood?: Mood;
    favorite?: boolean;
    tag?: string;
    from?: string;
    to?: string;
    sort?: string;
}

export interface JournalStatisticsResponse {
    totalJournals: number;

    favoriteJournals: number;

    mostCommonMood: Mood | null;

    mostCommonMoodPercentage: number;

    journalsThisMonth: number;

    currentStreak: number;
}

export interface DownloadJournalResponse {
    blob: Blob;
    fileName: string;
}

export interface UpdateCoverImageRequest {
    journalId: string;
    publicId: string;
}

export interface CreateDraftRequest {
    title: string;
    content: string;
    mood: Mood | null;
    tags: string[];
}

export interface UpdateDraftRequest {
    title?: string;
    content?: string;
    mood?: Mood;
    tags?: string[];
    removeImagePublicIds?: string[];
}

export interface DraftJournalQuery {
    page?: number;
    size?: number;
    query?: string;
    mood?: Mood;
    tag?: string;
    from?: string;
    to?: string;
    sort?: string;
}

export interface DraftOverview {
    totalDrafts: number;
    updatedToday: number;
    averageDraftAgeDays: number;
}