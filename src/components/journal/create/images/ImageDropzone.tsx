import { Image } from "lucide-react";

import ImageUploadButton from "./ImageUploadButton";

import { cn } from "@/lib/utils";

import { JOURNAL_CONFIG } from "../../common/journal-common.config";

interface ImageDropzoneProps {
    disabled?: boolean;

    isDragging: boolean;

    onChooseFiles: () => void;

    onDragEnter: (
        event: React.DragEvent<HTMLDivElement>,
    ) => void;

    onDragOver: (
        event: React.DragEvent<HTMLDivElement>,
    ) => void;

    onDragLeave: (
        event: React.DragEvent<HTMLDivElement>,
    ) => void;

    onDrop: (
        event: React.DragEvent<HTMLDivElement>,
    ) => void;
}

export default function ImageDropzone({
    disabled = false,
    isDragging,
    onChooseFiles,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
}: ImageDropzoneProps) {
    return (
        <div
            role="region"
            aria-label="Journal image upload area"
            aria-busy={disabled}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={cn(
                `
                flex
                min-h-[190px]
                w-full
                flex-col
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                px-4
                py-8
                text-center
                transition-all
                duration-200

                sm:px-6
                sm:py-10
                `,
                disabled &&
                `
                    cursor-not-allowed
                    opacity-60
                    `,
                isDragging &&
                !disabled &&
                `
                    border-violet-500
                    bg-violet-50
                    shadow-sm
                    dark:border-violet-400
                    dark:bg-violet-950/30
                `,
                !isDragging &&
                !disabled &&
                `
                    border-border
                    bg-transparent
                    hover:border-violet-300
                    hover:bg-violet-50/30
                    dark:hover:border-violet-700
                    dark:hover:bg-violet-950/15
                `,
            )}
        >
            <div
                className="
        mb-3
        rounded-full
        bg-violet-50
        p-3
        dark:bg-violet-950/30
    "
            >
                <Image
                    aria-hidden="true"
                    className="
        h-6
        w-6
        text-violet-600
        dark:text-violet-400
        sm:h-7
        sm:w-7
    "
                />
            </div>

            <h3
                className="
                    text-sm
                    font-semibold
                    text-foreground
                "
            >
                Drag &amp; drop images here
            </h3>

            <p
                className="
                    mt-1
                    text-xs
                    text-muted-foreground
                "
            >
                or choose images from your device
            </p>

            <div className="mt-4">
                <ImageUploadButton
                    disabled={disabled}
                    onClick={onChooseFiles}
                />
            </div>

            <p
                className="
                    mt-3
                    max-w-md
                    px-2
                    text-center
                    text-xs
                    leading-5
                    text-muted-foreground
                "
            >
                {JOURNAL_CONFIG.form.images.helperText}
            </p>
        </div>
    );
}