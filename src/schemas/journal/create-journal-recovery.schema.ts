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
 * RECOVERY SCHEMA
 * --------------------------------
 *
 * This schema is intentionally separate
 * from createJournalSchema because recovery
 * data can be incomplete.
 */

export const createJournalRecoverySchema =
    z.object({
        version: z.literal(1),

        userId: z.string().min(1),

        title: z.string(),

        content: z.string(),

        mood: z
            .enum(moodValues)
            .nullable(),

        tags: z.array(
            z.string(),
        ),
    });

export type CreateJournalRecoveryData =
    z.infer<
        typeof createJournalRecoverySchema
    >;