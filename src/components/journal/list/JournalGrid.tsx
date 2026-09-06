import { buildJournalDetailsRoute } from "@/constants/app/routes";
import JournalCard from "./JournalCard";

import type { JournalSummary } from "@/types/api/journal";
import { useNavigate } from "react-router-dom";

interface JournalGridProps {
    journals: JournalSummary[];

    onToggleFavorite?: (journal: JournalSummary) => void;

    onMenuClick?: (journal: JournalSummary) => void;
}

export default function JournalGrid({
    journals,
    onToggleFavorite,
}: JournalGridProps) {
    const navigate = useNavigate();
    return (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {journals.map((journal) => (
                <JournalCard
                    key={journal.id}
                    journal={journal}
                    onView={() => navigate(buildJournalDetailsRoute(journal.id))}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </section>
    );
}



// Its only job is:

// Receive journals
//       ↓
// Render cards