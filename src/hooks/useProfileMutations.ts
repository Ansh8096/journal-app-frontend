import { useAuth } from "@/hooks/useAuth";

import userService from "@/services/user.service";

import type { ChangeEmailFormData, PreferencesFormData, UsernameFormData } from "@/schemas/profile/personal-information";
import storage from "@/utils/storage/storage";
import { STORAGE_KEYS } from "@/constants/app/storage";

export type MutationResult = {
    updated: boolean;
};


export function useProfileMutations() {
    const { user, refreshUser } = useAuth();

    const changeUsername = async (data: UsernameFormData): Promise<MutationResult> => {
        if (!user) {
            throw new Error("User not found.");
        }

        const username = data.username.trim();

        if (username === user.username) {
            return {
                updated: false
            }
        }

        const response = await userService.changeUsername({
            username,
        });

        // set the new jwt in the local storage...
        storage.set(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken)

        await refreshUser();

        return{
            updated: true
        }
    };

    const changeEmail = async (data: ChangeEmailFormData): Promise<MutationResult> => {
        if (!user) {
            throw new Error("User not found.");
        }

        const newEmail = data.newEmail.trim();

        if (newEmail === user.email) {
            return {
                updated: false,
            };
        }

        await userService.changeEmail({
            newEmail,
            password: data.password,
        });

        await refreshUser();

        return {
            updated: true,
        };
    };

    const updatePreferences = async (data: PreferencesFormData): Promise<MutationResult> => {
        
        if (!user) {
            throw new Error("User not found.");
        }

        const city = data.city.trim();

        const cityChanged = city !== (user.city ?? "");

        const sentimentChanged =
            data.sentimentAnalysisEnabled !==
            user.sentimentAnalysisEnabled;

        if (!cityChanged && !sentimentChanged) {
            return {
                updated: false,
            };
        }

        await userService.updateProfile({
            city,
            sentimentAnalysisEnabled:
                data.sentimentAnalysisEnabled,
        });

        await refreshUser();

        return {
            updated: true,
        };
    };

    const uploadAvatar = async (file: File): Promise<MutationResult> => {
        if (!user) throw new Error("User not found.");
        await userService.uploadProfileImage(file);
        await refreshUser();
        return {
            updated: true,
        };
    };

    return {
        changeUsername,
        changeEmail,
        updatePreferences,
        uploadAvatar
    };
}