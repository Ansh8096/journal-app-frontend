import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { regularDashboardConfig } from "../Config";

export default function JournalStatsSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {regularDashboardConfig.statistics.items.map((stat) => (
                <Card
                    key={stat.title}
                    className="h-full"
                >
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-28" />

                                <Skeleton className="h-9 w-16" />

                                <Skeleton className="h-4 w-20" />
                            </div>

                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}