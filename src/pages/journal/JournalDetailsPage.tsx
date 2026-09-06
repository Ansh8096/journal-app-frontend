import { useNavigate, useParams } from "react-router-dom";
import JournalContent from "@/components/journal/details/JournalContent";
import JournalHero from "@/components/journal/details/JournalHero";
import AppLayout from "@/layouts/app/AppLayout";
import JournalSidebar from "@/components/journal/details/JournalSidebar";
import JournalGallery from "@/components/journal/details/JournalGallery";
import JournalDetailsHeader from "@/components/journal/details/JournalDetailsHeader";

import {
    useDeleteJournal,
    useFavoriteJournal,
    useJournal,
    useShareJournal,
    useDownloadJournal,
    useDeleteJournalImage,
    useUpdateCoverImage,
    useUploadJournalImages
} from "@/hooks/journal";

import {
    journalDetailsConfig,
    journalErrorStateConfig,
} from "@/components/journal/details/JournalDetailsConfig";

import EmptyStateCard from "@/components/common/EmptyStateCard";
import { buildEditJournalRoute, ROUTES } from "@/constants/app/routes";
import JournalDetailsSkeleton from "@/components/journal/details/skeleton/JournalDetailsSkeleton";
import JournalDetailsError from "@/components/journal/details/JournalDetailsError";
import type { JournalResponse } from "@/types/api/journal";
import { downloadFile } from "@/utils/media/downloadFile";
import { toast } from "sonner";
import { useRef, useState } from "react";
import DeleteJournalDialog from "@/components/journal/details/dialog/DeleteJournalDialog";
import ChangeCoverDialog from "@/components/journal/details/dialog/ChangeCoverDialog";
import GalleryDialog from "@/components/journal/details/dialog/GalleryDialog";
import ImageLightbox from "@/components/journal/details/dialog/ImageLightbox";
import { validateImages } from "@/lib/validation/ImageValidation";
import { getErrorMessage } from "@/lib/error";
import DeleteImageDialog from "@/components/journal/details/dialog/DeleteImageDialog";

export default function JournalDetailsPage() {
    const { journalId } = useParams<{ journalId: string }>();
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [coverDialogOpen, setCoverDialogOpen] = useState(false);

    const { data: journal, isPending, error, refetch } = useJournal(journalId);

    const { mutate: toggleFavorite, isPending: isFavoritePending } =
        useFavoriteJournal();

    const { mutate: downloadJournal, isPending: isDownloadPending } =
        useDownloadJournal();

    const { share, isSharing } = useShareJournal();

    const { mutate: deleteJournal, isPending: isDeletePending } =
        useDeleteJournal();

    const { mutate: updateCoverImage, isPending: isUpdatingCover } =
        useUpdateCoverImage();

    const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);

    const [lightboxOpen, setLightboxOpen] = useState(false);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { mutate: uploadImages, isPending: isUploadPending } =
        useUploadJournalImages();

    const [deleteImageDialogOpen, setDeleteImageDialogOpen] = useState(false);

    const currentImage = journal?.images[currentImageIndex];

    const { mutate: deleteImage, isPending: isDeleteImagePending } =
        useDeleteJournalImage();

    if (isPending) {
        return <JournalDetailsSkeleton />;
    }

    if (error) {
        return (
            <AppLayout>
                <JournalDetailsError onRetry={refetch} />
            </AppLayout>
        );
    }

    if (!journal) {
        return (
            <AppLayout>
                <EmptyStateCard
                    title={journalErrorStateConfig.title}
                    description={journalErrorStateConfig.description}
                    actionLabel={journalErrorStateConfig.actionLabel}
                    onAction={() => navigate(ROUTES.JOURNALS)}
                    icon={journalErrorStateConfig.icon}
                />
            </AppLayout>
        );
    }

    const handleFavorite = (journal: JournalResponse) => {
        toggleFavorite({
            journalId: journal.id,

            request: {
                favorite: !journal.favorite,
            },
        });
    };

    const handleEdit = (journal: JournalResponse) => {
        navigate(buildEditJournalRoute(journal.id));
    };

    const handleExport = (journal: JournalResponse) => {
        // note: we need to put toast here, because the download behavior happens in the page...
        downloadJournal(journal.id, {
            onSuccess: (response) => {
                downloadFile({
                    blob: response.blob,
                    fileName: response.fileName,
                });

                toast.success(journalDetailsConfig.toast.exportSuccess.title, {
                    description: journalDetailsConfig.toast.exportSuccess.description,
                });
            },

            onError: () => {
                toast.error(journalDetailsConfig.toast.exportError.title, {
                    description: journalDetailsConfig.toast.exportError.description,
                });
            },
        });
    };

    const handleShare = async (journal: JournalResponse) => {
        try {
            const result = await share({
                title: journal.title,
                url: window.location.href,
            });

            // User cancelled the native share sheet.
            if (!result.success) {
                return;
            }

            // Clipboard fallback was used.
            if (result.usedClipboard) {
                toast.success(journalDetailsConfig.toast.shareCopied.title, {
                    description: journalDetailsConfig.toast.shareCopied.description,
                });
            }
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "Sharing is not supported on this browser."
            ) {
                toast.error(journalDetailsConfig.toast.shareUnsupported.title, {
                    description: journalDetailsConfig.toast.shareUnsupported.description,
                });

                return;
            }

            toast.error(journalDetailsConfig.toast.shareError.title, {
                description: journalDetailsConfig.toast.shareError.description,
            });
        }
    };

    const handleDelete = (_journal: JournalResponse) => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!journal) {
            return;
        }

        deleteJournal(
            {
                journalId: journal.id,
            },
            {
                onSuccess: () => {
                    setDeleteDialogOpen(false);

                    toast.success(journalDetailsConfig.toast.deleteSuccess.title, {
                        description: journalDetailsConfig.toast.deleteSuccess.description,
                    });

                    navigate(ROUTES.JOURNALS, {
                        replace: true,
                    });
                },

                onError: () => {
                    toast.error(journalDetailsConfig.toast.deleteError.title, {
                        description: journalDetailsConfig.toast.deleteError.description,
                    });
                },
            },
        );
    };

    const handleChangeCover = (publicId: string) => {
        if (!journal) {
            return;
        }

        updateCoverImage(
            {
                journalId: journal.id,
                publicId,
            },
            {
                onSuccess: () => {
                    setCoverDialogOpen(false);

                    toast.success(journalDetailsConfig.toast.coverUpdated.title, {
                        description: journalDetailsConfig.toast.coverUpdated.description,
                    });
                },

                onError: () => {
                    toast.error(journalDetailsConfig.toast.coverUpdateError.title, {
                        description:
                            journalDetailsConfig.toast.coverUpdateError.description,
                    });
                },
            },
        );
    };

    const handleViewAll = () => {
        setGalleryDialogOpen(true);
    };

    const handleAddImages = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);

        if (!files.length) {
            return;
        }

        const validation = validateImages(files, journal.images.length);

        if (validation.errors.length > 0) {
            validation.errors.forEach((error) => {
                toast.error(error);
            });
        }

        if (validation.validImages.length === 0) {
            event.target.value = "";

            return;
        }
        
        uploadImages(
            {
                journalId: journal.id,
                files: validation.validImages,
            },
            {
                onSuccess: () => {
                    toast.success(journalDetailsConfig.toast.uploadSuccess.title, {
                        description: journalDetailsConfig.toast.uploadSuccess.description,
                    });
                    event.target.value = "";
                },
                
                onError: (error) => {
                    toast.error(journalDetailsConfig.toast.uploadError.title, {
                        description: getErrorMessage(error),
                    });
                    event.target.value = "";
                },
            },
        );
    };

    const handleImageClick = (imageIndex: number) => {
        setGalleryDialogOpen(false);
        setCurrentImageIndex(imageIndex);
        setLightboxOpen(true);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((previous) =>
            previous === 0 ? journal.images.length - 1 : previous - 1,
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((previous) =>
            previous === journal.images.length - 1 ? 0 : previous + 1,
        );
    };

    const handleDeleteImage = () => {
        setDeleteImageDialogOpen(true);
    };

    const handleConfirmDeleteImage = () => {
        if (!journal) {
            return;
        }

        const image = journal.images[currentImageIndex];

        if (!image) {
            return;
        }

        deleteImage(
            {
                journalId: journal.id,
                publicId: image.publicId,
            },
            {
                onSuccess: () => {
                    toast.success(journalDetailsConfig.toast.imageDeleteSuccess.title, {
                        description:
                            journalDetailsConfig.toast.imageDeleteSuccess.description,
                    });

                    setDeleteImageDialogOpen(false);
                },

                onError: (error) => {
                    toast.error(journalDetailsConfig.toast.imageDeleteError.title, {
                        description: getErrorMessage(error),
                    });
                },
            },
        );
    };

    return (
        <AppLayout>
            <div className="space-y-8">
                <JournalDetailsHeader
                    journal={journal}
                    favoriteLoading={isFavoritePending}
                    exportLoading={isDownloadPending}
                    shareLoading={isSharing}
                    onToggleFavorite={handleFavorite}
                    onEdit={handleEdit}
                    onExport={handleExport}
                    onShare={handleShare}
                    onDelete={handleDelete}
                />

                <JournalHero
                    journal={journal}
                    coverLoading={isUpdatingCover}
                    onChangeCover={() => {
                        setCoverDialogOpen(true);
                    }}
                />

                <div className="grid gap-8 xl:grid-cols-12">
                    {/* Main Content */}

                    <main className="space-y-8 xl:col-span-8">
                        <JournalContent journal={journal} />

                        <JournalGallery
                            journal={journal}
                            galleryLoading={isUploadPending}
                            onViewAll={handleViewAll}
                            onAddImages={handleAddImages}
                            onImageClick={handleImageClick}
                        />
                    </main>

                    {/* Sidebar */}

                    <aside className="xl:col-span-4">
                        <JournalSidebar
                            journal={journal}
                                        
                            favoriteLoading={isFavoritePending}
                                        
                            deleteLoading={isDeletePending}
                                        
                            onEdit={() => handleEdit(journal)}
                                        
                            onToggleFavorite={() =>
                                handleFavorite(journal)
                            }
                        
                            onDelete={() => handleDelete(journal)}
                        />
                    </aside>
                </div>

                <DeleteJournalDialog
                    open={deleteDialogOpen}
                    journalTitle={journal.title}
                    loading={isDeletePending}
                    onOpenChange={setDeleteDialogOpen}
                    onConfirm={handleConfirmDelete}
                />

                <ChangeCoverDialog
                    open={coverDialogOpen}
                    images={journal.images}
                    currentCoverUrl={journal.coverImageUrl}
                    loading={isUpdatingCover}
                    onOpenChange={setCoverDialogOpen}
                    onSelect={handleChangeCover}
                />

                <GalleryDialog
                    open={galleryDialogOpen}
                    journal={journal}
                    onOpenChange={setGalleryDialogOpen}
                    onImageClick={handleImageClick}
                />

                <ImageLightbox
                    open={lightboxOpen}
                    images={journal.images}
                    currentIndex={currentImageIndex}
                    onOpenChange={setLightboxOpen}
                    onPrevious={handlePreviousImage}
                    onNext={handleNextImage}
                    deleteLoading={isDeleteImagePending}
                    onDelete={handleDeleteImage}
                />

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleFileChange}
                />

                <DeleteImageDialog
                    open={deleteImageDialogOpen}
                    loading={isDeleteImagePending}
                    imageNumber={currentImageIndex + 1}
                    isCoverImage={currentImage?.imageUrl === journal.coverImageUrl}
                    onOpenChange={setDeleteImageDialogOpen}
                    onConfirm={handleConfirmDeleteImage}
                />
            </div>
        </AppLayout>
    );
}
