import type {
    WeatherCondition,
} from "@/types/api/weather";


export const WEATHER_CONDITIONS = {

    CLEAR:
        "clear",

    PARTLY_CLOUDY:
        "partly-cloudy",

    CLOUDY:
        "cloudy",

    RAIN:
        "rain",

    STORM:
        "storm",

    SNOW:
        "snow",

    FOG:
        "fog",

} as const;


export const DEFAULT_WEATHER_CONDITION:
    WeatherCondition =
        WEATHER_CONDITIONS.CLOUDY;