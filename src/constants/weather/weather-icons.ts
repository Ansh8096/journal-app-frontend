import type {
    ComponentType,
} from "react";

import type {
    WeatherCondition,
} from "@/types/api/weather";

import {
    CloudyWeatherIcon,
    FogWeatherIcon,
    PartlyCloudyWeatherIcon,
    RainWeatherIcon,
    SnowWeatherIcon,
    StormWeatherIcon,
    SunnyWeatherIcon,
} from "@/components/weather/icons/WeatherIcons";


export type WeatherIconComponent =
    ComponentType<
        React.SVGProps<SVGSVGElement>
    >;



/* -------------------------------------------------------------------------- */
/*                              WEATHER ICON MAP                              */
/* -------------------------------------------------------------------------- */

export const WEATHER_ICON_MAP: Record<
    WeatherCondition,
    WeatherIconComponent
> = {

    clear:
        SunnyWeatherIcon,

    "partly-cloudy":
        PartlyCloudyWeatherIcon,

    cloudy:
        CloudyWeatherIcon,

    rain:
        RainWeatherIcon,

    storm:
        StormWeatherIcon,

    snow:
        SnowWeatherIcon,

    fog:
        FogWeatherIcon,
};


export const DEFAULT_WEATHER_ICON =
    CloudyWeatherIcon;