import { useState } from "react";

import {
    BookOpen,
    CalendarDays,
    Camera,
    Flame,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";

import {
    useJournalStatistics,
} from "@/hooks/journal/useJournalStatistics";

import { profileConfig } from "./Config";

import {
    getUserInitials,
} from "@/utils/user/user";

import {
    formatDate,
} from "@/utils/formatting/date";

import {
    ChangeAvatarDialog,
} from "./dialogs/Index";

export function UserAvatar() {
    const { user } = useAuth();

    const [
        avatarDialogOpen,
        setAvatarDialogOpen,
    ] = useState(false);

    const {
        data: statistics,
        isLoading:
            isStatisticsLoading,
    } = useJournalStatistics();

    if (!user) {
        return null;
    }

    const initials =
        getUserInitials(
            user.username,
        );

    return (
        <>
            <div className="h-fit border bg-card p-8 shadow-sm">
                <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <button
                        type="button"
                        aria-label="Change profile photo"
                        className="group relative"
                        onClick={() =>
                            setAvatarDialogOpen(
                                true,
                            )
                        }
                    >
                        <Avatar className="h-44 w-44 border-2 shadow-md">
                            <AvatarImage
                                src={
                                    user.profileImageUrl ??
                                    undefined
                                }
                                alt={
                                    user.username
                                }
                            />

                            <AvatarFallback className="text-5xl font-semibold">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        {/* Hover Overlay */}
                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                                justify-center
                                rounded-full
                                bg-black/50
                                opacity-0
                                transition-opacity
                                duration-200
                                group-hover:opacity-100
                                group-focus-visible:opacity-100
                            "
                        >
                            <div className="flex flex-col items-center gap-1 text-white">
                                <Camera className="h-7 w-7" />

                                <span className="text-xs font-medium">
                                    Change Photo
                                </span>
                            </div>
                        </div>
                    </button>

                    {/* Username */}
                    <h2 className="mt-5 text-3xl font-bold tracking-tight">
                        {user.username}
                    </h2>

                    {/* Email */}
                    <p className="mt-1 text-sm text-muted-foreground">
                        {user.email}
                    </p>

                    {/* Current Streak */}
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                        <Flame
                            className="
                                h-3.5
                                w-3.5
                                text-orange-500
                                dark:text-orange-400
                            "
                        />

                        <span>
                            Current streak{" "}
                            {isStatisticsLoading
                                ? "—"
                                : `${statistics?.currentStreak ?? "—"} days`}
                        </span>
                    </div>

                    {/* Total Journals */}
                    <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                        <BookOpen
                            className="
                                h-3.5
                                w-3.5
                                text-violet-600
                                dark:text-violet-400
                            "
                        />

                        <span>
                            Total journals{" "}
                            {isStatisticsLoading
                                ? "—"
                                : `${statistics?.totalJournals ?? "—"} entries`}
                        </span>
                    </div>

                    {/* Member Since */}
                    <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays
                            className="
                                h-3.5
                                w-3.5
                                text-blue-500
                                dark:text-blue-400
                            "
                        />

                        <span>
                            Member since{" "}
                            {formatDate(
                                user.createdAt,
                            )}
                        </span>
                    </div>

                    {/* Upload Button */}
                    <Button
                        variant="outline"
                        className="mt-8 w-full"
                        onClick={() =>
                            setAvatarDialogOpen(
                                true,
                            )
                        }
                    >
                        <Camera className="mr-2 h-4 w-4" />

                        {
                            profileConfig
                                .avatar
                                .uploadButton
                        }
                    </Button>
                </div>
            </div>

            <ChangeAvatarDialog
                open={
                    avatarDialogOpen
                }
                onOpenChange={
                    setAvatarDialogOpen
                }
            />
        </>
    );
}