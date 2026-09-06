import type {
    EditDraftFormValues,
} from "@/schemas/journal/edit-draft.schema";

import type {
    JournalResponse,
} from "@/types/api/journal";

export function isEditDraftRecoveryChanged(
    current:
        Partial<EditDraftFormValues>,
    original:
        JournalResponse | null,
): boolean {

    if (!original) {
        return false;
    }

    const currentTitle =
        current.title ?? "";

    const currentContent =
        current.content ?? "";

    const currentMood =
        current.mood ?? null;

    const currentTags =
        current.tags ?? [];

    const originalTitle =
        original.title ?? "";

    const originalContent =
        original.content ?? "";

    const originalMood =
        original.mood ?? null;

    const originalTags =
        original.tags ?? [];

    const tagsChanged =
        currentTags.length !==
            originalTags.length ||
        currentTags.some(
            (
                tag,
                index,
            ) =>
                tag !==
                originalTags[index],
        );

    return (
        currentTitle !==
            originalTitle ||

        currentContent !==
            originalContent ||

        currentMood !==
            originalMood ||

        tagsChanged
    );
}