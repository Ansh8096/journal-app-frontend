import type { JournalSummary } from "@/types/api/journal";

import type { DraftCardData } from "@/types/journal/draft.types";

import { htmlToText } from "@/utils/media/htmlToText";

export function mapJournalSummaryToDraftCard(
    draft: JournalSummary,
): DraftCardData {
    return {
        id: draft.id,

        title:
            draft.title?.trim() || "Untitled Draft",

        preview:
            htmlToText(
                draft.contentPreview ?? "",
            ),

        updatedAt:
            draft.updatedAt ??
            draft.createdAt,

        mood:
            draft.mood ?? null,

        tags:
            draft.tags ?? [],

        coverImageUrl:
            draft.coverImageUrl ?? null,
    };
}