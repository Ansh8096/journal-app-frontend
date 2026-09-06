import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { profileConfig } from "../Config";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    preferencesSchema,
    type PreferencesFormData,
} from "@/schemas/profile/personal-information";

import { useAuth } from "@/hooks/useAuth";

import {
    useEffect,
    type EventHandler,
} from "react";

import LoadingSubmitButton from "@/components/common/LoadingSubmitButton";

import { toast } from "sonner";

import {
    useProfileMutations,
} from "@/hooks/useProfileMutations";

import { getErrorMessage } from "@/lib/error";

import {
    useQueryClient,
} from "@tanstack/react-query";

import {
    weatherKeys,
} from "@/lib/react-query/query-keys";

type EditPreferencesDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function EditPreferencesDialog({
    open,
    onOpenChange,
}: EditPreferencesDialogProps) {
    const {
        user,
        refreshUser,
    } = useAuth();

    const {
        updatePreferences,
    } = useProfileMutations();

    const queryClient =
        useQueryClient();

    const form =
        useForm<PreferencesFormData>({
            resolver:
                zodResolver(
                    preferencesSchema,
                ),
            defaultValues: {
                city: "",
                sentimentAnalysisEnabled:
                    false,
            },
        });

    const onSubmit = async (
        data: PreferencesFormData,
    ) => {
        try {
            /*
             * ----------------------------------------
             * 1. Update preferences on the backend
             * ----------------------------------------
             */
            const result =
                await updatePreferences(
                    data,
                );

            if (!result.updated) {
                onOpenChange(false);
                return;
            }

            /*
             * ----------------------------------------
             * 2. Refresh AuthContext user
             *
             * This updates user.city immediately
             * so the rest of the application now
             * knows about the new city.
             * ----------------------------------------
             */
            await refreshUser();

            /*
             * ----------------------------------------
             * 3. Invalidate + refetch weather
             *
             * The weather endpoint reads the current
             * user's city, so after the profile update
             * we must fetch weather again.
             * ----------------------------------------
             */
            await queryClient.invalidateQueries({
                queryKey:
                    weatherKeys.current(),
                refetchType: "all",
            });

            toast.success(
                "Preferences updated successfully.",
            );

            onOpenChange(false);
        } catch (error) {
            toast.error(
                getErrorMessage(error),
            );
        }
    };

    /*
     * Populate form with current user data
     * whenever the dialog opens.
     */
    useEffect(() => {
        if (!open || !user) {
            return;
        }

        form.reset({
            city:
                user.city ?? "",

            sentimentAnalysisEnabled:
                user.sentimentAnalysisEnabled,
        });
    }, [
        form,
        open,
        user,
    ]);

    const preventCloseWhileSubmitting: EventHandler<any> = (
        event,
    ) => {
        if (
            form.formState
                .isSubmitting
        ) {
            event.preventDefault();
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(
                nextOpen,
            ) => {
                if (
                    form.formState
                        .isSubmitting
                ) {
                    return;
                }

                onOpenChange(
                    nextOpen,
                );
            }}
        >
            <DialogContent
                className="sm:max-w-lg"
                onOpenAutoFocus={(
                    event,
                ) => {
                    event.preventDefault();
                }}
                onPointerDownOutside={
                    preventCloseWhileSubmitting
                }
                onEscapeKeyDown={
                    preventCloseWhileSubmitting
                }
            >
                <DialogHeader>
                    <DialogTitle>
                        {
                            profileConfig
                                .dialogs
                                .preferences
                                .title
                        }
                    </DialogTitle>

                    <DialogDescription>
                        {
                            profileConfig
                                .dialogs
                                .preferences
                                .description
                        }
                    </DialogDescription>
                </DialogHeader>

                <div className="py-2">
                    <Form {...form}>
                        <form
                            onSubmit={
                                form.handleSubmit(
                                    onSubmit,
                                )
                            }
                            className="space-y-6"
                        >
                            {/* City */}
                            <FormField
                                control={
                                    form.control
                                }
                                name="city"
                                render={({
                                    field,
                                }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {
                                                profileConfig
                                                    .labels
                                                    .city
                                            }
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                autoComplete="address-level2"
                                                placeholder={
                                                    profileConfig
                                                        .placeholders
                                                        .city
                                                }
                                                disabled={
                                                    form
                                                        .formState
                                                        .isSubmitting
                                                }
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Sentiment Analysis */}
                            <FormField
                                control={
                                    form.control
                                }
                                name="sentimentAnalysisEnabled"
                                render={({
                                    field,
                                }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={
                                                    field.value
                                                }
                                                disabled={
                                                    form
                                                        .formState
                                                        .isSubmitting
                                                }
                                                onCheckedChange={
                                                    field.onChange
                                                }
                                            />
                                        </FormControl>

                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                {
                                                    profileConfig
                                                        .labels
                                                        .sentimentAnalysis
                                                }
                                            </FormLabel>

                                            <FormDescription>
                                                {
                                                    profileConfig
                                                        .descriptions
                                                        .weeklySentimentEmails
                                                }
                                            </FormDescription>

                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={
                                        form
                                            .formState
                                            .isSubmitting
                                    }
                                    onClick={() => {
                                        if (
                                            user
                                        ) {
                                            form.reset({
                                                city:
                                                    user.city ??
                                                    "",
                                                sentimentAnalysisEnabled:
                                                    user.sentimentAnalysisEnabled,
                                            });
                                        }

                                        onOpenChange(
                                            false,
                                        );
                                    }}
                                >
                                    {
                                        profileConfig
                                            .actions
                                            .cancel
                                    }
                                </Button>

                                <LoadingSubmitButton
                                    loading={
                                        form
                                            .formState
                                            .isSubmitting
                                    }
                                    loadingText={
                                        profileConfig
                                            .actions
                                            .saving
                                    }
                                >
                                    {
                                        profileConfig
                                            .actions
                                            .save
                                    }
                                </LoadingSubmitButton>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}