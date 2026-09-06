import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";
import { journalKeys } from "@/lib/react-query/query-keys";

import type {
    JournalResponse,
    JournalSummary,
} from "@/types/api/journal";

interface UploadImagesVariables {
    journalId: string;
    files: File[];
}


export function useUploadJournalImages() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            journalId,
            files,
        }: UploadImagesVariables) =>
            journalService.uploadJournalImages(
                journalId,
                files,
            ),

        async onMutate({
            journalId,
        }) {
            await queryClient.cancelQueries({
                queryKey:
                    journalKeys.detail(journalId),
            });

            return {
                previousJournal:
                    queryClient.getQueryData<JournalResponse>(
                        journalKeys.detail(
                            journalId,
                        ),
                    ),
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
                        | {
                            journals: JournalSummary[];
                        }
                        | undefined,
                ) => {
                    if (!old) {
                        return old;
                    }

                    return {
                        ...old,
                        journals:
                            old.journals.map(
                                (
                                    journal,
                                ) =>
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
        },
    });
}