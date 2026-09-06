export const PROFILE_IMAGE = {
    MAX_SIZE: 5 * 1024 * 1024, // 5 MB
    ACCEPT:"image/png,image/jpeg,image/webp",
    MAX_SIZE_LABEL: "5 MB",
    ALLOWED_TYPES: [
        "image/jpeg",
        "image/png",
        "image/webp",
    ] as const,

};