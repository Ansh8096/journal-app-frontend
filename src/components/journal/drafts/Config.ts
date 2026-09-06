import {
    BookOpen,
    CalendarDays,
    FilePenLine,
    Lightbulb,
    ListTodo,
    Pencil,
} from "lucide-react";

export const draftPageConfig = {
    header: {
        title: "My Drafts",
        description: "Continue writing where you left off.",
    },

    continueWriting: {
        title: "Continue Writing",
        description: "Your recent drafts",
    },

    overview: {
        title: "Drafts Overview",
        statistics: [
            {
                label: "Total Drafts",
                value: 5,
                icon: FilePenLine,
            },
            {
                label: "Updated Today",
                value: 2,
                icon: CalendarDays,
            },
            {
                label: "Avg. Days Saved",
                value: 12,
                icon: BookOpen,
            },
        ],
    },

    pickUp: {
        title: "Pick up where you left off",
        description:
            "Continue writing and turn your thoughts into meaningful journals.",
    },

    writingTip: {
        title: "Writing Tip",
        description:
            "Don't worry about making it perfect. Just write. You can always refine it later.",
    },

    recentActivity: {
        title: "Recent Activity",
    },
} as const;

export const mockDrafts = [
    {
        id: "draft-1",
        title: "My Goa Trip",
        preview:
            "The waves, the sunsets, and the peaceful beach vibes...",
        updatedAt: "12 min ago",
        mood: "Happy",
        tags: ["#travel", "+2"],
        coverImageUrl: undefined,
    },
    {
        id: "draft-2",
        title: "Weekend Thoughts",
        preview:
            "Some thoughts that came to my mind this weekend...",
        updatedAt: "yesterday",
        mood: "Calm",
        tags: ["#personal"],
        coverImageUrl: undefined,
    },
    {
        id: "draft-3",
        title: "Morning Reflections",
        preview:
            "Grateful for the small things and new opportunities...",
        updatedAt: "2 days ago",
        mood: "Grateful",
        tags: [],
        coverImageUrl: undefined,
    },
    {
        id: "draft-4",
        title: "Lessons from Week",
        preview:
            "Important lessons and takeaways from this week...",
        updatedAt: "3 days ago",
        mood: "Neutral",
        tags: [],
        coverImageUrl: undefined,
    },
    {
        id: "draft-5",
        title: "New Project Ideas",
        preview:
            "Ideas for the new project I want to start working on...",
        updatedAt: "5 days ago",
        mood: "Neutral",
        tags: [],
        coverImageUrl: undefined,
    },
] as const;