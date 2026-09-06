/**
 * Formats an ISO date string into a short, human-friendly relative label
 * (e.g. "12 min ago", "yesterday", "3 days ago").
 *
 * Falls back to a plain localized date once the gap is large enough that
 * a relative label stops being useful, and falls back to the original
 * string if it can't be parsed as a date.
 */
export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    const diffMs = Date.now() - date.getTime();
    const diffSeconds = Math.round(diffMs / 1000);

    if (diffSeconds < 60) {
        return "just now";
    }

    const diffMinutes = Math.round(diffSeconds / 60);

    if (diffMinutes < 60) {
        return `${diffMinutes} min${diffMinutes === 1 ? "" : "s"} ago`;
    }

    const diffHours = Math.round(diffMinutes / 60);

    if (diffHours < 24) {
        return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    }

    const diffDays = Math.round(diffHours / 24);

    if (diffDays === 1) {
        return "yesterday";
    }

    if (diffDays < 7) {
        return `${diffDays} days ago`;
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}