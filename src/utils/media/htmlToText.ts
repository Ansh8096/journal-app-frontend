export function htmlToText(html: string): string {
    if (!html) {
        return "";
    }

    const parser = new DOMParser();
    const document = parser.parseFromString(html, "text/html");

    return document.body.textContent?.trim() ?? "";
}