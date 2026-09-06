import { z } from "zod";

import {
    MOOD_OPTIONS,
} from "@/constants/journal/journal-details";

import type {
    Mood,
} from "@/types/common/mood";

/**
 * --------------------------------
 * MOOD VALUES
 * --------------------------------
 */

const moodValues =
    MOOD_OPTIONS.map(
        (option) => option.value,
    ) as [
        Mood,
        ...Mood[],
    ];

/**
 * --------------------------------
 * EDIT JOURNAL RECOVERY SCHEMA
 * --------------------------------
 *
 * This schema is intentionally different
 * from editJournalSchema.
 *
 * editJournalSchema:
 *     validates what may be submitted
 *
 * recovery schema:
 *     validates what may safely be restored
 *
 * Recovery data may contain temporarily
 * invalid values because the user may have
 * been in the middle of making an invalid edit.
 */

export const editJournalRecoverySchema =
    z.object({
        version:
            z.literal(1),

        userId:
            z.string().min(1),

        journalId:
            z.string().min(1),

        title:
            z.string(),

        content:
            z.string(),

        mood:
            z.enum(
                moodValues,
            ).nullable(),

        tags:
            z.array(
                z.string(),
            ),
    });

export type EditJournalRecoveryData =
    z.infer<
        typeof editJournalRecoverySchema
    >;