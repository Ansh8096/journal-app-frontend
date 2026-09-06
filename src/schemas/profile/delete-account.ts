import { z } from "zod";

export const deleteAccountSchema =
    z.object({
        password: z
            .string()
            .min(
                1,
                "Please enter your current password.",
            ),
    });

export type DeleteAccountFormData =
    z.infer<
        typeof deleteAccountSchema
    >;