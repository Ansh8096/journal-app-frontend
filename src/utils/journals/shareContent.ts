export interface ShareContentOptions {
    title?: string;
    text?: string;
    url?: string;
}

export interface ShareContentResult {
    success: boolean;
    usedWebShare: boolean;
    usedClipboard: boolean;
}

export async function shareContent({
    title,
    text,
    url,
}: ShareContentOptions): Promise<ShareContentResult> {
    // Prefer the native share sheet when available.
    if (navigator.share) {
        try {
            await navigator.share({
                title,
                text,
                url,
            });

            return {
                success: true,
                usedWebShare: true,
                usedClipboard: false,
            };
        } catch (error) {
            // User cancelled the share dialog.
            if (
                error instanceof DOMException &&
                error.name === "AbortError"
            ) {
                return {
                    success: false,
                    usedWebShare: true,
                    usedClipboard: false,
                };
            }

            throw error;
        }
    }

    // Fallback to clipboard if supported.
    if (navigator.clipboard && url) {
        await navigator.clipboard.writeText(url);

        return {
            success: true,
            usedWebShare: false,
            usedClipboard: true,
        };
    }

    throw new Error(
        "Sharing is not supported on this browser."
    );
}