import StatsCard from "../../common/StatsCard";

import { buildJournalStats } from "@/utils/journals/journal-utils";

import type { JournalStatisticsResponse } from "@/types/api/journal";

interface JournalStatsProps {
    statistics: JournalStatisticsResponse;
}

export default function JournalStats({
    statistics,
}: JournalStatsProps) {
    const stats =
        buildJournalStats(statistics);

    return (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <StatsCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    subtitle={stat.subtitle}
                    icon={stat.icon}
                    iconClassName={stat.iconClassName}
                />
            ))}
        </section>
    );
}