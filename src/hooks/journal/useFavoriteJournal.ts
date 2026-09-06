import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import journalService from "@/services/journal.service";

import { journalKeys } from "@/lib/react-query/query-keys";

import type {
    JournalPageResponse,
    JournalResponse,
    UpdateFavoriteRequest,
} from "@/types/api/journal";
import { toast } from "sonner";
import { journalDetailsConfig } from "@/components/journal/details/JournalDetailsConfig";

interface UpdateFavoriteVariables {
    journalId: string;
    request: UpdateFavoriteRequest;
}
export function useFavoriteJournal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            journalId,
            request,
        }: UpdateFavoriteVariables) =>
            journalService.updateFavorite(journalId, request),

        async onMutate({
            journalId,
            request,
        }) {
            await queryClient.cancelQueries({
                queryKey: journalKeys.detail(journalId),
            });

            await queryClient.cancelQueries({
                queryKey: journalKeys.lists(),
            });

            const previousJournal =
                queryClient.getQueryData<JournalResponse>(
                    journalKeys.detail(journalId),
                );

            const previousJournalLists =
                queryClient.getQueriesData<JournalPageResponse>({
                    queryKey: journalKeys.lists(),
                });

            // Update Journal Details cache
            queryClient.setQueryData<JournalResponse>(
                journalKeys.detail(journalId),
                (old) =>
                    old
                        ? {
                            ...old,
                            favorite: request.favorite,
                        }
                        : old,
            );

            // Update every Journal List cache
            previousJournalLists.forEach(([queryKey]) => {
                queryClient.setQueryData<JournalPageResponse>(
                    queryKey,
                    (old) => {
                        if (!old) {
                            return old;
                        }

                        return {
                            ...old,
                            journals: old.journals.map(
                                (journal) =>
                                    journal.id === journalId
                                        ? {
                                            ...journal,
                                            favorite:
                                                request.favorite,
                                        }
                                        : journal,
                            ),
                        };
                    },
                );
            });

            return {
                previousJournal,
                previousJournalLists,
            };
        },

        onError(
            _error,
            { journalId },
            context,
        ) {
            if (context?.previousJournal) {
                queryClient.setQueryData(
                    journalKeys.detail(journalId),
                    context.previousJournal,
                );
            }

            context?.previousJournalLists.forEach(
                ([queryKey, data]) => {
                    queryClient.setQueryData(
                        queryKey,
                        data,
                    );
                },
            );

            toast.error(
                journalDetailsConfig.toast.favoriteError.title,
                {
                    description:
                        journalDetailsConfig.toast.favoriteError.description,
                },
            );

        },

        onSettled(
            _,
            __,
            { journalId },
        ) {
            queryClient.invalidateQueries({
                queryKey: journalKeys.detail(journalId),
            });

            queryClient.invalidateQueries({
                queryKey: journalKeys.lists(),
            });

            queryClient.invalidateQueries({
                queryKey:
                    journalKeys.statistics(),
            });
        },

        onSuccess(_, { request }) {
            if (request.favorite) {
                toast.success(
                    journalDetailsConfig.toast.favoriteAdded.title,
                    {
                        description:
                            journalDetailsConfig.toast.favoriteAdded.description,
                    },
                );
            } else {
                toast.success(
                    journalDetailsConfig.toast.favoriteRemoved.title,
                    {
                        description:
                            journalDetailsConfig.toast.favoriteRemoved.description,
                    },
                );
            }
        },

    });
}