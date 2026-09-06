import {
    useEffect,
    useRef,
    useState,
} from "react";
import { toast } from "sonner";

import {
    useFormContext,
    useWatch,
} from "react-hook-form";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import BottomActions from "@/components/journal/create/actions/BottomActions";

import ImageUploadSection from "../images/ImageUploadSection";
import JournalEditor from "../editor/JournalEditor";
import JournalTitleInput from "../title/JournalTitleInput";

import type {
    CreateJournalFormValues,
} from "@/schemas/journal/create-journal.schema";

import {
    createDraftSchema,
} from "@/schemas/journal/create-draft.schema";

import type {
    CreateDraftRequest,
    CreateJournalRequest,
} from "@/types/api/journal";

import type {
    SelectedImage,
} from "@/types/journal/image";

import {
    extractImageFiles,
} from "@/utils/media/image-payload";

import {
    useCreateDraft,
    useCreateJournal,
} from "@/hooks/journal";

import {
    getErrorMessage,
} from "@/lib/error";

import {
    useNavigate,
} from "react-router-dom";

import {
    buildJournalDetailsRoute,
} from "@/constants/app/routes";
import { isDraftEmpty } from "@/lib/validation/isDraftEmpty";
import { hasUnsavedJournalData } from "@/lib/validation/hasUnsavedJournalData";
import { clearCreateJournalRecovery } from "@/lib/journal/create-journal-recovery";


export default function CreateJournalForm() {

    /**
     * --------------------------------
     * SHARED REACT HOOK FORM
     * --------------------------------
     *
     * The form instance is owned by
     * CreateJournalPage and consumed
     * through FormProvider.
     */

    const form =
        useFormContext<CreateJournalFormValues>();

    const watchedValues =
        useWatch({
            control: form.control,
        });


    const navigate =
        useNavigate();

    /**
     * --------------------------------
     * SELECTED IMAGES
     * --------------------------------
     *
     * Images intentionally remain
     * outside React Hook Form.
     */

    const [
        images,
        setImages,
    ] = useState<SelectedImage[]>([]);

    const [
        isDiscardDialogOpen,
        setIsDiscardDialogOpen,
    ] = useState(false);

    /**
     * --------------------------------
     * KEEP LATEST IMAGES AVAILABLE
     * FOR CLEANUP
     * --------------------------------
     */

    const imagesRef =
        useRef<SelectedImage[]>([]);


    /**
     * --------------------------------
     * CREATE JOURNAL MUTATION
     * --------------------------------
     */

    const {
        mutate: createJournal,
        isPending:
        isCreatePending,
    } = useCreateJournal();


    /**
     * --------------------------------
     * CREATE DRAFT MUTATION
     * --------------------------------
     */

    const {
        mutate: createDraft,
        isPending:
        isDraftPending,
    } = useCreateDraft();


    /**
     * --------------------------------
     * COMBINED SUBMITTING STATE
     * --------------------------------
     *
     * Used by the entire Create
     * Journal form.
     *
     * true when either:
     *
     * - publishing
     * - saving draft
     *
     * is currently running.
     */

    const isSubmitting =
        isCreatePending ||
        isDraftPending;

    const hasUnsavedData =
        hasUnsavedJournalData({
            values: watchedValues,
            hasImages:
                images.length > 0,
        });

    /**
     * --------------------------------
     * KEEP IMAGE REF SYNCHRONIZED
     * --------------------------------
     */

    useEffect(() => {

        imagesRef.current =
            images;

    }, [images]);


    /**
     * --------------------------------
     * REVOKE IMAGE PREVIEW URLS
     * ON UNMOUNT
     * --------------------------------
     */

    useEffect(() => {

        return () => {

            imagesRef.current.forEach(
                (image) => {

                    URL.revokeObjectURL(
                        image.previewUrl,
                    );

                },
            );

        };

    }, []);


    /**
     * --------------------------------
     * PUBLISH JOURNAL
     * --------------------------------
     */

    const handlePublish = (
        values: CreateJournalFormValues,
    ) => {

        /**
         * Prevent duplicate operations.
         */

        if (isSubmitting) {
            return;
        }


        /**
         * --------------------------------
         * MOOD VALIDATION
         * --------------------------------
         *
         * Form state allows null.
         *
         * Published journals require
         * an actual Mood.
         */

        if (!values.mood) {

            form.setError(
                "mood",
                {
                    type: "manual",

                    message:
                        "Please select a mood.",
                },
            );

            return;
        }


        /**
         * --------------------------------
         * EXTRACT IMAGE FILES
         * --------------------------------
         *
         * SelectedImage[] is local UI
         * state.
         *
         * The API expects File[].
         */

        const imageFiles =
            extractImageFiles(
                images,
            );


        /**
         * --------------------------------
         * BUILD PUBLISH PAYLOAD
         * --------------------------------
         */

        const request:
            CreateJournalRequest =
        {
            title:
                values.title.trim(),

            content:
                values.content,

            mood:
                values.mood,

            tags:
                values.tags.length > 0
                    ? values.tags
                    : undefined,
        };


        /**
         * --------------------------------
         * CREATE JOURNAL
         * --------------------------------
         */

        createJournal(
            {
                request,

                images:
                    imageFiles,
            },

            {
                onSuccess: (
                    createdJournal,
                ) => {

                    clearCreateJournalRecovery();

                    /**
                     * Release local
                     * preview URLs because
                     * we are leaving the page.
                     */

                    images.forEach(
                        (image) => {

                            URL.revokeObjectURL(
                                image.previewUrl,
                            );

                        },
                    );


                    /**
                     * Clear local images.
                     */

                    setImages([]);


                    /**
                     * Reset form.
                     */

                    form.reset();


                    /**
                     * Success feedback.
                     */

                    toast.success(
                        "Journal published",
                        {
                            description:
                                `"${createdJournal.title}" was published successfully.`,
                        },
                    );


                    /**
                     * Navigate to the newly
                     * created journal.
                     */

                    navigate(
                        buildJournalDetailsRoute(
                            createdJournal.id,
                        ),
                        {
                            replace: true,
                        },
                    );

                },

                onError: (
                    error,
                ) => {

                    toast.error(
                        "Failed to publish journal",
                        {
                            description:
                                getErrorMessage(
                                    error,
                                ),
                        },
                    );

                },
            },
        );
    };

    const handleSaveDraft = () => {

        /**
         * Prevent duplicate operations.
         */
        if (isSubmitting) {
            return;
        }


        /**
         * Get current form values.
         */
        const values =
            form.getValues();


        /**
         * --------------------------------
         * DRAFT VALIDATION
         * --------------------------------
         *
         * Individual field validation.
         */
        const result =
            createDraftSchema.safeParse(
                values,
            );


        if (!result.success) {

            result.error.issues.forEach(
                (issue) => {

                    const field =
                        issue.path[0];

                    if (
                        field === "title" ||
                        field === "content" ||
                        field === "mood" ||
                        field === "tags"
                    ) {

                        form.setError(
                            field,
                            {
                                type: "manual",
                                message:
                                    issue.message,
                            },
                        );

                    }

                },
            );

            return;
        }


        /**
         * --------------------------------
         * EMPTY DRAFT CHECK
         * --------------------------------
         *
         * At least one meaningful field
         * or image must exist.
         */
        const draftIsEmpty =
            isDraftEmpty({
                values: result.data,
                hasImages:
                    images.length > 0,
            });


        if (draftIsEmpty) {

            toast.error(
                "Cannot save an empty draft",
                {
                    description:
                        "Please add at least a title, content, mood, tag, or image before saving your draft.",
                },
            );

            return;
        }


        /**
         * --------------------------------
         * EXTRACT IMAGE FILES
         * --------------------------------
         */

        const imageFiles =
            extractImageFiles(
                images,
            );


        /**
         * --------------------------------
         * BUILD DRAFT PAYLOAD
         * --------------------------------
         */

        const request:
            CreateDraftRequest =
        {
            title:
                result.data.title.trim(),

            content:
                result.data.content,

            mood:
                result.data.mood,

            tags:
                result.data.tags,
        };


        /**
         * --------------------------------
         * CREATE DRAFT
         * --------------------------------
         */

        createDraft(
            {
                request,
                images: imageFiles,
            },

            {
                onSuccess: () => {

                    clearCreateJournalRecovery();

                    /**
                     * Release image preview URLs.
                     */
                    images.forEach(
                        (image) => {
                            URL.revokeObjectURL(
                                image.previewUrl,
                            );
                        },
                    );


                    imagesRef.current = [];


                    /**
                     * Clear images.
                     */
                    setImages([]);

                    /**
                     * Reset form.
                     */
                    form.reset();


                    /**
                     * Success feedback.
                     */
                    toast.success(
                        "Draft saved successfully",
                        {
                            description:
                                "Your journal has been saved to drafts.",
                        },
                    );
                },

                onError: (error) => {

                    toast.error(
                        "Failed to save draft",
                        {
                            description:
                                getErrorMessage(
                                    error,
                                ),
                        },
                    );
                },
            },
        );
    };


    const handleDiscardRequest = () => {

        if (isSubmitting) {
            return;
        }

        if (!hasUnsavedData) {
            return;
        }

        setIsDiscardDialogOpen(true);
    };

    const handleConfirmDiscard = () => {

    if (isSubmitting) {
        return;
    }

    // Release image preview URLs.
    images.forEach((image) => {
        URL.revokeObjectURL(
            image.previewUrl,
        );
    });

    imagesRef.current = [];

    // Clear selected images.
    setImages([]);

    // Remove persisted recovery data.
    clearCreateJournalRecovery();

    // IMPORTANT:
    // Reset to EMPTY values instead of the
    // recovered default values.
    form.reset({
        title: "",
        content: "",
        mood: null,
        tags: [],
    });

    setIsDiscardDialogOpen(false);

    toast.success(
        "Journal discarded",
        {
            description:
                "Your unsaved journal has been cleared.",
        },
    );
};

    return (
        <form
            onSubmit={
                form.handleSubmit(
                    handlePublish,
                )
            }
            className="space-y-8"
            aria-busy={
                isSubmitting
            }
        >

            <JournalTitleInput
                control={
                    form.control
                }
            />


            <JournalEditor
                control={
                    form.control
                }
                name="content"
            />


            <ImageUploadSection
                images={
                    images
                }

                onImagesChange={
                    setImages
                }

                disabled={
                    isSubmitting
                }
            />


            <BottomActions
                onDeleteRequest={
                    handleDiscardRequest
                }

                onSaveDraft={
                    handleSaveDraft
                }

                onPublishJournal={
                    () => {
                        void form.handleSubmit(
                            handlePublish,
                        )();
                    }
                }

                isSavingDraft={
                    isDraftPending
                }

                isPublishing={
                    isCreatePending
                }

                disabled={
                    isSubmitting
                }
            />

            {/* Delete the unsaved changes dialog */}
            <AlertDialog
                open={
                    isDiscardDialogOpen
                }
                onOpenChange={
                    (open) => {

                        if (isSubmitting) {
                            return;
                        }

                        setIsDiscardDialogOpen(
                            open,
                        );
                    }
                }
            >
                <AlertDialogContent>

                    <AlertDialogHeader>

                        <AlertDialogTitle>
                            Discard journal?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            All unsaved changes, including
                            the selected images, will be
                            removed. This action cannot
                            be undone.
                        </AlertDialogDescription>

                    </AlertDialogHeader>


                    <AlertDialogFooter>

                        <AlertDialogCancel
                            disabled={
                                isSubmitting
                            }>
                            Cancel
                        </AlertDialogCancel>


                        <AlertDialogAction
                            onClick={
                                handleConfirmDiscard
                            }
                            disabled={
                                isSubmitting
                            }
                        >
                            Discard
                        </AlertDialogAction>

                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialog>

        </form>
    );
}