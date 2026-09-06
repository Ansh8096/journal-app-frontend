export const ERROR_MESSAGES = {
    NETWORK: {
        status: 0,
        message:
            "Unable to connect to the server. Please check your internet connection.",
    },

    TIMEOUT: {
        status: 408,
        message: "The request timed out. Please try again.",
    },

    DEFAULT: {
        status: 500,
        message: "Something went wrong. Please try again later.",
    },
} as const;