import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import userService from "@/services/user.service";

import type {
    DeleteAccountRequest,
} from "@/types/api/user";

export function useDeleteAccount() {
    const queryClient =
        useQueryClient();

    return useMutation<
        Awaited<
            ReturnType<
                typeof userService.deleteAccount
            >
        >,
        Error,
        DeleteAccountRequest
    >({
        mutationFn: (
            request,
        ) =>
            userService.deleteAccount(
                request,
            ),

        onSuccess: () => {
            /*
             * The account has been permanently deleted.
             *
             * Remove all React Query data that may belong
             * to the deleted account:
             *
             * - journals
             * - drafts
             * - journal details
             * - statistics
             * - weather
             * - profile-related queries
             * - any other cached account-specific data
             */
            queryClient.clear();
        },
    });
}