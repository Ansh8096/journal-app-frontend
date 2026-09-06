import { z } from "zod";

import {
    MOOD_OPTIONS,
} from "@/constants/journal/journal-details";

import type {
    Mood,
} from "@/types/common/mood";

const moodValues =
    MOOD_OPTIONS.map(
        (option) => option.value,
    ) as [
        Mood,
        ...Mood[],
    ];

export const editDraftRecoverySchema =
    z.object({
        version:
            z.literal(1),

        userId:
            z.string().min(1),

        draftId:
            z.string().min(1),

        title:
            z.string(),

        content:
            z.string(),

        mood:
            z
                .enum(
                    moodValues,
                )
                .nullable(),

        tags:
            z.array(
                z.string(),
            ),
    });

export type EditDraftRecoveryData =
    z.infer<
        typeof editDraftRecoverySchema
    >;