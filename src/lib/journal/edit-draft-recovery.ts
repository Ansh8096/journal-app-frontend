import storage from "@/utils/storage/storage";

import {
    STORAGE_KEYS,
} from "@/constants/app/storage";

import {
    editDraftRecoverySchema,
    type EditDraftRecoveryData,
} from "@/schemas/journal/edit-draft-recovery.schema";

const RECOVERY_VERSION = 1;

type RecoverableEditDraftValues =
    Pick<
        EditDraftRecoveryData,
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

export function saveEditDraftRecovery(
    userId: string,
    draftId: string,
    values: RecoverableEditDraftValues,
): void {

    const recoveryData:
        EditDraftRecoveryData = {

        version:
            RECOVERY_VERSION,

        userId,

        draftId,

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
        STORAGE_KEYS.EDIT_DRAFT_RECOVERY,
        recoveryData,
    );
}

/**
 * --------------------------------
 * LOAD
 * --------------------------------
 */

export function loadEditDraftRecovery(
    userId: string,
    draftId: string,
):
    RecoverableEditDraftValues | null {

    const raw =
        storage.get<unknown>(
            STORAGE_KEYS.EDIT_DRAFT_RECOVERY,
        );

    /*
     * No recovery exists.
     */
    if (raw === null) {
        return null;
    }

    /*
     * Validate the stored data.
     */
    const result =
        editDraftRecoverySchema.safeParse(
            raw,
        );

    /*
     * Corrupt / stale / incompatible
     * recovery data.
     */
    if (!result.success) {

        console.warn(
            "Invalid edit-draft recovery data. Clearing it.",
        );

        clearEditDraftRecovery();

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
            "Edit-draft recovery belongs to another user. Clearing it.",
        );

        clearEditDraftRecovery();

        return null;
    }

    /*
     * Recovery must belong to the
     * draft currently being edited.
     */
    if (
        result.data.draftId !== draftId
    ) {

        console.info(
            "Edit-draft recovery belongs to another draft. Clearing it.",
        );

        clearEditDraftRecovery();

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

export function clearEditDraftRecovery(): void {

    storage.remove(
        STORAGE_KEYS.EDIT_DRAFT_RECOVERY,
    );
}