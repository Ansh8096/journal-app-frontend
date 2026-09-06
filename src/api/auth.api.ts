import client from "./client";

import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
} from "@/types/api/auth";

import type {
    MessageResponse,
} from "@/types/api/common";

class AuthApi {

    async login(
        request: LoginRequest,
    ): Promise<LoginResponse> {

        const { data } =
            await client.post<LoginResponse>(
                "/auth/login",
                request,
            );

        console.log(
            "user is logged in, response: ",
            data,
        );

        return data;
    }

    async signup(
        request: RegisterRequest,
    ): Promise<MessageResponse> {

        const { data } =
            await client.post<MessageResponse>(
                "/auth/signup",
                request,
            );

        console.log(
            "user is created, response: ",
            data.message,
        );

        return data;
    }

    /**
     * Completes the Google OAuth flow.
     *
     * The backend reads the temporary HttpOnly
     * OAuth cookie and returns the normal
     * JournalFlow LoginResponse.
     */
    async exchangeGoogleToken(): Promise<LoginResponse> {

        const { data } =
            await client.post<LoginResponse>(
                "/auth/oauth2/exchange",
                undefined,
                {
                    withCredentials: true,
                },
            );

        return data;
    }
}

export default new AuthApi();