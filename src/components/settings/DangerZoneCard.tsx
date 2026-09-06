import {
    ShieldAlert,
    Trash2,
} from "lucide-react";

import { useState } from "react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import DeleteAccountDialog from "./DeleteAccountDialog";

export default function DangerZoneCard() {
    const [
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
    ] = useState(false);

    return (
        <>
            <Card
                className="
                    overflow-hidden
                    rounded-md
                    border-red-200/70
                    bg-red-50/20
                    shadow-sm
                    dark:border-red-900/50
                    dark:bg-red-950/10
                "
            >
                <CardContent className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                        <div
                            className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-red-100
                                dark:bg-red-950/40
                            "
                        >
                            <ShieldAlert
                                className="
                                    h-6
                                    w-6
                                    text-red-600
                                    dark:text-red-400
                                "
                                aria-hidden="true"
                            />
                        </div>

                        <div className="min-w-0">
                            <h2
                                className="
                                    text-xl
                                    font-semibold
                                    text-red-600
                                    dark:text-red-400
                                "
                            >
                                Danger Zone
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                Irreversible and destructive actions.
                            </p>
                        </div>
                    </div>

                    <div
                        className="
                            my-6
                            border-t
                            border-red-200/70
                            dark:border-red-900/50
                        "
                    />

                    {/* Delete Account */}
                    <div
                        className="
                            flex
                            flex-col
                            gap-6
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >
                        <div className="max-w-2xl">
                            <h3 className="text-lg font-semibold">
                                Delete Account
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Permanently delete your account and all
                                of your data. This action cannot be undone.
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="
                                h-11
                                shrink-0
                                border-red-500
                                px-5
                                font-medium
                                text-red-600
                                rounded-md
                                transition-all
                                duration-200
                                ease-out
                                hover:bg-red-50
                                hover:text-red-700
                                hover:shadow-sm
                                active:scale-[0.98]
                                focus-visible:ring-2
                                focus-visible:ring-red-500
                                focus-visible:ring-offset-2
                                dark:border-red-500
                                dark:text-red-400
                                dark:hover:bg-red-950/40
                                dark:hover:text-red-300
                                dark:focus-visible:ring-red-400
                            "
                            onClick={() =>
                                setIsDeleteDialogOpen(
                                    true,
                                )
                            }
                        >
                            <Trash2
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                            />

                            Delete Account
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <DeleteAccountDialog
                open={
                    isDeleteDialogOpen
                }
                onOpenChange={
                    setIsDeleteDialogOpen
                }
            />
        </>
    );
}