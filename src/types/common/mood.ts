import type { LucideIcon } from "lucide-react";

export const MOODS = [
    "HAPPY",
    "SAD",
    "ANGRY",
    "ANXIOUS",
    "CALM",
    "EXCITED",
    "STRESSED",
    "GRATEFUL",
    "NEUTRAL",
] as const;

export type Mood = (typeof MOODS)[number];

export interface MoodOption {
    value: Mood;
    label: string;
    icon: LucideIcon;
    colorClass: string;
    bgClass: string;
    borderClass: string;
}
