import { Trash2, X } from "lucide-react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";

interface DeleteDraftDialogProps {
    open: boolean;
    draftTitle: string;
    isDeleting: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteDraftDialog({
    open,
    draftTitle,
    isDeleting,
    onCancel,
    onConfirm,
}: DeleteDraftDialogProps) {
    if (!open) {
        return null;
    }

    const dialog = (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            role="presentation"
            onMouseDown={(event) => {
                if (
                    event.target === event.currentTarget &&
                    !isDeleting
                ) {
                    onCancel();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-draft-title"
                aria-describedby="delete-draft-description"
                className="w-full max-w-md rounded-xl border bg-background p-6 shadow-2xl"
                onMouseDown={(event) => {
                    event.stopPropagation();
                }}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                            <Trash2 className="h-5 w-5 text-destructive" />
                        </div>

                        <div>
                            <h2
                                id="delete-draft-title"
                                className="text-lg font-semibold"
                            >
                                Delete Draft
                            </h2>

                            <p
                                id="delete-draft-description"
                                className="mt-1 text-sm text-muted-foreground"
                            >
                                Are you sure you want to delete this draft?
                            </p>
                        </div>
                    </div>

                    {/* Close */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        disabled={isDeleting}
                        onClick={onCancel}
                        aria-label="Close dialog"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Draft title */}
                <div className="mt-5 rounded-lg border bg-muted/40 px-4 py-3">
                    <p className="truncate text-sm font-medium">
                        {draftTitle}
                    </p>
                </div>

                {/* Warning */}
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    This action cannot be undone. The draft and its saved
                    content will be permanently deleted.
                </p>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isDeleting}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={onConfirm}
                    >
                        {isDeleting
                            ? "Deleting..."
                            : "Delete Draft"}
                    </Button>
                </div>
            </div>
        </div>
    );

    /*
     * IMPORTANT:
     *
     * Render the dialog directly under <body>.
     * This prevents transformed ancestors such as the
     * carousel track from constraining the fixed overlay.
     */
    return createPortal(
        dialog,
        document.body,
    );
}