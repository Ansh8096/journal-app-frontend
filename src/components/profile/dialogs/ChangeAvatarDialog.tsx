import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PROFILE_IMAGE } from "@/constants/app/image";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useAuth } from "@/hooks/useAuth";

import { profileConfig } from "../Config";

import { getUserInitials } from "@/utils/user/user";
import { useProfileMutations } from "@/hooks/useProfileMutations";
import LoadingSubmitButton from "@/components/common/LoadingSubmitButton";
import { getErrorMessage } from "@/lib/error";

type ChangeAvatarDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

type PreventableEvent = {
    preventDefault: () => void;
};

export function ChangeAvatarDialog({
    open,
    onOpenChange,
}: ChangeAvatarDialogProps) {
    const { user } = useAuth();
    if(!user) return null;

    const [isUploading, setIsUploading] = useState(false);
    const {uploadAvatar} = useProfileMutations();

    const [selectedFile, setSelectedFile] =
        useState<File | null>(null);

    const [previewUrl, setPreviewUrl] =
        useState<string | null>(null);

    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const initials = getUserInitials(
        user.username,
    );

    useEffect(() => {
        if (!open || !user) {
            return;
        }

        setSelectedFile(null);

        setPreviewUrl(
            user.profileImageUrl ?? null,
        );

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [open, user]);

    useEffect(() => {
        return () => {
            if (
                previewUrl &&
                previewUrl.startsWith("blob:")
            ) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!PROFILE_IMAGE.ALLOWED_TYPES.includes(file.type as (typeof PROFILE_IMAGE.ALLOWED_TYPES)[number])) {
            toast.error(
                "Please select a JPG, PNG, or WEBP image.",
            );

            event.target.value = "";

            return;
        }

        if (file.size === 0) {
            toast.error("The selected file is empty.");

            event.target.value = "";

            return;
        }

        if (file.size > PROFILE_IMAGE.MAX_SIZE) {
            toast.error(
                "Image size must be less than 5 MB.",
            );

            event.target.value = "";

            return;
        }

        if (
            previewUrl &&
            previewUrl.startsWith("blob:")
        ) {
            URL.revokeObjectURL(previewUrl);
        }

        setSelectedFile(file);

        setPreviewUrl(URL.createObjectURL(file));
    };

    const resetSelection = () => {
        setSelectedFile(null);
        
        setPreviewUrl(user?.profileImageUrl ?? null);
        
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || isUploading) {
            return;
        }

        try {
            setIsUploading(true);

            const result = await uploadAvatar(selectedFile);

            if (!result.updated) {
                onOpenChange(false);
                return;
            }

            toast.success("Profile photo updated successfully.");

            resetSelection();
            
            onOpenChange(false);

        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsUploading(false);
        }
    };

    const preventCloseWhileSubmitting = (e:PreventableEvent) =>{
        if (isUploading) {
            e.preventDefault();
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (isUploading) {
                    return;
                }
            
                onOpenChange(nextOpen);
            }}
        >
            <DialogContent 
                className="sm:max-w-md"
                onPointerDownOutside={preventCloseWhileSubmitting}
                onEscapeKeyDown={preventCloseWhileSubmitting}
            >
                <DialogHeader>
                    <DialogTitle>
                        {profileConfig.dialogs.avatar.title}
                    </DialogTitle>

                    <DialogDescription>
                        {profileConfig.dialogs.avatar.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-6 py-4">
                    <Avatar className="h-40 w-40 border shadow-md">
                        <AvatarImage
                            src={
                                previewUrl ??
                                undefined
                            }
                            alt={
                                user?.username
                            }
                        />

                        <AvatarFallback className="text-4xl font-semibold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-2 text-center">
                        <p className="text-sm font-medium">
                            {selectedFile
                                ? selectedFile.name
                                : profileConfig.placeholders.currentProfilePhoto}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            JPG • PNG • WEBP
                            <br />
                            Max size {PROFILE_IMAGE.MAX_SIZE_LABEL}
                        </p>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={PROFILE_IMAGE.ACCEPT}
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    <Button
                        type="button"
                        variant="secondary"
                        disabled={isUploading}
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                    >
                        {profileConfig.actions.chooseImage}
                    </Button>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isUploading}
                        onClick={() =>{
                            resetSelection();
                            onOpenChange(false)
                        }}
                    >
                        {profileConfig.actions.cancel}
                    </Button>

                    <LoadingSubmitButton
                        type="button"
                        loading={isUploading}
                        loadingText={profileConfig.actions.uploading}
                        disabled={!selectedFile}
                        onClick={handleUpload}
                    >
                        {profileConfig.actions.upload}
                    </LoadingSubmitButton>

                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}