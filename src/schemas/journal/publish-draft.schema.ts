import { z } from "zod";

import {
    MOOD_OPTIONS,
} from "@/constants/journal/journal-details";

import type {
    Mood,
} from "@/types/common/mood";

import {
    journalConstants,
} from "@/constants/journal/journal-constants";

import {
    isRichTextEmpty,
} from "@/lib/validation/isRichTextEmpty";

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
 * PUBLISH DRAFT SCHEMA
 * --------------------------------
 *
 * Unlike the draft schema, every field
 * required for a published journal must
 * contain a valid value.
 * --------------------------------
 */

export const publishDraftSchema =
    z.object({
        title: z
            .string()
            .trim()
            .min(
                1,
                "Title is required.",
            )
            .max(
                journalConstants.validation
                    .title.maxLength,
                `Title cannot exceed ${journalConstants.validation.title.maxLength} characters.`,
            ),

        content: z
            .string()
            .refine(
                (value) =>
                    !isRichTextEmpty(
                        value,
                    ),
                {
                    message:
                        "Journal content is required.",
                },
            ),

        mood: z.enum(
            moodValues,
            {
                error:
                    "Please select a mood.",
            },
        ),

        tags: z.array(
            z.string(),
        ),
    });

export type PublishDraftFormValues =
    z.infer<
        typeof publishDraftSchema
    >;