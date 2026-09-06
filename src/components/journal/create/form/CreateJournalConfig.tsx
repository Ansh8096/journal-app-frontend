
import type { LucideIcon } from "lucide-react";

import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    List,
    ListOrdered,
    Quote,
    Link2,
} from "lucide-react";

export interface EditorToolbarButtonAction {
    type: "button";

    id:
        | "bold"
        | "italic"
        | "underline"
        | "strike"
        | "bulletList"
        | "link"
        | "orderedList"
        | "blockquote"
        | "alignLeft"
        | "alignCenter"
        | "alignRight"
        | "alignJustify";

    label: string;

    icon: LucideIcon;

    shortcut?: string;
}

export interface EditorToolbarSelectAction {
    type: "select";

    id: "paragraph" | "alignment";

    label: string;
}

export type EditorToolbarAction =
    | EditorToolbarButtonAction
    | EditorToolbarSelectAction;

export type EditorToolbarGroup =
    readonly EditorToolbarAction[];

export const createJournalConfig = {
    // Page
    pageTitle: "Create Journal...",
    pageDescription:
        "Write your thoughts, reflect on your day, and capture moments that matter.",

    // Title
    title: {
        label: "Title",
        placeholder: "Give your journal a title...",
        maxLength: 100,
    },

    // Editor
    editor: {
        label: "Journal",

        placeholder:
            "Start writing your thoughts here...",

        minHeight: "400px",

        toolbar: [
                [
                    {
                        type: "select",
                        id: "paragraph",
                        label: "Paragraph",
                    },
                
                    {
                        type: "select",
                        id: "alignment",
                        label: "Alignment",
                    },
                ],
        
            [
                {
                    type: "button",
                    id: "bold",
                    label: "Bold",
                    icon: Bold,
                    shortcut: "Ctrl+B",
                },
            
                {
                    type: "button",
                    id: "italic",
                    label: "Italic",
                    icon: Italic,
                    shortcut: "Ctrl+I",
                },
            
                {
                    type: "button",
                    id: "underline",
                    label: "Underline",
                    icon: Underline,
                    shortcut: "Ctrl+U",
                },
            
                {
                    type: "button",
                    id: "strike",
                    label: "Strikethrough",
                    icon: Strikethrough,
                    shortcut: "Ctrl+Shift+S",
                },

                {
                    type: "button",
                    id: "link",
                    label: "Insert Link",
                    icon: Link2,
                },

                
            ],
            
            [
                {
                    type: "button",
                    id: "bulletList",
                    label: "Bullet List",
                    icon: List,
                },
            
                {
                    type: "button",
                    id: "orderedList",
                    label: "Numbered List",
                    icon: ListOrdered,
                },
            ],
        
            [
                {
                    type: "button",
                    id: "blockquote",
                    label: "Quote",
                    icon: Quote,
                },
            ],
        ] as readonly EditorToolbarGroup[],
    },

    // Image Upload
    images: {
        title: "Images",
        description:
            "Drag & drop your images here, or click to browse.",
        buttonText: "Choose Images",
        maxFiles: 10,
        maxFileSizeMB: 5,
        acceptedTypes: [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ],
    },

    // Actions
    actions: {
        deleteDraft: "Delete Draft",
        saveDraft: "Save Draft",
        publish: "Publish Journal",
    },

    // Journal Details Card
    details: {
        title: "Journal Details",
        moodLabel: "Mood",
        dateLabel: "Date",
        timeLabel: "Time",
        tagsLabel: "Tags",
    },

    // Weather Card
    weather: {
        title: "Weather",
        loading: "Fetching weather...",
        unavailable: "Weather unavailable",
    },

    // Writing Tip
    writingTip: {
        title: "Writing Tip",
        description:
            "Don't worry about perfect grammar. Focus on expressing your thoughts honestly.",
    },
} as const;


export const JOURNAL_EDITOR_CONTENT_CLASS = `
    prose
    prose-neutral
    dark:prose-invert
    max-w-none

    min-h-full

    [&_.ProseMirror]:min-h-[400px]
    [&_.ProseMirror]:outline-none
    [&_.ProseMirror]:scroll-smooth

    [&_.ProseMirror]:caret-violet-600
    dark:[&_.ProseMirror]:caret-violet-400

    [&_.ProseMirror]:px-4
    [&_.ProseMirror]:py-4
    sm:[&_.ProseMirror]:px-6
    sm:[&_.ProseMirror]:py-5

    [&_.ProseMirror]:text-base
    [&_.ProseMirror]:leading-8
    [&_.ProseMirror]:text-foreground

    [&_.ProseMirror]:selection:bg-violet-200
    dark:[&_.ProseMirror]:selection:bg-violet-800/60
    [&_.ProseMirror]:selection:text-foreground

    [&_.ProseMirror:focus]:outline-none

    [&_.ProseMirror_p]:my-4
    [&_.ProseMirror_p:first-child]:mt-0
    [&_.ProseMirror_p:last-child]:mb-0

    [&_.ProseMirror_strong]:font-semibold
    [&_.ProseMirror_em]:italic
    [&_.ProseMirror_u]:underline
    [&_.ProseMirror_s]:line-through

    [&_.ProseMirror_h1]:mt-8
    [&_.ProseMirror_h1]:mb-5
    [&_.ProseMirror_h1]:text-3xl
    [&_.ProseMirror_h1]:font-bold

    [&_.ProseMirror_h2]:mt-7
    [&_.ProseMirror_h2]:mb-4
    [&_.ProseMirror_h2]:text-2xl
    [&_.ProseMirror_h2]:font-semibold

    [&_.ProseMirror_h3]:mt-6
    [&_.ProseMirror_h3]:mb-3
    [&_.ProseMirror_h3]:text-xl
    [&_.ProseMirror_h3]:font-semibold

    [&_.ProseMirror_ul]:my-4
    [&_.ProseMirror_ul]:list-disc
    [&_.ProseMirror_ul]:pl-6

    [&_.ProseMirror_ol]:my-4
    [&_.ProseMirror_ol]:list-decimal
    [&_.ProseMirror_ol]:pl-6

    [&_.ProseMirror_li]:my-1

    [&_.ProseMirror_a]:text-primary
    [&_.ProseMirror_a]:underline
    [&_.ProseMirror_a]:underline-offset-4
    [&_.ProseMirror_a]:transition-colors
    [&_.ProseMirror_a:hover]:opacity-80

    [&_.ProseMirror_blockquote]:my-5
    [&_.ProseMirror_blockquote]:border-l-4
    [&_.ProseMirror_blockquote]:border-violet-300
    [&_.ProseMirror_blockquote]:bg-violet-50
    [&_.ProseMirror_blockquote]:text-slate-700
    [&_.ProseMirror_blockquote]:pl-4
    [&_.ProseMirror_blockquote]:italic

    dark:[&_.ProseMirror_blockquote]:border-violet-600
    dark:[&_.ProseMirror_blockquote]:bg-violet-950/30
    dark:[&_.ProseMirror_blockquote]:text-slate-200

    [&_.ProseMirror_hr]:my-8

    [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
    [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
    [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
    [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground
    [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
`;