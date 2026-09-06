import storage from "@/utils/storage";

import {
    STORAGE_KEYS,
} from "@/constants/storage";

import {
    editJournalRecoverySchema,
    type EditJournalRecoveryData,
} from "@/schemas/journal/edit-journal-recovery.schema";


const RECOVERY_VERSION = 1;

type RecoverableEditJournalValues =
    Pick<
        EditJournalRecoveryData,
        "title" |
        "content" |
        "mood" |
        "tags"
    >;

/**
 * --------------------------------
 * SAVE
 * --------------------------------
 */

export function saveEditJournalRecovery(
    userId: string,
    journalId: string,
    values: RecoverableEditJournalValues,
): void {

    const recoveryData:
        EditJournalRecoveryData = {

        version:
            RECOVERY_VERSION,

        userId,

        journalId,

        title:
            values.title ?? "",

        content:
            values.content ?? "",

        mood:
            values.mood,

        tags:
            values.tags ?? [],
    };

    storage.set(
        STORAGE_KEYS.EDIT_JOURNAL_RECOVERY,
        recoveryData,
    );
}

/**
 * --------------------------------
 * LOAD
 * --------------------------------
 */

export function loadEditJournalRecovery(
    userId: string,
    journalId: string,
):
    RecoverableEditJournalValues | null {

    const raw =
        storage.get<unknown>(
            STORAGE_KEYS.EDIT_JOURNAL_RECOVERY,
        );

    /*
     * No recovery exists.
     */
    if (raw === null) {
        return null;
    }

    /*
     * Validate the stored structure.
     */
    const result =
        editJournalRecoverySchema.safeParse(
            raw,
        );

    /*
     * Corrupt / stale / incompatible
     * recovery data.
     */
    if (!result.success) {

        console.warn(
            "Invalid edit-journal recovery data. Clearing it.",
        );

        clearEditJournalRecovery();

        return null;
    }

    /*
     * Recovery must belong to the
     * currently authenticated user.
     */
    if (
        result.data.userId !== userId
    ) {

        console.info(
            "Edit-journal recovery belongs to another user. Clearing it.",
        );

        clearEditJournalRecovery();

        return null;
    }

    /*
     * Recovery must belong to the
     * journal currently being edited.
     */
    if (
        result.data.journalId !== journalId
    ) {

        console.info(
            "Edit-journal recovery belongs to another journal. Clearing it.",
        );

        clearEditJournalRecovery();

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

/**
 * --------------------------------
 * CLEAR
 * --------------------------------
 */

export function clearEditJournalRecovery(): void {

    storage.remove(
        STORAGE_KEYS.EDIT_JOURNAL_RECOVERY,
    );
}