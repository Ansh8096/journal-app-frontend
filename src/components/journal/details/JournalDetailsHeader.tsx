import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { journalDetailsConfig } from "./JournalDetailsConfig";

import type { JournalResponse } from "@/types/api/journal";

import JournalActionBar from "./JournalActionBar";
import { ROUTES } from "@/constants/app/routes";

interface JournalDetailsHeaderProps {
    journal: JournalResponse;
    favoriteLoading?: boolean;
    exportLoading?: boolean;
    shareLoading?: boolean;
    onBack?: () => void;
    onToggleFavorite?: (journal: JournalResponse) => void;
    onEdit?: (journal: JournalResponse) => void;
    onExport?: (journal: JournalResponse) => void;
    onShare?: (journal: JournalResponse) => void;
    onDelete?: (journal: JournalResponse) => void;
}

export default function JournalDetailsHeader({
    journal,
    favoriteLoading = false,
    exportLoading = false,
    shareLoading = false,
    onBack,
    onToggleFavorite,
    onEdit,
    onExport,
    onShare,
    onDelete,
}: JournalDetailsHeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
            return;
        }
        navigate(ROUTES.JOURNALS);
    };

    return (
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Button
                variant="ghost"
                className="w-fit"
                onClick={handleBack}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {journalDetailsConfig.navigation.back}
            </Button>

            <JournalActionBar
                journal={journal}
                favoriteLoading={favoriteLoading}
                exportLoading={exportLoading}
                shareLoading={shareLoading}
                onToggleFavorite={onToggleFavorite}
                onEdit={onEdit}
                onExport={onExport}
                onShare={onShare}
                onDelete={onDelete}
            />
        </header>
    );
}