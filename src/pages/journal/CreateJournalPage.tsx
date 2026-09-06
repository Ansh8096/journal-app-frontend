import React from "react";

import {
    FormProvider,
    useForm,
    useWatch,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    createJournalConfig,
} from "@/components/journal/create/form/CreateJournalConfig";

import CreateJournalForm from "@/components/journal/create/form/CreateJournalForm";

import WritingTipCard from "@/components/journal/create/inspiration/WritingTipCard";

import {
    JournalDetailsCard,
} from "@/components/journal/create/details/JournalDetailsCard";

import WeatherCard from "@/components/journal/create/weather/WeatherCard";

import {
    getRandomWritingTip,
} from "@/lib/writing-tip/getRandomWritingTip";

import {
    createJournalSchema,
    type CreateJournalFormValues,
} from "@/schemas/journal/create-journal.schema";

import AppLayout from "@/layouts/app/AppLayout";
import { useCreateJournal } from "@/hooks/journal";
import { useWeather } from "@/hooks/weather/useWeather";
import { clearCreateJournalRecovery, loadCreateJournalRecovery, saveCreateJournalRecovery } from "@/lib/journal/create-journal-recovery";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { isRichTextEmpty } from "@/lib/validation/isRichTextEmpty";


export default function CreateJournalPage() {

    /* ---------------------------------------------------------------------- */
    /*                         CREATE JOURNAL FORM                            */
    /* ---------------------------------------------------------------------- */

    const { user } = useAuth();

    const recoveredData =
        React.useMemo(
            () => {
                if (!user) {
                    return null;
                }

                return loadCreateJournalRecovery(
                    user.id,
                );
            },
            [user?.id],
        );

    const form =
        useForm<CreateJournalFormValues>({
            resolver:
                zodResolver(
                    createJournalSchema,
                ),

            defaultValues:
                recoveredData ?? {
                    title: "",
                    content: "",
                    mood: null,
                    tags: [],
                },

            mode: "onBlur",
        });

    const {
        isPending: isCreatePending,
    } = useCreateJournal();

    const {
        data: weather,
        isLoading: isWeatherLoading,
        isFetching: isWeatherFetching,
        isError: isWeatherError,
        refetch: refetchWeather,
    } = useWeather();

    const watchedValues =
        useWatch({
            control: form.control,
        });


    const hasContent =
        !isRichTextEmpty(
            watchedValues.content ?? "",
        );

    const hasRecoveryData =
        Boolean(
            watchedValues.title?.trim() ||
            hasContent ||
            watchedValues.mood ||
            watchedValues.tags?.length,
        );

    React.useEffect(() => {

        if (!user?.username) {
            return;
        }

        /*
         * --------------------------------
         * EMPTY FORM
         * --------------------------------
         *
         * Clear recovery immediately.
         * We do NOT debounce this.
         */
        if (!hasRecoveryData) {
            clearCreateJournalRecovery();
            return;
        }

        /*
         * --------------------------------
         * NON-EMPTY FORM
         * --------------------------------
         *
         * Debounce writes so we don't write
         * to localStorage on every keystroke.
         */
        const timeoutId =
            window.setTimeout(() => {

                saveCreateJournalRecovery(
                    user.id,
                    {
                        title:
                            watchedValues.title ?? "",

                        content:
                            watchedValues.content ?? "",

                        mood:
                            watchedValues.mood ?? null,

                        tags:
                            watchedValues.tags ?? [],
                    },
                );

            }, 500);

        return () => {
            window.clearTimeout(
                timeoutId,
            );
        };

    }, [
        user?.username,
        watchedValues.title,
        watchedValues.content,
        watchedValues.mood,
        watchedValues.tags,
        hasRecoveryData,
    ]);

    React.useEffect(() => {
        if (!recoveredData) {
            return;
        }

        toast.info(
            "Unfinished journal restored",
            {
                description:
                    "Your previous writing has been restored.",
            },
        );

    }, [recoveredData]);

    /* ---------------------------------------------------------------------- */
    /*                              JOURNAL DATE                              */
    /* ---------------------------------------------------------------------- */

    const [date] =
        React.useState(
            () => new Date(),
        );


    /* ---------------------------------------------------------------------- */
    /*                             WRITING TIP                                */
    /* ---------------------------------------------------------------------- */

    const [tip] =
        React.useState(
            () =>
                getRandomWritingTip(),
        );


    /* ---------------------------------------------------------------------- */
    /*                             FORM VALUES                                */
    /* ---------------------------------------------------------------------- */

    const mood =
        form.watch("mood");

    const tags =
        form.watch("tags");


    const moodError = form.formState.errors.mood?.message;

    const tagsError = form.formState.errors.tags?.message;

    const handleRefreshWeather = async () => {
        await refetchWeather();
    };


    /* ---------------------------------------------------------------------- */
    /*                             MOOD CHANGE                                */
    /* ---------------------------------------------------------------------- */

    const handleMoodChange = (
        value: NonNullable<
            CreateJournalFormValues["mood"]
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


    /* ---------------------------------------------------------------------- */
    /*                              TAG CHANGE                                */
    /* ---------------------------------------------------------------------- */

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



    return (
        <AppLayout>

            <FormProvider {...form}>

                <div className="space-y-8">

                    {/* ----------------------------------------------------------------
                        PAGE HEADER
                    ----------------------------------------------------------------- */}

                    <section className="space-y-2">

                        <h1 className="text-3xl font-bold tracking-tight">
                            {
                                createJournalConfig.pageTitle
                            }
                        </h1>

                        <p className="text-md text-muted-foreground">
                            {
                                createJournalConfig.pageDescription
                            }
                        </p>

                    </section>


                    {/* ----------------------------------------------------------------
                        PAGE CONTENT
                    ----------------------------------------------------------------- */}

                    <section className="grid gap-8 xl:grid-cols-12">

                        {/* ----------------------------------------------------------------
                            LEFT COLUMN
                        ----------------------------------------------------------------- */}

                        <main className="xl:col-span-8">

                            <CreateJournalForm />

                        </main>


                        {/* ----------------------------------------------------------------
                            RIGHT COLUMN
                        ----------------------------------------------------------------- */}

                        <aside className="space-y-6 xl:col-span-4">

                            {/* ----------------------------------------------------------------
                                JOURNAL DETAILS
                            ----------------------------------------------------------------- */}

                            <JournalDetailsCard
                                date={date}

                                mood={
                                    mood ?? null
                                }

                                tags={tags}

                                onMoodChange={
                                    handleMoodChange
                                }

                                onTagsChange={
                                    handleTagsChange
                                }

                                moodError={moodError}

                                tagsError={tagsError}

                                disabled={isCreatePending}

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


                            {/* ----------------------------------------------------------------
                                WEATHER
                            ----------------------------------------------------------------- */}

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
                                    isCreatePending
                                }

                                onRefresh={
                                    handleRefreshWeather
                                }
                            />


                            {/* ----------------------------------------------------------------
                                WRITING TIP
                            ----------------------------------------------------------------- */}

                            <WritingTipCard
                                tip={tip}
                            />

                        </aside>

                    </section>

                </div>

            </FormProvider>

        </AppLayout>
    );
}