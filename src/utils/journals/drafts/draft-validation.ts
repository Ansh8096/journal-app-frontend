import {
    createDraftSchema,
} from "@/schemas/journal/create-draft.schema";

import type {
    CreateJournalFormValues,
} from "@/schemas/journal/create-journal.schema";


export function validateDraft(
    values: CreateJournalFormValues,
) {
    return createDraftSchema.safeParse(
        values,
    );
}