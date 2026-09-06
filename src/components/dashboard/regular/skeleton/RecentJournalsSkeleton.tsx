import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonRow() {
    return (
        <div
            className="
                grid
                grid-cols-[56px_1fr_120px_120px_90px_60px]
                items-center
                gap-4
                p-4
            "
        >
            {/* Mood icon */}
            <div className="flex justify-center">
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>

            {/* Title + preview */}
            <div className="min-w-0 space-y-2">
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-3 w-64 rounded" />
            </div>

            {/* Mood */}
            <Skeleton className="h-6 w-20 rounded-full" />

            {/* Date / time */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
            </div>

            {/* Image */}
            <Skeleton className="h-16 w-16 rounded-lg" />

            {/* Actions */}
            <div className="flex justify-end gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
            </div>
        </div>
    );
}

export default function RecentJournalsSkeleton() {
    return (
        <Card>
            <CardContent className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-40 rounded" />

                        <Skeleton className="h-4 w-52 rounded" />
                    </div>

                    <Skeleton className="h-8 w-20 rounded" />
                </div>

                {/* Rows */}
                <div className="divide-y rounded-lg border">
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                </div>
            </CardContent>
        </Card>
    );
}