import type {
    UpdateJournalRequest,
} from "@/types/api/journal";

import type {
    EditJournalFormValues,
} from "@/schemas/journal/edit-journal.schema";

import type {
    SelectedImage,
} from "@/types/journal/image";

import {
    extractImageFiles,
} from "@/utils/media/image-payload";


/* -------------------------------------------------------------------------- */
/*                                  RESULT                                    */
/* -------------------------------------------------------------------------- */

export interface UpdateJournalPayload {
    request: UpdateJournalRequest;
    images: File[];
}


/* -------------------------------------------------------------------------- */
/*                               BUILD PAYLOAD                                */
/* -------------------------------------------------------------------------- */

/**
 * Combines:
 *
 * - React Hook Form values
 * - newly selected local images
 * - removed existing-image public IDs
 *
 * into the exact data required by
 * the update mutation.
 *
 * No API call is performed here.
 */
export function buildUpdateJournalPayload(
    values: EditJournalFormValues,
    newImages: SelectedImage[],
    removedImagePublicIds: string[],
): UpdateJournalPayload {

    /**
     * --------------------------------------------------------------
     * NEW IMAGE FILES
     * --------------------------------------------------------------
     *
     * SelectedImage is UI state.
     *
     * The API/service layer only needs
     * the actual File objects.
     */
    const imageFiles =
        extractImageFiles(
            newImages,
        );


    /**
     * --------------------------------------------------------------
     * BUILD REQUEST
     * --------------------------------------------------------------
     *
     * We intentionally send:
     *
     * - title
     * - content
     * - mood (when selected)
     * - tags
     * - removed image public IDs
     *
     * Tags are always included so that:
     *
     * ["travel", "vacation"]
     *
     * can be changed to:
     *
     * []
     *
     * and the backend can clear them.
     */

    const request:
        UpdateJournalRequest =
    {
        title:
            values.title.trim(),

        content:
            values.content,

        tags:
            values.tags,

        ...(values.mood !== null
            ? {
                mood:
                    values.mood,
            }
            : {}),

        ...(removedImagePublicIds.length > 0
            ? {
                removeImagePublicIds:
                    removedImagePublicIds,
            }
            : {}),
    };


    return {
        request,
        images:
            imageFiles,
    };
}