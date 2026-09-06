import type { LucideIcon } from "lucide-react";
import {
    BookOpen,
    CalendarDays,
    Heart,
    Leaf,
    Smile,
    SquarePen,
    Target,
    TrendingUp,
} from "lucide-react";

import quoteIllustration from "@/assets/quote-card-illustration.png";

export interface WhyJournalingItem {
    title: string;
    description: string;
    icon: LucideIcon;
    iconContainerClassName: string;
    iconClassName: string;
}

export interface GettingStartedStep {
    step: number;
    title: string;
    description: string;
    icon: LucideIcon;
    iconContainerClassName: string;
    iconClassName: string;
}

const iconStyles = {
    orange: {
        iconContainerClassName:
            "bg-orange-100 dark:bg-orange-500/15",
        iconClassName: "text-orange-500",
    },

    green: {
        iconContainerClassName:
            "bg-green-100 dark:bg-green-900/20",
        iconClassName:
            "text-green-600 dark:text-green-400",
    },

    violet: {
        iconContainerClassName:
            "bg-violet-100 dark:bg-violet-900/20",
        iconClassName:
            "text-violet-600 dark:text-violet-400",
    },

    amber: {
        iconContainerClassName:
            "bg-amber-100 dark:bg-amber-900/20",
        iconClassName:
            "text-amber-600 dark:text-amber-400",
    },

    blue: {
        iconContainerClassName:
            "bg-blue-100 dark:bg-blue-900/20",
        iconClassName:
            "text-blue-600 dark:text-blue-400",
    },
};

export const firstTimeDashboardConfig = {
    hero: {
        title: "Welcome to JournalFlow",

        subtitle:
            "Your journey of self-reflection and personal growth starts here.",

        description:
            "Start writing, stay consistent, and watch your thoughts transform.",

        buttonText: "Create Your First Journal",

        footerText:
            "It only takes a minute to write your first journal entry.",
    },

    emptyState: {
        title: "You don't have any journals yet",

        description: {
            line1: "Every great journey begins with a single step.",
            line2: "Write your first journal entry and begin your story.",
        },
    
        buttonText: "Create Journal",

        buttonLink: "/journals/new",

        icon: BookOpen,
    },

    whyJournaling: {
        title: "Why Journaling?",

        items: [
            {
                title: "Gain Clarity",
                description:
                    "Writing helps you organize thoughts and understand yourself better.",
                icon: Leaf,
                ...iconStyles.green,
            },

            {
                title: "Reduce Stress",
                description:
                    "Expressing your thoughts can reduce anxiety and improve well-being.",
                icon: Heart,
                ...iconStyles.violet,
            },

            {
                title: "Track Growth",
                description:
                    "Look back and see how far you've come on your personal journey.",
                icon: TrendingUp,
                ...iconStyles.amber,
            },

            {
                title: "Build Better Habits",
                description:
                    "Consistency in journaling leads to a more mindful and intentional life.",
                icon: Target,
                ...iconStyles.blue,
            },
        ] satisfies WhyJournalingItem[],
    },

    quote: {
        quote:
            "The best time to start journaling was yesterday. The second best time is now.",

        author: "Ansh",

        illustration: quoteIllustration,
    },

    gettingStarted: {
        title: "Getting Started",

        steps: [
            {
                step: 1,
                title: "Write",
                description: "Write your thoughts freely.",
                icon: SquarePen,
                ...iconStyles.orange,
            },

            {
                step: 2,
                title: "Reflect",
                description: "Reflect on your day and feelings.",
                icon: Smile,
                ...iconStyles.orange,
            },

            {
                step: 3,
                title: "Favorite",
                description: "Keep your favorites close.",
                icon: Heart,
                ...iconStyles.orange,
            },

            {
                step: 4,
                title: "Build Habit",
                description: "Make journaling a daily habit.",
                icon: CalendarDays,
                ...iconStyles.orange,
            },
        ] satisfies GettingStartedStep[],
    },
} as const;