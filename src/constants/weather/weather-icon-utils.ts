import type {
    WeatherCondition,
} from "@/types/api/weather";

import type {
    WeatherIconComponent,
} from "./weather-icons";

import {
    DEFAULT_WEATHER_ICON,
    WEATHER_ICON_MAP,
} from "./weather-icons";


export function getWeatherIcon(
    condition:
        | WeatherCondition
        | null
        | undefined,
): WeatherIconComponent {

    if (!condition) {
        return DEFAULT_WEATHER_ICON;
    }


    return (
        WEATHER_ICON_MAP[condition] ??
        DEFAULT_WEATHER_ICON
    );
}


const WEATHER_ICON_COLOR_MAP: Record<
    WeatherCondition,
    string
> = {
    clear:
        "text-amber-500 dark:text-amber-400",

    "partly-cloudy":
        "text-sky-500 dark:text-sky-400",

    cloudy:
        "text-slate-500 dark:text-slate-300",

    rain:
        "text-blue-500 dark:text-blue-400",

    storm:
        "text-indigo-600 dark:text-indigo-400",

    snow:
        "text-cyan-500 dark:text-cyan-300",

    fog:
        "text-slate-400 dark:text-slate-300",
};

const DEFAULT_WEATHER_ICON_COLOR =
    "text-slate-500 dark:text-slate-300";


export function getWeatherIconColor(
    condition:
        | WeatherCondition
        | null
        | undefined,
): string {

    if (!condition) {
        return DEFAULT_WEATHER_ICON_COLOR;
    }


    return (
        WEATHER_ICON_COLOR_MAP[condition] ??
        DEFAULT_WEATHER_ICON_COLOR
    );
}