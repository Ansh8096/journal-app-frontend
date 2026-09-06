import { ERROR_MESSAGES } from "@/constants/app/error";
import { AppError } from "./AppError";
import { HTTP_STATUS } from "@/constants/app/http";

// Returns true if the value is an AppError.
export function isAppError(
    error: unknown,
): error is AppError {
    return error instanceof AppError; // This isn't just a boolean, It's a TypeScript type predicate.
}

// Safely extracts a user-friendly error message.
export function getErrorMessage(
    error: unknown,
): string {
    if (isAppError(error)) {
        return error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return ERROR_MESSAGES.DEFAULT.message;
}


// Returns true if the error represents a validation error.
export function isValidationError(
    error: unknown,
): error is AppError {
    return (
        isAppError(error) &&
        error.status === HTTP_STATUS.BAD_REQUEST &&
        !!error.validationErrors
    );
}

//  Returns true if the error is Unauthorized.
export function isUnauthorized(
    error: unknown,
): boolean {
    return (
        isAppError(error) &&
        error.status === HTTP_STATUS.UNAUTHORIZED
    );
}


// Returns true if the error is Forbidden.
export function isForbidden(
    error: unknown,
): boolean {
    return (
        isAppError(error) &&
        error.status === HTTP_STATUS.FORBIDDEN
    );
}


// Returns true if the error is Not Found.
export function isNotFound(
    error: unknown,
): boolean {
    return (
        isAppError(error) &&
        error.status === HTTP_STATUS.NOT_FOUND
    );
}


// Returns true if the error is Conflict.
export function isConflict(
    error: unknown,
): error is AppError {
    return (
        isAppError(error) &&
        error.status === HTTP_STATUS.CONFLICT
    );
}