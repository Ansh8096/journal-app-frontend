import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";

import { journalKeys } from "@/lib/react-query/query-keys";

import type {
    JournalResponse,
    JournalPageResponse,
} from "@/types/api/journal";

interface DeleteJournalImageVariables {
    journalId: string;
    publicId: string;
}

export function useDeleteJournalImage() {

    const queryClient =
        useQueryClient();

    return useMutation({

        mutationFn: ({
            journalId,
            publicId,
        }: DeleteJournalImageVariables) =>
            journalService.deleteJournalImage(
                journalId,
                publicId,
            ),

        async onMutate({
            journalId,
            publicId,
        }) {

            await queryClient.cancelQueries({
                queryKey:
                    journalKeys.detail(
                        journalId,
                    ),
            });

            await queryClient.cancelQueries({
                queryKey:
                    journalKeys.lists(),
            });

            const previousJournal =
                queryClient.getQueryData<JournalResponse>(
                    journalKeys.detail(
                        journalId,
                    ),
                );

            const previousJournalLists =
                queryClient.getQueriesData<JournalPageResponse>({
                    queryKey:
                        journalKeys.lists(),
                });

            if (previousJournal) {

                const updatedImages =
                    previousJournal.images.filter(
                        image =>
                            image.publicId !== publicId,
                    );

                queryClient.setQueryData(
                    journalKeys.detail(
                        journalId,
                    ),
                    {
                        ...previousJournal,

                        images:
                            updatedImages,
                    },
                );
            }

            return {
                previousJournal,
                previousJournalLists,
            };
        },

        onSuccess(updatedJournal) {

            queryClient.setQueryData(
                journalKeys.detail(
                    updatedJournal.id,
                ),
                updatedJournal,
            );

            queryClient.setQueriesData(
                {
                    queryKey:
                        journalKeys.lists(),
                },
                (
                    old:
                        | JournalPageResponse
                        | undefined,
                ) => {

                    if (!old) {
                        return old;
                    }

                    return {

                        ...old,

                        journals:
                            old.journals.map(
                                journal =>
                                    journal.id ===
                                        updatedJournal.id
                                        ? {
                                            ...journal,
                                            coverImageUrl:
                                                updatedJournal.coverImageUrl,
                                        }
                                        : journal,
                            ),
                    };

                },
            );
        },

        onError(
            _,
            variables,
            context,
        ) {

            if (
                context?.previousJournal
            ) {

                queryClient.setQueryData(
                    journalKeys.detail(
                        variables.journalId,
                    ),
                    context.previousJournal,
                );
            }

            context?.previousJournalLists.forEach(
                ([
                    queryKey,
                    data,
                ]) => {

                    queryClient.setQueryData(
                        queryKey,
                        data,
                    );

                },
            );
        },

    });

}