import * as React from "react";

import { WeatherMetric } from "./WeatherMetric";

import {
    WEATHER_METRICS,
} from "@/constants/journal/journal-weather";
import type { WeatherData } from "@/types/api/weather";
import { cn } from "@/lib/utils";
import { formatHumidity, formatTemperature, formatWind } from "@/utils/weather/weatherFormatters";

export interface WeatherMetricsProps {
    weather: Pick<
        WeatherData,
        "humidity" | "windSpeed" | "feelsLike" | "windSpeedUnit" | "feelsLikeUnit"
    >;

    className?: string;
}

export function WeatherMetrics({
    weather,
    className,
}: WeatherMetricsProps) {
    return (
        <section
            aria-label="Weather details"
            className={cn(
                // Divider removed — the target shows no border above the
                // metrics row, just spacing.
                "grid grid-cols-3 gap-4",
                className
            )}
        >
            <WeatherMetric
                label={WEATHER_METRICS.humidity.label}
                value={formatHumidity(weather.humidity)}
            />

            <WeatherMetric
                label={WEATHER_METRICS.wind.label}
                value={formatWind(weather.windSpeed, weather.windSpeedUnit)}
            />

            <WeatherMetric
                label={WEATHER_METRICS.feelsLike.label}
                value={formatTemperature(weather.feelsLike, weather.feelsLikeUnit)}
            />

        </section>
    );
}

export default React.memo(WeatherMetrics);