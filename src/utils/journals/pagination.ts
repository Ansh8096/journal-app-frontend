export interface VisiblePagesOptions {
    currentPage: number;
    totalPages: number;
    pageWindow: number;
}

export interface PaginationCounterOptions {
    currentPage: number;
    pageSize: number;
    totalElements: number;
}

export function getVisiblePages({
    currentPage,
    totalPages,
    pageWindow,
}: VisiblePagesOptions): number[] {
    if (totalPages <= 0) {
        return [];
    }

    if (totalPages <= pageWindow) {
        return Array.from(
            { length: totalPages },
            (_, index) => index,
        );
    }

    let startPage = Math.max(
        0,
        currentPage - Math.floor(pageWindow / 2),
    );

    let endPage = startPage + pageWindow - 1;

    if (endPage >= totalPages) {
        endPage = totalPages - 1;

        startPage = Math.max(
            0,
            endPage - pageWindow + 1,
        );
    }

    return Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index,
    );
}

export function getPaginationCounter({
    currentPage,
    pageSize,
    totalElements,
}: PaginationCounterOptions) {
    if (totalElements === 0) {
        return {
            start: 0,
            end: 0,
        };
    }

    const start = currentPage * pageSize + 1;

    const end = Math.min(
        (currentPage + 1) * pageSize,
        totalElements,
    );

    return {
        start,
        end,
    };
}