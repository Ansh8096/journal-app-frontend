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

import {
    JournalDetailsCard,
} from "@/components/journal/create/details/JournalDetailsCard";

import WeatherCard
    from "@/components/journal/create/weather/WeatherCard";

import WritingTipCard
    from "@/components/journal/create/inspiration/WritingTipCard";

import {
    getRandomWritingTip,
} from "@/lib/writing-tip/getRandomWritingTip";

import {
    FormProvider,
    useForm,
    useWatch,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import AppLayout
    from "@/layouts/app/AppLayout";

import {
    useJournal,
    useUpdateJournal,
} from "@/hooks/journal";

import {
    editJournalSchema,
    type EditJournalFormValues,
} from "@/schemas/journal/edit-journal.schema";

import EditJournalForm
    from "@/components/journal/edit/form/EditJournalForm";

import {
    Skeleton,
} from "@/components/ui/skeleton";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

import {
    Button,
} from "@/components/ui/button";

import {
    AlertCircle,
} from "lucide-react";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import type {
    JournalImageResponse,
} from "@/types/api/journal";

import type {
    SelectedImage,
} from "@/types/journal/image";

import {
    buildUpdateJournalPayload,
} from "@/utils/build-update-journal-payload";

import {
    toast,
} from "sonner";

import {
    getErrorMessage,
} from "@/lib/error";

import {
    buildJournalDetailsRoute,
} from "@/constants/routes";

import JournalEditLayout
    from "@/components/journal/edit/layout/JournalEditLayout";

import {
    useWeather,
} from "@/hooks/weather/useWeather";

import {
    useAuth,
} from "@/hooks/useAuth";

import {
    loadEditJournalRecovery,
    saveEditJournalRecovery,
    clearEditJournalRecovery,
} from "@/lib/journal/edit-journal-recovery";

import {
    isEditJournalRecoveryChanged,
} from "@/lib/journal/isEditJournalRecoveryChanged";


export default function EditJournalPage() {

    const {
        user,
    } = useAuth();

    const {
        journalId,
    } = useParams<{
        journalId: string;
    }>();

    const navigate =
        useNavigate();


    /*
     * --------------------------------
     * IMAGE STATE
     * --------------------------------
     */

    const [
        existingImages,
        setExistingImages,
    ] = useState<JournalImageResponse[]>(
        [],
    );

    const [
        newImages,
        setNewImages,
    ] = useState<SelectedImage[]>(
        [],
    );

    const [
        removedImagePublicIds,
        setRemovedImagePublicIds,
    ] = useState<string[]>(
        [],
    );


    /*
     * --------------------------------
     * DISCARD DIALOG
     * --------------------------------
     */

    const [
        isDiscardDialogOpen,
        setIsDiscardDialogOpen,
    ] = useState(false);


    /*
     * --------------------------------
     * FETCH JOURNAL
     * --------------------------------
     */

    const {
        data: journal,
        isLoading,
        isError,
        refetch,
    } = useJournal(
        journalId,
    );


    /*
     * --------------------------------
     * WEATHER
     * --------------------------------
     */

    const {
        data: weather,
        isLoading: isWeatherLoading,
        isFetching: isWeatherFetching,
        isError: isWeatherError,
        refetch: refetchWeather,
    } = useWeather();


    /*
     * --------------------------------
     * UPDATE MUTATION
     * --------------------------------
     */

    const {
        mutate: updateJournal,
        isPending: isUpdatePending,
    } = useUpdateJournal();


    /*
     * --------------------------------
     * REACT HOOK FORM
     * --------------------------------
     */

    const form =
        useForm<EditJournalFormValues>({
            resolver:
                zodResolver(
                    editJournalSchema,
                ),

            defaultValues: {
                title: "",
                content: "",
                tags: [],
            },

            mode: "onBlur",
        });


    /*
     * --------------------------------
     * WATCH FORM VALUES
     * --------------------------------
     *
     * Used specifically for local
     * edit-journal recovery.
     */

    const watchedValues =
        useWatch<
            EditJournalFormValues
        >({
            control: form.control,
        });


    /*
     * --------------------------------
     * NEW IMAGE REF
     * --------------------------------
     */

    const newImagesRef =
        useRef<SelectedImage[]>(
            [],
        );

    useEffect(() => {

        newImagesRef.current =
            newImages;

    }, [
        newImages,
    ]);


    /*
     * --------------------------------
     * CLEANUP IMAGE PREVIEWS
     * --------------------------------
     */

    useEffect(() => {

        return () => {

            newImagesRef.current.forEach(
                (image) => {

                    URL.revokeObjectURL(
                        image.previewUrl,
                    );

                },
            );
        };

    }, []);


    /*
     * --------------------------------
     * RECOVERY STATE
     * --------------------------------
     */

    const initializedJournalKeyRef =
        useRef<string | null>(
            null,
        );

    const originalValuesRef =
        useRef<
            EditJournalFormValues | null
        >(
            null,
        );


    /*
     * --------------------------------
     * DETERMINE RECOVERY CHANGES
     * --------------------------------
     *
     * Compare the current form state
     * against the last server-saved
     * journal state.
     */

    const hasRecoveryChanges =
        isEditJournalRecoveryChanged(
            watchedValues,
            originalValuesRef.current,
        );


    /*
     * --------------------------------
     * INITIALIZE JOURNAL + RECOVERY
     * --------------------------------
     */

    useEffect(() => {

        /*
         * We cannot initialize the edit
         * state until both the authenticated
         * user and server journal exist.
         */
        if (
            !user?.id ||
            !journal
        ) {
            return;
        }


        /*
         * Recovery belongs to a specific
         * user + journal combination.
         */
        const journalKey =
            `${user.id}:${journal.id}`;


        /*
         * Prevent repeated initialization
         * for the same journal.
         */
        if (
            initializedJournalKeyRef.current ===
            journalKey
        ) {
            return;
        }


        initializedJournalKeyRef.current =
            journalKey;


        /*
         * --------------------------------
         * SERVER JOURNAL = BASELINE
         * --------------------------------
         *
         * This must always represent the
         * last server-saved state.
         *
         * NEVER replace this with recovery.
         */

        const originalValues:
            EditJournalFormValues = {

            title:
                journal.title,

            content:
                journal.content,

            mood:
                journal.mood,

            tags:
                journal.tags ?? [],
        };


        originalValuesRef.current =
            originalValues;


        /*
         * --------------------------------
         * LOAD LOCAL RECOVERY
         * --------------------------------
         */

        const recoveredData =
            loadEditJournalRecovery(
                user.id,
                journal.id,
            );


        /*
         * --------------------------------
         * INITIAL FORM VALUES
         * --------------------------------
         *
         * Recovery wins when available.
         *
         * The recovery schema allows
         * mood = null, while the actual
         * form schema requires a mood.
         *
         * Therefore null is normalized to
         * undefined for the form.
         */

        const initialFormValues =
            recoveredData
                ? {
                    title:
                        recoveredData.title,

                    content:
                        recoveredData.content,

                    mood:
                        recoveredData.mood ??
                        undefined,

                    tags:
                        recoveredData.tags,
                }
                : originalValues;


        form.reset(
            initialFormValues,
        );


        /*
         * --------------------------------
         * SERVER IMAGE STATE
         * --------------------------------
         *
         * Images are intentionally NOT
         * part of Phase A recovery.
         */

        setExistingImages(
            journal.images ?? [],
        );

        setRemovedImagePublicIds([]);

        setNewImages([]);


        /*
         * --------------------------------
         * RECOVERY FEEDBACK
         * --------------------------------
         */

        if (recoveredData) {

            toast.info(
                "Unsaved changes restored",
                {
                    description:
                        "Your previous changes to this journal have been restored.",
                },
            );
        }

    }, [
        user?.id,
        journal,
        form,
    ]);


    /*
     * --------------------------------
     * AUTOSAVE EDIT RECOVERY
     * --------------------------------
     *
     * IMPORTANT:
     *
     * We do NOT use isRichTextEmpty()
     * here.
     *
     * An empty editor may itself be an
     * intentional unsaved change.
     */

    useEffect(() => {

        /*
         * Wait until all required identity
         * and baseline information exists.
         */
        if (
            !user?.id ||
            !journalId ||
            !originalValuesRef.current
        ) {
            return;
        }


        /*
         * Current form matches the server
         * baseline.
         *
         * There is nothing to recover.
         */
        if (!hasRecoveryChanges) {

            clearEditJournalRecovery();

            return;
        }


        /*
         * Debounce writes.
         *
         * We don't want localStorage to be
         * updated for every single keystroke.
         */
        const timeoutId =
            window.setTimeout(
                () => {

                    saveEditJournalRecovery(
                        user.id,
                        journalId,
                        {
                            title:
                                watchedValues.title ??
                                "",

                            content:
                                watchedValues.content ??
                                "",

                            /*
                             * Recovery storage allows
                             * null, while useWatch()
                             * may produce undefined.
                             */
                            mood:
                                watchedValues.mood ??
                                null,

                            tags:
                                watchedValues.tags ??
                                [],
                        },
                    );

                },
                500,
            );


        return () => {

            window.clearTimeout(
                timeoutId,
            );

        };

    }, [
        user?.id,
        journalId,
        watchedValues.title,
        watchedValues.content,
        watchedValues.mood,
        watchedValues.tags,
        hasRecoveryChanges,
    ]);


    /*
     * --------------------------------
     * JOURNAL DATE
     * --------------------------------
     */

    const journalDate =
        journal
            ? new Date(
                journal.publishedAt,
            )
            : new Date();


    /*
     * --------------------------------
     * WRITING TIP
     * --------------------------------
     */

    const [tip] =
        useState(
            () =>
                getRandomWritingTip(),
        );


    /*
     * --------------------------------
     * FORM VALUES FOR SIDEBAR
     * --------------------------------
     */

    const mood =
        form.watch("mood");

    const tags =
        form.watch("tags");


    /*
     * --------------------------------
     * VALIDATION ERRORS
     * --------------------------------
     */

    const moodError =
        form.formState.errors
            .mood?.message;

    const tagsError =
        form.formState.errors
            .tags?.message;


    /*
     * --------------------------------
     * UNSAVED CHANGES
     * --------------------------------
     *
     * This is intentionally separate
     * from hasRecoveryChanges.
     *
     * hasUnsavedChanges controls the
     * Save/Discard UI.
     *
     * hasRecoveryChanges controls
     * local recovery persistence.
     */

    const hasUnsavedChanges =
        form.formState.isDirty ||
        hasRecoveryChanges ||
        newImages.length > 0 ||
        removedImagePublicIds.length > 0;


    /*
     * --------------------------------
     * UPDATE JOURNAL
     * --------------------------------
     */

    const handleUpdate = (
        values: EditJournalFormValues,
    ) => {

        /*
         * Prevent duplicate submissions.
         */
        if (isUpdatePending) {
            return;
        }


        /*
         * Journal ID is required.
         */
        if (!journalId) {

            toast.error(
                "Unable to update journal",
                {
                    description:
                        "The journal ID is missing.",
                },
            );

            return;
        }


        /*
         * Build API payload.
         */
        const payload =
            buildUpdateJournalPayload(
                values,
                newImages,
                removedImagePublicIds,
            );


        updateJournal(
            {
                journalId,

                request:
                    payload.request,

                images:
                    payload.images,
            },

            {
                onSuccess: (
                    updatedJournal,
                ) => {

                    /*
                     * --------------------------------
                     * CLEAR LOCAL RECOVERY
                     * --------------------------------
                     *
                     * The server now contains the
                     * user's changes.
                     */
                    clearEditJournalRecovery();


                    /*
                     * --------------------------------
                     * RELEASE IMAGE PREVIEWS
                     * --------------------------------
                     */

                    newImages.forEach(
                        (image) => {

                            URL.revokeObjectURL(
                                image.previewUrl,
                            );

                        },
                    );


                    /*
                     * --------------------------------
                     * CLEAR TEMPORARY IMAGE STATE
                     * --------------------------------
                     */

                    setNewImages([]);

                    setRemovedImagePublicIds([]);


                    /*
                     * --------------------------------
                     * UPDATE LOCAL SERVER IMAGE STATE
                     * --------------------------------
                     */

                    setExistingImages(
                        updatedJournal.images ?? [],
                    );


                    /*
                     * --------------------------------
                     * SUCCESS FEEDBACK
                     * --------------------------------
                     */

                    toast.success(
                        "Journal updated",
                        {
                            description:
                                `"${updatedJournal.title}" was updated successfully.`,
                        },
                    );


                    /*
                     * --------------------------------
                     * NAVIGATE TO DETAILS
                     * --------------------------------
                     */

                    navigate(
                        buildJournalDetailsRoute(
                            updatedJournal.id,
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
                        "Failed to update journal",
                        {
                            description:
                                getErrorMessage(
                                    error,
                                ),
                        },
                    );

                    /*
                     * IMPORTANT:
                     *
                     * Do NOT:
                     *
                     * - reset the form
                     * - clear newImages
                     * - clear removedImagePublicIds
                     *
                     * The user should be able
                     * to correct the problem and retry.
                     */
                },
            },
        );
    };


    /*
     * --------------------------------
     * MOOD CHANGE
     * --------------------------------
     */

    const handleMoodChange = (
        value: NonNullable<
            EditJournalFormValues["mood"]
        >,
    ) => {

        form.setValue(
            "mood",
            value,
            {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
            },
        );
    };


    /*
     * --------------------------------
     * TAG CHANGE
     * --------------------------------
     */

    const handleTagsChange = (
        value: string[],
    ) => {

        form.setValue(
            "tags",
            value,
            {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
            },
        );
    };


    /*
     * --------------------------------
     * REMOVE EXISTING IMAGE
     * --------------------------------
     */

    const handleRemoveExistingImage = (
        publicId: string,
    ) => {

        setExistingImages(
            (previous) =>
                previous.filter(
                    (image) =>
                        image.publicId !==
                        publicId,
                ),
        );

        setRemovedImagePublicIds(
            (previous) => {

                if (
                    previous.includes(
                        publicId,
                    )
                ) {
                    return previous;
                }

                return [
                    ...previous,
                    publicId,
                ];
            },
        );
    };


    /*
     * --------------------------------
     * DISCARD REQUEST
     * --------------------------------
     */

    const handleDiscardRequest = () => {

        if (isUpdatePending) {
            return;
        }

        if (!hasUnsavedChanges) {
            return;
        }

        setIsDiscardDialogOpen(
            true,
        );
    };


    /*
     * --------------------------------
     * CONFIRM DISCARD
     * --------------------------------
     */

    const handleConfirmDiscard = () => {

        if (isUpdatePending) {
            return;
        }


        /*
         * --------------------------------
         * REVOKE NEW IMAGE PREVIEWS
         * --------------------------------
         */

        newImages.forEach(
            (image) => {

                URL.revokeObjectURL(
                    image.previewUrl,
                );

            },
        );


        /*
         * --------------------------------
         * CLEAR NEW IMAGES
         * --------------------------------
         */

        setNewImages([]);


        /*
         * --------------------------------
         * RESTORE SERVER IMAGES
         * --------------------------------
         */

        setExistingImages(
            journal?.images ?? [],
        );


        /*
         * --------------------------------
         * CLEAR IMAGE REMOVALS
         * --------------------------------
         */

        setRemovedImagePublicIds([]);


        /*
         * --------------------------------
         * CLEAR LOCAL RECOVERY
         * --------------------------------
         */

        clearEditJournalRecovery();


        /*
         * --------------------------------
         * RESTORE SERVER FORM VALUES
         * --------------------------------
         *
         * IMPORTANT:
         *
         * Do NOT use form.reset() alone.
         *
         * After recovery is loaded,
         * recovery values may have become
         * RHF's current defaults.
         *
         * Discard must return to the
         * SERVER-SAVED values.
         */

        form.reset(
            originalValuesRef.current ??
            {
                title:
                    journal?.title ?? "",

                content:
                    journal?.content ?? "",

                mood:
                    journal?.mood,

                tags:
                    journal?.tags ?? [],
            },
        );


        /*
         * --------------------------------
         * CLOSE DIALOG
         * --------------------------------
         */

        setIsDiscardDialogOpen(
            false,
        );


        /*
         * --------------------------------
         * SUCCESS FEEDBACK
         * --------------------------------
         */

        toast.success(
            "Changes discarded",
            {
                description:
                    "Your journal has been restored to its last saved state.",
            },
        );
    };


    /*
     * --------------------------------
     * REPLACE EXISTING IMAGE
     * --------------------------------
     */

    const handleReplaceExistingImage = (
        publicId: string,
        replacement: SelectedImage,
    ) => {

        setExistingImages(
            (previous) =>
                previous.filter(
                    (image) =>
                        image.publicId !==
                        publicId,
                ),
        );

        setRemovedImagePublicIds(
            (previous) => {

                if (
                    previous.includes(
                        publicId,
                    )
                ) {
                    return previous;
                }

                return [
                    ...previous,
                    publicId,
                ];
            },
        );

        setNewImages(
            (previous) => [
                ...previous,
                replacement,
            ],
        );
    };


    /*
     * --------------------------------
     * REFRESH WEATHER
     * --------------------------------
     */

    const handleRefreshWeather =
        async () => {

            await refetchWeather();
        };


    /*
     * ============================================================
     * INVALID JOURNAL ID
     * ============================================================
     */

    if (!journalId) {

        return (
            <AppLayout>

                <div
                    className="
                        flex
                        min-h-[60vh]
                        items-center
                        justify-center
                        px-4
                    "
                >
                    <Alert
                        className="max-w-lg"
                    >

                        <AlertCircle
                            className="h-4 w-4"
                        />

                        <AlertTitle>
                            Journal not found
                        </AlertTitle>

                        <AlertDescription>
                            We couldn't determine which
                            journal you want to edit.
                        </AlertDescription>

                    </Alert>
                </div>

            </AppLayout>
        );
    }


    /*
     * ============================================================
     * LOADING STATE
     * ============================================================
     */

    if (isLoading) {

        return (
            <AppLayout>

                <div
                    className="space-y-8"
                    aria-busy="true"
                    aria-live="polite"
                >

                    <section className="space-y-3">

                        <Skeleton
                            className="h-9 w-56"
                        />

                        <Skeleton
                            className="h-5 w-80"
                        />

                    </section>


                    <section
                        className="
                            grid
                            gap-8
                            xl:grid-cols-12
                        "
                    >

                        <main
                            className="
                                space-y-8
                                xl:col-span-8
                            "
                        >

                            <Skeleton
                                className="h-11 w-full"
                            />

                            <div className="space-y-3">

                                <Skeleton
                                    className="h-10 w-full"
                                />

                                <Skeleton
                                    className="h-72 w-full"
                                />

                            </div>


                            <div className="space-y-3">

                                <Skeleton
                                    className="h-6 w-32"
                                />

                                <div
                                    className="
                                        grid
                                        grid-cols-2
                                        gap-4
                                        sm:grid-cols-3
                                    "
                                >

                                    <Skeleton
                                        className="aspect-square w-full"
                                    />

                                    <Skeleton
                                        className="aspect-square w-full"
                                    />

                                    <Skeleton
                                        className="aspect-square w-full"
                                    />

                                </div>

                            </div>

                        </main>


                        <aside
                            className="
                                space-y-6
                                xl:col-span-4
                            "
                        >

                            <Skeleton
                                className="h-64 w-full"
                            />

                        </aside>

                    </section>

                </div>

            </AppLayout>
        );
    }


    /*
     * ============================================================
     * ERROR STATE
     * ============================================================
     */

    if (isError) {

        return (
            <AppLayout>

                <div
                    className="
                        flex
                        min-h-[60vh]
                        items-center
                        justify-center
                        px-4
                    "
                >

                    <Alert
                        variant="destructive"
                        className="max-w-lg"
                    >

                        <AlertCircle
                            className="h-4 w-4"
                        />

                        <AlertTitle>
                            Failed to load journal
                        </AlertTitle>

                        <AlertDescription
                            className="mt-2 space-y-4"
                        >

                            <p>
                                We couldn't load this journal.
                                Please try again.
                            </p>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    void refetch();
                                }}
                            >
                                Try again
                            </Button>

                        </AlertDescription>

                    </Alert>

                </div>

            </AppLayout>
        );
    }


    /*
     * ============================================================
     * NOT FOUND / NO DATA
     * ============================================================
     */

    if (!journal) {

        return (
            <AppLayout>

                <div
                    className="
                        flex
                        min-h-[60vh]
                        items-center
                        justify-center
                        px-4
                    "
                >

                    <Alert
                        className="max-w-lg"
                    >

                        <AlertCircle
                            className="h-4 w-4"
                        />

                        <AlertTitle>
                            Journal not found
                        </AlertTitle>

                        <AlertDescription>
                            The journal you're trying to edit
                            could not be found.
                        </AlertDescription>

                    </Alert>

                </div>

            </AppLayout>
        );
    }


    /*
     * ============================================================
     * MAIN EDIT PAGE
     * ============================================================
     */

    return (
        <AppLayout>

            <FormProvider
                {...form}
            >

                <JournalEditLayout
                    title="Edit Journal"
                    description="Update your journal and save your changes."
                    sidebar={
                        <>
                            {/* --------------------------------
                                JOURNAL DETAILS
                            --------------------------------- */}

                            <JournalDetailsCard
                                date={
                                    journalDate
                                }

                                mood={
                                    mood ?? null
                                }

                                tags={
                                    tags
                                }

                                onMoodChange={
                                    handleMoodChange
                                }

                                onTagsChange={
                                    handleTagsChange
                                }

                                moodError={
                                    moodError
                                }

                                tagsError={
                                    tagsError
                                }

                                disabled={
                                    isUpdatePending
                                }

                                onDateClick={() => {
                                    console.log(
                                        "Open date picker",
                                    );
                                }}

                                onTimeClick={() => {
                                    console.log(
                                        "Open time picker",
                                    );
                                }}
                            />


                            {/* --------------------------------
                                WEATHER
                            --------------------------------- */}

                            <WeatherCard
                                weather={
                                    weather
                                }

                                loading={
                                    isWeatherLoading ||
                                    isWeatherFetching
                                }

                                error={
                                    isWeatherError
                                }

                                disabled={
                                    isUpdatePending
                                }

                                onRefresh={
                                    handleRefreshWeather
                                }
                            />


                            {/* --------------------------------
                                WRITING TIP
                            --------------------------------- */}

                            <WritingTipCard
                                tip={
                                    tip
                                }
                            />

                        </>
                    }
                >

                    <EditJournalForm
                        existingImages={
                            existingImages
                        }

                        newImages={
                            newImages
                        }

                        onNewImagesChange={
                            setNewImages
                        }

                        onRemoveExistingImage={
                            handleRemoveExistingImage
                        }

                        onReplaceExistingImage={
                            handleReplaceExistingImage
                        }

                        onSubmit={
                            handleUpdate
                        }

                        isUpdating={
                            isUpdatePending
                        }

                        onDiscardRequest={
                            handleDiscardRequest
                        }

                        hasUnsavedChanges={
                            hasUnsavedChanges
                        }
                    />

                </JournalEditLayout>


                {/* --------------------------------------------
                    DISCARD CONFIRMATION
                --------------------------------------------- */}

                <AlertDialog
                    open={
                        isDiscardDialogOpen
                    }

                    onOpenChange={
                        (open) => {

                            if (
                                isUpdatePending
                            ) {
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
                                Discard changes?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                                All unsaved changes to this
                                journal, including newly added
                                images and image removals, will
                                be discarded.
                            </AlertDialogDescription>

                        </AlertDialogHeader>


                        <AlertDialogFooter>

                            <AlertDialogCancel
                                disabled={
                                    isUpdatePending
                                }
                            >
                                Cancel
                            </AlertDialogCancel>


                            <AlertDialogAction
                                onClick={
                                    handleConfirmDiscard
                                }

                                disabled={
                                    isUpdatePending
                                }
                            >
                                Discard Changes
                            </AlertDialogAction>

                        </AlertDialogFooter>

                    </AlertDialogContent>

                </AlertDialog>

            </FormProvider>

        </AppLayout>
    );
}