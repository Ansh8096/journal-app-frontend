import storage from "@/utils/storage";
import { STORAGE_KEYS } from "@/constants/storage";

import {
    createJournalRecoverySchema,
    type CreateJournalRecoveryData,
} from "@/schemas/journal/create-journal-recovery.schema";

import type {
    CreateJournalFormValues,
} from "@/schemas/journal/create-journal.schema";

import { isRichTextEmpty } from "@/lib/validation/isRichTextEmpty";

const RECOVERY_VERSION = 1;

type RecoverableJournalValues =
    Pick<
        CreateJournalFormValues,
        "title" | "content" | "mood" | "tags"
    >;

export function saveCreateJournalRecovery(
    userId: string,
    values: RecoverableJournalValues,
): void {

    const recoveryData: CreateJournalRecoveryData = {
        version: RECOVERY_VERSION,

        userId,

        title:
            values.title ?? "",

        content:
            values.content ?? "",

        mood:
            values.mood ?? null,

        tags:
            values.tags ?? [],
    };

    storage.set(
        STORAGE_KEYS.CREATE_JOURNAL_RECOVERY,
        recoveryData,
    );
}

export function loadCreateJournalRecovery(
    userId: string,
):
    RecoverableJournalValues | null {

    const raw =
        storage.get<unknown>(
            STORAGE_KEYS.CREATE_JOURNAL_RECOVERY,
        );

    if (raw === null) {
        return null;
    }

    const result =
        createJournalRecoverySchema.safeParse(
            raw,
        );

    /*
     * Invalid / stale / incompatible data.
     */
    if (!result.success) {

        console.warn(
            "Invalid create-journal recovery data. Clearing it.",
        );

        clearCreateJournalRecovery();

        return null;
    }

    /*
     * Recovery belongs to another user.
     */
    if (
        result.data.userId !== userId
    ) {
        clearCreateJournalRecovery();
    
        return null;
    }

    /*
     * --------------------------------
     * MEANINGFUL DATA CHECK
     * --------------------------------
     *
     * Tiptap represents an empty document
     * as HTML such as:
     *
     * <p></p>
     *
     * A string trim() check cannot detect
     * that as empty HTML.
     */
    const hasContent =
        !isRichTextEmpty(
            result.data.content,
        );

    const hasMeaningfulData =
        Boolean(
            result.data.title.trim() ||
            hasContent ||
            result.data.mood ||
            result.data.tags.length,
        );

    if (!hasMeaningfulData) {

        clearCreateJournalRecovery();

        return null;
    }

    return {
        title:
            result.data.title,

        content:
            result.data.content,

        mood:
            result.data.mood,

        tags:
            result.data.tags,
    };
}

export function clearCreateJournalRecovery(): void {

    storage.remove(
        STORAGE_KEYS.CREATE_JOURNAL_RECOVERY,
    );
}