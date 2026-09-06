import type {
    UpdateDraftRequest,
} from "@/types/api/journal";

import type {
    EditDraftFormValues,
} from "@/schemas/journal/edit-draft.schema";

import type {
    SelectedImage,
} from "@/types/journal/image";

import {
    extractImageFiles,
} from "@/utils/media/image-payload";


/* -------------------------------------------------------------------------- */
/*                                  RESULT                                    */
/* -------------------------------------------------------------------------- */

export interface UpdateDraftPayload {

    request:
        UpdateDraftRequest;

    images:
        File[];
}


/* -------------------------------------------------------------------------- */
/*                           BUILD UPDATE PAYLOAD                             */
/* -------------------------------------------------------------------------- */

/**
 * Converts the current Edit Draft state into
 * the data expected by useUpdateDraft().
 *
 * This function does NOT:
 *
 * - call the API
 * - create FormData
 * - modify React state
 *
 * It only transforms UI state into:
 *
 * {
 *     request,
 *     images
 * }
 */
export function buildUpdateDraftPayload(
    values: EditDraftFormValues,
    newImages: SelectedImage[],
    removedImagePublicIds: string[],
): UpdateDraftPayload {

    /**
     * --------------------------------------------------------------
     * EXTRACT NEW IMAGE FILES
     * --------------------------------------------------------------
     *
     * SelectedImage is UI state.
     *
     * The API/service layer expects actual
     * File objects.
     */
    const imageFiles =
        extractImageFiles(
            newImages,
        );


    /**
     * --------------------------------------------------------------
     * BUILD DRAFT REQUEST
     * --------------------------------------------------------------
     */

    const request:
        UpdateDraftRequest =
    {
        /**
         * Empty title is allowed for drafts.
         */
        title:
            values.title.trim(),

        /**
         * Empty content is allowed for drafts.
         */
        content:
            values.content,

        /**
         * Empty tags must be sent as []
         * so the user can clear all tags.
         */
        tags:
            values.tags,

        /**
         * The backend contract currently
         * uses mood?: Mood, not Mood | null.
         *
         * Therefore null means:
         * "don't send a mood field."
         */
        ...(values.mood !== null
            ? {
                mood:
                    values.mood,
            }
            : {}),

        /**
         * Only include removed image IDs
         * when there are actual removals.
         */
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