import { journalConstants } from "@/constants/journal/journal-constants";
import type { Mood } from "@/types/common/mood";
import { z } from "zod";

export const createDraftSchema =
    z.object({
        title: z
            .string()
            .max(
                journalConstants.validation.title.maxLength,
                `Title cannot exceed ${journalConstants.validation.title.maxLength} characters.`,
            ),

        content: z.string(),

        mood: z
            .custom<Mood>()
            .nullable(),

        tags: z.array(
            z.string(),
        ),
    });