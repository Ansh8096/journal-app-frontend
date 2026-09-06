import type {
    EditJournalFormValues,
} from "@/schemas/journal/edit-journal.schema";

export function isEditJournalRecoveryChanged(
    current: Partial<EditJournalFormValues>,
    original: EditJournalFormValues | null,
): boolean {

    if (!original) {
        return false;
    }

    const currentTitle =
        current.title ?? "";

    const currentContent =
        current.content ?? "";

    const currentMood =
        current.mood;

    const currentTags =
        current.tags ?? [];

    const originalTags =
        original.tags ?? [];

    const tagsChanged =
        currentTags.length !==
            originalTags.length ||
        currentTags.some(
            (tag, index) =>
                tag !==
                originalTags[index],
        );

    return (
        currentTitle !==
            original.title ||

        currentContent !==
            original.content ||

        currentMood !==
            original.mood ||

        tagsChanged
    );
}