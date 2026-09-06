import DOMPurify from "dompurify";
import { FileText } from "lucide-react";

import { cn } from "@/lib/utils";
import { journalDetailsConfig } from "../journal/details/JournalDetailsConfig";

interface RichTextViewerProps {
    html: string;

    className?: string;
}

function isEditorContentEmpty(
    sanitizedHtml: string,
): boolean {
    const container =
        document.createElement("div");

    container.innerHTML = sanitizedHtml;

    const text =
        container.textContent?.trim() ?? "";

    return text.length === 0;
}

export default function RichTextViewer({
    html,
    className,
}: RichTextViewerProps) {
    const sanitizedHtml =
        DOMPurify.sanitize(html, {
            USE_PROFILES: {
                html: true,
            },
        });

    const isEmpty =
        isEditorContentEmpty(sanitizedHtml);

    if (isEmpty) {
        return (
            <div
                className="
                    flex
                    min-h-[180px]
                    sm:min-h-[220px]
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-dashed
                    bg-muted/20
                    px-6
                    py-10
                    text-center
                "
            >
                <FileText
                    aria-hidden="true"
                    className="mb-4 h-12 w-12 text-muted-foreground/40"
                />

                <h3 className="text-lg font-semibold">
                    {journalDetailsConfig.emptyState.journalContent.title}
                </h3>
                        
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    {journalDetailsConfig.emptyState.journalContent.description}
                </p>
            </div>
        );
    }

    return (
        <div
            role="article"
            aria-label="Journal content"
            className={cn(
                `
                    prose
                    prose-slate
                    dark:prose-invert

                    max-w-none

                    selection:bg-primary/20
                    selection:text-foreground

                    prose-headings:scroll-mt-20
                    prose-headings:font-semibold
                    prose-headings:tracking-normal

                    prose-h1:text-3xl
                    prose-h2:text-2xl
                    prose-h3:text-xl

                    prose-p:my-5
                    prose-p:leading-7

                    prose-strong:font-semibold
                    prose-strong:text-foreground

                    prose-em:italic

                    prose-blockquote:border-l-4
                    prose-blockquote:border-primary
                    prose-blockquote:rounded-r-lg
                    prose-blockquote:bg-muted/40
                    prose-blockquote:py-2
                    prose-blockquote:pr-4
                    prose-blockquote:pl-4
                    prose-blockquote:not-italic
                    prose-blockquote:text-muted-foreground

                    prose-ul:list-disc
                    prose-ul:pl-6
                    prose-ul:space-y-2

                    prose-ol:list-decimal
                    prose-ol:pl-6
                    prose-ol:space-y-2

                    prose-li:my-1
                    prose-li:marker:text-primary

                    prose-a:text-primary
                    prose-a:font-medium
                    prose-a:no-underline
                    prose-a:break-all
                    hover:prose-a:underline

                    prose-code:rounded
                    prose-code:bg-muted
                    prose-code:px-1.5
                    prose-code:py-0.5
                    prose-code:text-sm

                    prose-pre:rounded-xl
                    prose-pre:border
                    prose-pre:bg-muted

                    prose-hr:my-8
                `,
                className,

            )}
            dangerouslySetInnerHTML={{
                __html: sanitizedHtml,
            }}
        />
    );
}