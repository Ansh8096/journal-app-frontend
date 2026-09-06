import {
    ChevronLeft,
    ChevronRight,
    SquarePen,
} from "lucide-react";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    useAllDraftsForCarousel,
} from "@/hooks/journal/useAllDraftsForCarousel";

import type {
    DraftCardData,
} from "@/types/journal/draft.types";

import {
    mapJournalSummaryToDraftCard,
} from "@/utils/journals/drafts/draft.mapper";

import DraftPreviewCard from "./DraftPreviewCard";

const VISIBLE_DRAFT_COUNT = 4;
const ANIMATION_DURATION = 420;

const SECTION_TITLE = "Continue Writing";
const SECTION_DESCRIPTION = "Your recent drafts";

export default function ContinueWritingSection() {
    const {
        data: allDrafts = [],
        isLoading,
        isError,
    } = useAllDraftsForCarousel();

    const [startIndex, setStartIndex] =
        useState(0);

    const [isAnimating, setIsAnimating] =
        useState(false);

    const [
        isTransitionEnabled,
        setIsTransitionEnabled,
    ] = useState(true);

    const [translateX, setTranslateX] =
        useState(0);

    const [
        animationDirection,
        setAnimationDirection,
    ] = useState<
        "next" | "previous" | null
    >(null);

    const trackRef =
        useRef<HTMLDivElement>(null);

    const timeoutRef =
        useRef<number | null>(null);

    /*
     * Immediate animation lock.
     *
     * A ref is used instead of only React state so
     * rapid clicks cannot start multiple animations
     * before React re-renders.
     */
    const isAnimatingRef =
        useRef(false);

    /*
     * ------------------------------------------------
     * CLEANUP
     * ------------------------------------------------
     */

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(
                    timeoutRef.current,
                );
            }

            isAnimatingRef.current = false;
        };
    }, []);

    /*
     * ------------------------------------------------
     * MAP API → UI
     * ------------------------------------------------
     */

    const drafts: DraftCardData[] =
        useMemo(
            () =>
                allDrafts.map(
                    mapJournalSummaryToDraftCard,
                ),
            [allDrafts],
        );

    /*
     * ------------------------------------------------
     * CAROUSEL BOUNDARIES
     * ------------------------------------------------
     */

    const canGoPrevious =
        startIndex > 0;

    const canGoNext =
        startIndex + VISIBLE_DRAFT_COUNT <
        drafts.length;

    /*
     * ------------------------------------------------
     * CURRENT VISIBLE DRAFTS
     *
     * No modulo is used here, so the carousel
     * never wraps back to the beginning.
     * ------------------------------------------------
     */

    const visibleDrafts =
        useMemo(
            () =>
                drafts.slice(
                    startIndex,
                    startIndex +
                    VISIBLE_DRAFT_COUNT,
                ),
            [
                drafts,
                startIndex,
            ],
        );

    /*
     * ------------------------------------------------
     * NEXT DRAFT
     * ------------------------------------------------
     */

    const nextDraft =
        canGoNext
            ? drafts[
            startIndex +
            VISIBLE_DRAFT_COUNT
            ]
            : null;

    /*
     * ------------------------------------------------
     * PREVIOUS DRAFT
     * ------------------------------------------------
     */

    const previousDraft =
        canGoPrevious
            ? drafts[startIndex - 1]
            : null;

    /*
     * ------------------------------------------------
     * GET CARD SHIFT
     * ------------------------------------------------
     */

    const getCardShift = () => {
        const track =
            trackRef.current;

        if (!track) {
            return 0;
        }

        const firstCard =
            track.children[0] as
            | HTMLElement
            | undefined;

        if (!firstCard) {
            return 0;
        }

        const cardWidth =
            firstCard.getBoundingClientRect()
                .width;

        const computedStyle =
            window.getComputedStyle(track);

        const gap =
            parseFloat(
                computedStyle.columnGap ||
                computedStyle.gap ||
                "0",
            ) || 0;

        return cardWidth + gap;
    };

    /*
     * ------------------------------------------------
     * NEXT
     * ------------------------------------------------
     */

    const handleNext = () => {
        if (
            isAnimatingRef.current ||
            !canGoNext
        ) {
            return;
        }

        const shift =
            getCardShift();

        if (!shift) {
            return;
        }

        /*
         * Lock immediately.
         */
        isAnimatingRef.current = true;

        setAnimationDirection("next");
        setIsAnimating(true);
        setIsTransitionEnabled(true);

        setTranslateX(-shift);

        timeoutRef.current =
            window.setTimeout(() => {
                setIsTransitionEnabled(false);

                /*
                 * Never allow startIndex to move
                 * beyond the last valid window.
                 */
                setStartIndex((current) =>
                    Math.min(
                        current + 1,
                        Math.max(
                            drafts.length -
                            VISIBLE_DRAFT_COUNT,
                            0,
                        ),
                    ),
                );

                setTranslateX(0);

                requestAnimationFrame(() => {
                    setIsTransitionEnabled(true);
                    setAnimationDirection(null);
                    setIsAnimating(false);

                    /*
                     * Unlock after the animation
                     * has completely finished.
                     */
                    isAnimatingRef.current = false;
                });
            }, ANIMATION_DURATION);
    };

    /*
     * ------------------------------------------------
     * PREVIOUS
     * ------------------------------------------------
     */

    const handlePrevious = () => {
        if (
            isAnimatingRef.current ||
            !canGoPrevious
        ) {
            return;
        }

        const shift =
            getCardShift();

        if (!shift) {
            return;
        }

        /*
         * Lock immediately.
         */
        isAnimatingRef.current = true;

        setAnimationDirection(
            "previous",
        );

        setIsAnimating(true);

        /*
         * Disable transition temporarily so the
         * previous card can be positioned outside
         * the visible viewport.
         */
        setIsTransitionEnabled(false);

        setTranslateX(-shift);

        /*
         * Allow the browser to register the
         * starting position before animating back.
         */
        requestAnimationFrame(() => {
            setIsTransitionEnabled(true);
            setTranslateX(0);
        });

        timeoutRef.current =
            window.setTimeout(() => {
                setIsTransitionEnabled(false);

                /*
                 * Never allow startIndex below 0.
                 */
                setStartIndex((current) =>
                    Math.max(
                        current - 1,
                        0,
                    ),
                );

                setTranslateX(0);

                requestAnimationFrame(() => {
                    setIsTransitionEnabled(true);
                    setAnimationDirection(null);
                    setIsAnimating(false);

                    /*
                     * Unlock after the animation
                     * has completely finished.
                     */
                    isAnimatingRef.current = false;
                });
            }, ANIMATION_DURATION);
    };

    /*
     * ------------------------------------------------
     * LOADING
     * ------------------------------------------------
     */

    if (isLoading) {
        return (
            <Card className="space-y-3">
                <CardContent className="space-y-3 p-5">
                    <div className="flex items-start gap-3">
                        <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />

                        <div className="space-y-2">
                            <div className="h-5 w-36 animate-pulse rounded bg-muted" />

                            <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {Array.from({
                            length:
                                VISIBLE_DRAFT_COUNT,
                        }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="h-[230px] animate-pulse rounded-2xl bg-muted"
                                />
                            ),
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }

    /*
     * ------------------------------------------------
     * ERROR
     * ------------------------------------------------
     */

    if (isError) {
        return (
            <Card>
                <CardContent className="space-y-3 p-5">
                    <div className="flex items-start gap-3">
                        <SquarePen className="mt-0.5 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />

                        <div>
                            <h2 className="text-base font-semibold">
                                {SECTION_TITLE}
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                {SECTION_DESCRIPTION}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-lg border border-dashed px-6 py-10 text-center">
                        <p className="text-sm font-medium">
                            Unable to load your drafts.
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Please try again later.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    /*
     * ------------------------------------------------
     * EMPTY
     * ------------------------------------------------
     */

    if (drafts.length === 0) {
        return (
            <Card>
                <CardContent className="space-y-3 p-5">
                    <div className="flex items-start gap-3">
                        <SquarePen className="mt-0.5 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />

                        <div>
                            <h2 className="text-base font-semibold">
                                {SECTION_TITLE}
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                {SECTION_DESCRIPTION}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-lg border border-dashed px-6 py-10 text-center">
                        <p className="text-sm font-medium">
                            No drafts yet
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Start writing and your saved drafts will appear here.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    /*
     * ------------------------------------------------
     * MAIN CAROUSEL
     * ------------------------------------------------
     */

    return (
        <Card className="rounded-none">
            <CardContent className="space-y-4 pt-2">
                {/* Header */}
                <div className="flex items-start gap-3">
                    <SquarePen className="mt-0.5 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />

                    <div className="min-w-0">
                        <h2 className="text-base font-semibold">
                            {SECTION_TITLE}
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            {SECTION_DESCRIPTION}
                        </p>
                    </div>
                </div>

                {/* Carousel */}
                <div className="relative overflow-visible">
                    <div className="overflow-hidden">
                        {/*
                            items-start (row level) + self-start on each
                            card wrapper (belt-and-suspenders) stop this
                            flex row's default align-items: stretch from
                            forcing every card to match the tallest one.
                            The other half of the fix lives inside
                            DraftPreviewCard.tsx itself: its CardContent
                            no longer uses flex-1/mt-auto, so there's no
                            leftover space left for any card to expand
                            into in the first place — height is now
                            fully driven by each card's own content.
                        */}
                        <div
                            ref={trackRef}
                            className="flex items-start gap-4"
                            style={{
                                transform: `translateX(${translateX}px)`,

                                transition:
                                    isTransitionEnabled
                                        ? `transform ${ANIMATION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
                                        : "none",
                            }}
                        >
                            {/* Previous card */}
                            {animationDirection ===
                                "previous" &&
                                previousDraft && (
                                    <div
                                        className="min-w-0 self-start"
                                        style={{
                                            flex:
                                                "0 0 calc((100% - 48px) / 4)",
                                        }}
                                    >
                                        <DraftPreviewCard
                                            draft={
                                                previousDraft
                                            }
                                        />
                                    </div>
                                )}

                            {/* Current cards */}
                            {visibleDrafts.map(
                                (draft) => (
                                    <div
                                        key={
                                            draft.id
                                        }
                                        className="min-w-0 self-start"
                                        style={{
                                            flex:
                                                "0 0 calc((100% - 48px) / 4)",
                                        }}
                                    >
                                        <DraftPreviewCard
                                            draft={
                                                draft
                                            }
                                        />
                                    </div>
                                ),
                            )}

                            {/* Next card */}
                            {animationDirection ===
                                "next" &&
                                nextDraft && (
                                    <div
                                        className="min-w-0 self-start"
                                        style={{
                                            flex:
                                                "0 0 calc((100% - 48px) / 4)",
                                        }}
                                    >
                                        <DraftPreviewCard
                                            draft={
                                                nextDraft
                                            }
                                        />
                                    </div>
                                )}
                        </div>
                    </div>

                    {/* Previous button */}
                    {canGoPrevious && (
                        <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="
                                absolute
                                -left-5
                                top-1/2
                                z-20
                                h-11
                                w-11
                                -translate-y-1/2
                                rounded-full
                                bg-background
                                shadow-md
                                transition-all
                                duration-200
                                ease-out
                                hover:scale-105
                                hover:shadow-lg
                            "
                            disabled={
                                !canGoPrevious ||
                                isAnimating
                            }
                            onClick={
                                handlePrevious
                            }
                            aria-label="Show previous drafts"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                    )}

                    {/* Next button */}
                    {drafts.length >
                        VISIBLE_DRAFT_COUNT && (
                            <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                className={`
                                absolute
                                -right-5
                                top-1/2
                                z-20
                                h-11
                                w-11
                                -translate-y-1/2
                                rounded-full
                                bg-background
                                shadow-md
                                transition-all
                                duration-200
                                ease-out
                                ${canGoNext
                                        ? "hover:scale-105 hover:shadow-lg"
                                        : "cursor-not-allowed opacity-40"
                                    }
                            `}
                                disabled={
                                    !canGoNext ||
                                    isAnimating
                                }
                                onClick={
                                    handleNext
                                }
                                aria-label="Show next drafts"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        )}
                </div>
            </CardContent>
        </Card>
    );
}