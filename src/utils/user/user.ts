export function getUserInitials(username?: string | null): string {
    if (!username) return "";

    const parts = username
        .trim()
        .split(/[\s._-]+/)
        .filter(Boolean);

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }

    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();
}