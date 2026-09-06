import * as React from "react";

import {
    getWeatherIcon,
    getWeatherIconColor,
} from "@/constants/weather/weather-icon-utils";

import type {
    WeatherData,
} from "@/types/api/weather";

import {
    cn,
} from "@/lib/utils";

import {
    formatTemperature,
} from "@/utils/weather/weatherFormatters";

export interface WeatherDisplayProps {
    weather: Pick<
        WeatherData,
        "temperature" | "condition" | "temperatureUnit" |"description"
    >;

    className?: string;
}

export function WeatherDisplay({
    weather,
    className,
}: WeatherDisplayProps) {
    const WeatherIcon = getWeatherIcon(weather.condition);
    const iconColorClass = getWeatherIconColor(weather.condition);

    return (
        <section
            aria-label="Current weather"
            className={cn(
                "flex items-center gap-4",
                className
            )}
        >
            <WeatherIcon
                className={cn(
                    "h-14 w-14 shrink-0 transition-transform duration-300 hover:scale-105",
                    iconColorClass
                )}
                aria-hidden="true"
            />

            <div className="space-y-1">
                <p className="text-2xl font-bold tracking-tight text-foreground">
                    {formatTemperature(weather.temperature, weather.temperatureUnit)}
                </p>

                <p className="text-sm text-muted-foreground">
                    {weather.description}
                </p>
            </div>
        </section>
    );
}

export default React.memo(WeatherDisplay);