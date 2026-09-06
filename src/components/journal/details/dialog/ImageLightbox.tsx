import * as React from "react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Trash2, X } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import type { JournalImageResponse } from "@/types/api/journal";

interface ImageLightboxProps {
    open: boolean;

    images: JournalImageResponse[];

    currentIndex: number;

    deleteLoading?: boolean;

    onOpenChange: (open: boolean) => void;

    onPrevious: () => void;

    onNext: () => void;

    onDelete?: () => void;
}

function ImageLightbox({
    open,
    images,
    currentIndex,
    deleteLoading = false,
    onOpenChange,
    onPrevious,
    onNext,
    onDelete,
}: ImageLightboxProps) {
    const image = images[currentIndex];

    // Tracks whether the current image has finished loading, so it can
    // fade in instead of popping in abruptly. Reset whenever the image
    // itself changes (navigating prev/next).
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        setImageLoaded(false);
    }, [image?.imageUrl]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            // Previously fired regardless of deleteLoading — the
            // Previous/Next/Delete *buttons* were already disabled during
            // a delete, but the keyboard shortcuts weren't, so keyboard
            // navigation could race with an in-flight delete.
            if (deleteLoading) {
                return;
            }

            switch (event.key) {
                case "ArrowLeft":
                    onPrevious();
                    break;

                case "ArrowRight":
                    onNext();
                    break;

                case "Escape":
                    onOpenChange(false);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, deleteLoading, onPrevious, onNext, onOpenChange]);

    if (!image) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="
                    max-w-6xl
                    border-0
                    bg-black/95
                    p-0
                "
            >
                {/*
                    Radix requires a DialogTitle for accessibility — this
                    dialog previously had none at all, so screen readers
                    had nothing to announce when it opened. Visually
                    hidden since the image itself is the content.
                */}
                <DialogTitle className="sr-only">
                    Image {currentIndex + 1} of {images.length}
                </DialogTitle>

                <DialogDescription className="sr-only">
                    Use the left and right arrow keys to navigate between
                    images, or Escape to close.
                </DialogDescription>

                <div
                    className="
                        relative
                        flex
                        min-h-[50vh]
                        items-center
                        justify-center
                    "
                >
                    {!imageLoaded && (
                        <Loader2
                            className="absolute h-8 w-8 animate-spin text-white/50"
                            aria-hidden="true"
                        />
                    )}

                    <img
                        key={image.imageUrl}
                        src={image.imageUrl}
                        alt={`Journal image ${currentIndex + 1}`}
                        draggable={false}
                        onLoad={() => setImageLoaded(true)}
                        className={`
                            max-h-[85vh]
                            w-auto
                            max-w-full
                            object-contain
                            transition-opacity
                            duration-300
                            ${imageLoaded ? "opacity-100" : "opacity-0"}
                        `}
                    />

                    {images.length > 1 && (
                        <span
                            className="
                                absolute
                                bottom-4
                                left-1/2
                                -translate-x-1/2
                                rounded-full
                                border
                                border-white/10
                                bg-black/50
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-white
                                backdrop-blur-md
                            "
                        >
                            {currentIndex + 1} / {images.length}
                        </span>
                    )}

                        <Button
                        size="icon"
                        variant="secondary"
                        aria-label="Previous image"
                        disabled={deleteLoading}
                        onClick={onPrevious}
                        className="
                            !shadow-none
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            border
                            border-white/10
                            bg-black/50
                            text-white
                            backdrop-blur-md
                            transition-all
                            duration-200
                            hover:scale-[1.03]
                            hover:bg-black/70
                            focus-visible:ring-2
                            focus-visible:ring-white/50
                            focus-visible:ring-offset-0
                            active:scale-95
                        "
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <Button
                        size="icon"
                        variant="secondary"
                        aria-label="Next image"
                        disabled={deleteLoading}
                        onClick={onNext}
                        className="
                            !shadow-none
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            border
                            border-white/10
                            bg-black/50
                            text-white
                            backdrop-blur-md
                            transition-all
                            duration-200
                            hover:scale-[1.03]
                            hover:bg-black/70
                            focus-visible:ring-2
                            focus-visible:ring-white/50
                            focus-visible:ring-offset-0
                            active:scale-95
                        "
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>

                    <div
                        className="
                            absolute
                            right-4
                            top-4
                            z-10
                            flex
                            items-center
                            gap-2
                        "
                    >
                        {/*
                            Switched from variant="destructive" (which
                            bakes in a solid, fully-saturated red fill via
                            the base Button component) to variant="ghost"
                            with fully custom classes — a light, translucent
                            "glass" surface tinted red, matching the same
                            visual language as the other lightbox controls
                            (blur, thin border, no heavy fill) instead of
                            standing out as a jarring solid red circle.
                            Still clearly reads as destructive via the red
                            border/icon color, just not shouting it.
                        */}
                        <Button
    size="icon"
    variant="ghost"
    aria-label="Delete image"
    disabled={deleteLoading}
    onClick={onDelete}
    className="
        size-9
        rounded-full
        border
        border-red-400/30
        bg-white/10
        text-red-400
        backdrop-blur-xl
        transition-all
        duration-200
        hover:scale-105
        hover:border-red-400/50
        hover:bg-red-500/15
        hover:text-red-300
        focus-visible:ring-2
        focus-visible:ring-red-400/50
        focus-visible:ring-offset-0
        active:scale-95
    "
>
    {deleteLoading ? (
        <Loader2
            className="
                h-4
                w-4
                animate-spin
            "
        />
    ) : (
        <Trash2
            className="
                h-4
                w-4
            "
        />
    )}
</Button>

                        {/*
                            shadow-none (forced) added — the shadow wasn't
                            coming from anything in this file (shadow-lg
                            was already removed); it's a default baked into
                            the base Button component's "secondary" variant
                            itself, so simply not adding a shadow class
                            wasn't enough to remove it.
                        */}
<Button
    size="icon"
    variant="ghost"
    aria-label="Close preview"
    onClick={() => onOpenChange(false)}
    className="
        size-9
        rounded-full
        border
        border-white/15
        bg-white/10
        text-white
        backdrop-blur-xl
        transition-all
        duration-200
        hover:scale-105
        hover:border-white/25
        hover:bg-white/20
        focus-visible:ring-2
        focus-visible:ring-white/60
        focus-visible:ring-offset-0
        active:scale-95
    "
>
    <X
        className="
            h-4
            w-4
            stroke-[2.25]
        "
    />
</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(ImageLightbox);