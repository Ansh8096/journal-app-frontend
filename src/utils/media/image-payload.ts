import type { SelectedImage } from "@/types/journal/image";

/**
 * Extracts the original File objects
 * from UI-level SelectedImage objects.
 *
 * The previewUrl and local id are intentionally
 * excluded because they only exist for the
 * browser preview experience.
 */
export function extractImageFiles(
    images: SelectedImage[],
): File[] {

    return images.map(
        (image) => image.file,
    );
}