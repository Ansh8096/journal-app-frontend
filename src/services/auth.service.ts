import authApi from "@/api/auth.api";

import {
    STORAGE_KEYS,
} from "@/constants/storage";

import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
} from "@/types/api/auth";

import type {
    MessageResponse,
} from "@/types/api/common";

import storage from "@/utils/storage";

class AuthService {

    private saveAccessToken(
        token: string,
    ): void {

        storage.set(
            STORAGE_KEYS.ACCESS_TOKEN,
            token,
        );
    }

    private removeAccessToken(): void {

        storage.remove(
            STORAGE_KEYS.ACCESS_TOKEN,
        );
    }

    async signup(
        request: RegisterRequest,
    ): Promise<MessageResponse> {

        return await authApi.signup(
            request,
        );
    }

    async login(
        request: LoginRequest,
    ): Promise<LoginResponse> {

        const response =
            await authApi.login(
                request,
            );

        this.saveAccessToken(
            response.accessToken,
        );

        return response;
    }

    /**
     * Completes Google authentication.
     *
     * The backend converts the temporary
     * OAuth handoff into the normal
     * JournalFlow JWT response.
     */
    async loginWithGoogle(): Promise<LoginResponse> {

        const response =
            await authApi.exchangeGoogleToken();

        this.saveAccessToken(
            response.accessToken,
        );

        return response;
    }

    logout(): void {

        this.removeAccessToken();
    }

    getAccessToken(): string | null {

        return storage.get<string>(
            STORAGE_KEYS.ACCESS_TOKEN,
        );
    }

    isAuthenticated(): boolean {

        return this.getAccessToken() !== null;
    }
}

export default new AuthService();