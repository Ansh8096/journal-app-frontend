import type {
    AxiosError,
    AxiosResponse,
} from "axios";
import { AppError } from "@/lib/error";
import type { ErrorResponse } from "@/types/api/error";
import { ERROR_MESSAGES } from "@/constants/app/error";


export function  handleResponse<T>(response: AxiosResponse<T>) {
    return response;
}

export function handleResponseError (error: AxiosError<ErrorResponse>) {
    
    const response = error.response;

    if (
        response?.data &&
        typeof response.data.message === "string" &&
        typeof response.data.status === "number"
    ){
        // fetch required fields from the data only...
        const { status, message, validationErrors, field } = response.data;
        // create our own AppError...
        return Promise.reject(
            new AppError({
                status,
                message,
                field,
                validationErrors,
            }),
        );
    }

    // It converts the networks errors (such as: no internet) into our own AppError...
    if (error.code === "ERR_NETWORK") {
        return Promise.reject(
            new AppError(ERROR_MESSAGES.NETWORK),
        );
    }

    // It converts the timeout errors into our own AppError...
    if (error.code === "ECONNABORTED") {
        return Promise.reject(
            new AppError(ERROR_MESSAGES.TIMEOUT),
        );
    }

    // It converts the unknown errors into our own AppError...
    return Promise.reject(
        new AppError(ERROR_MESSAGES.DEFAULT),
    );
    
}
