import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { journalPageConfig } from "./JournalListConfig";
import { cn } from "@/lib/utils";
import { getPaginationCounter, getVisiblePages } from "@/utils/journals/pagination";

interface JournalPaginationProps {
    page: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    isFetching?: boolean;
    onPageChange: (page: number) => void;
}

export default function JournalPagination({
    page,
    totalPages,
    totalElements,
    pageSize,
    isFetching,
    onPageChange,
}: JournalPaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

const { start, end } = getPaginationCounter({
    currentPage: page,
    pageSize,
    totalElements,
});

    const pages = getVisiblePages({
        currentPage: page,
        totalPages,
        pageWindow:
            journalPageConfig.pagination.pageWindow,
    });

    return (
        <div className="relative mt-8 flex items-center justify-center">
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 !rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98]"
                    disabled={page === 0 || isFetching}
                    onClick={() => onPageChange(page - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {pages.map((pageNumber) => (
                    <Button
                        key={pageNumber}
                        variant={
                            pageNumber === page
                                ? "default"
                                : "outline"
                        }
                        size="icon"
                        disabled={isFetching}
                        className={cn(
                            "h-10 w-10 !rounded-lg transition-all duration-200",
                            pageNumber === page
                                ? "pointer-events-none"
                                : "hover:scale-[1.02] hover:shadow-sm active:scale-[0.98]",
                        )}
                        onClick={() =>
                            onPageChange(pageNumber)
                        }
                    >
                        {pageNumber + 1}
                    </Button>
                ))}

                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 !rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98]"
                    disabled={page === totalPages - 1 || isFetching}
                    onClick={() => onPageChange(page + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            {journalPageConfig.pagination.showCounter && (
                <p className="absolute right-0 text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium text-foreground">
                        {start}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-foreground">
                        {end}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-foreground">
                        {totalElements}
                    </span>{" "}
                    {journalPageConfig.pagination.itemLabel}
                </p>
            )}
        </div>
    );
}