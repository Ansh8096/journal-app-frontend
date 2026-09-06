import { Flame } from "lucide-react";

import { journalListUI, journalMoodConfig } from "@/components/journal/list/JournalListConfig";

import type { JournalStatisticsResponse } from "@/types/api/journal";

import { formatDate } from "../formatting/date";


// ======================
// Journal Stats Utilities
// ======================


export function buildJournalStats(
    statistics: JournalStatisticsResponse,
) {
    const mood = statistics.mostCommonMood
        ? journalMoodConfig[statistics.mostCommonMood]
        : undefined;

    return [
        {
            title:
                journalListUI.statistics.total.title,

            value: statistics.totalJournals,

            subtitle:
                journalListUI.statistics.total.subtitle,

            icon:
                journalListUI.statistics.total.icon,

            iconClassName:
                journalListUI.statistics.total.iconClassName,
        },

        {
            title:
                journalListUI.statistics.favorites.title,

            value: statistics.favoriteJournals,

            subtitle:
                journalListUI.statistics.favorites.subtitle,

            icon:
                journalListUI.statistics.favorites.icon,

            iconClassName:
                journalListUI.statistics.favorites.iconClassName,
        },

        {
            title:
                journalListUI.statistics.mood.title,

            value: mood?.label ?? "N/A",

            subtitle: mood
                ? `${statistics.mostCommonMoodPercentage}% of entries`
                : "No journals yet",

            icon:
                mood?.icon ??
                journalListUI.statistics.mood.icon,

            iconClassName:
                mood?.iconClassName ??
                journalListUI.statistics.mood.iconClassName,
        },

        {
            title:
                journalListUI.statistics.streak.title,

            value: statistics.currentStreak,

            subtitle:
                journalListUI.statistics.streak.subtitle,

            icon: Flame,

            iconClassName:
                journalListUI.statistics.streak.iconClassName,
        },
    ];
}

export function getJournalDateTime(date: string) {
    const formattedDate = formatDate(date);

    const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(date));

    return {
        date: formattedDate,
        time,
    };
}


export function getJournalImageCount(images: unknown[]): number {
    return images.length;
}

export function formatJournalImageCount(images: unknown[]): string {
    const count = getJournalImageCount(images);

    return `${count} ${count === 1 ? "image" : "images"}`;
}

export function stripHtml(
    html: string,
): string {
    return html
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function getWordCount(
    html: string,
): number {
    const plainText = stripHtml(html);

    if (!plainText) {
        return 0;
    }

    return plainText.split(" ").length;
}