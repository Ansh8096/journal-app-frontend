import WelcomeCard from "@/components/dashboard/regular/WelcomeCard";
import QuickActions from "@/components/dashboard/regular/QuickActions";
import MotivationCard from "@/components/dashboard/regular/MotivationCard";
import StatsCard from "@/components/common/StatsCard";
import { regularDashboardConfig } from "@/components/dashboard/regular/Config";
import RecentJournalsCard from "@/components/dashboard/regular/RecentJournalsCard";

import { useJournalStatistics } from "@/hooks/journal/useJournalStatistics";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import JournalStatsSkeleton from "./skeleton/JournalStatsSkeleton";
import { useWeather } from "@/hooks/weather/useWeather";
import { getWeatherIcon, getWeatherIconColor } from "@/constants/journal/journal-weather";
import { formatTemperature } from "@/utils/weatherFormatters";

export default function RegularDashboard() {
    const {
        data: statistics,
        isLoading: isStatisticsLoading,
        isError: isStatisticsError,
        refetch: refetchStatistics,
    } = useJournalStatistics();


    const {
        data: weather,
        isLoading: isWeatherLoading,
        isError: isWeatherError,
    } = useWeather();

    const renderStatistics = () => {
        /*
         * While the statistics API is loading, we keep the
         * dashboard layout intact and show four skeleton cards.
         */
        if (isStatisticsLoading) {
            return (
                <JournalStatsSkeleton />
            );
        }

        /*
         * If statistics couldn't be loaded, don't render
         * misleading placeholder values.
         */
        if (isStatisticsError) {
            return (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                        <div>
                            <h3 className="text-lg font-semibold">
                                Unable to load statistics
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                We couldn't load your journal statistics.
                                Please try again.
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => refetchStatistics()}
                        >
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            );
        }


        /*
         * Successful state
         */
        return (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {regularDashboardConfig.statistics.items.map(
                    (stat) => {
                        let value: string | number = "—";
                        let subtitle = stat.subtitle;

                        // Default values come from static configuration.
                        let icon = stat.icon;
                        let iconClassName: string = stat.iconClassName;

                        /*
                         * ----------------------------------------
                         * JOURNAL STATISTICS
                         * ----------------------------------------
                         */
                        if (
                            stat.source === "journal" &&
                            stat.key
                        ) {
                            value =
                                statistics?.[stat.key] ??
                                "—";
                        }

                        /*
                         * ----------------------------------------
                         * WEATHER STATISTICS
                         * ----------------------------------------
                         */
                        else if (
                            stat.source === "weather"
                        ) {
                            if (isWeatherLoading) {
                                value = "…";
                                subtitle = "Loading";
                            }

                            else if (
                                isWeatherError ||
                                !weather
                            ) {
                                value = "—";
                                subtitle = "Unavailable";
                            }

                            else {
                                value =
                                    formatTemperature(weather.temperature, weather.temperatureUnit);

                                subtitle =
                                    weather.city;

                                /*
                                 * Dynamic weather icon
                                 */
                                icon =
                                    getWeatherIcon(
                                        weather.condition,
                                    );

                                /*
                                 * Dynamic weather icon color
                                 */
                                iconClassName =
                                    getWeatherIconColor(
                                        weather.condition,
                                    );
                            }
                        }

                        return (
                            <StatsCard
                                key={stat.title}
                                title={stat.title}
                                value={value}
                                subtitle={subtitle}
                                icon={icon}
                                iconClassName={iconClassName}
                            />
                        );
                    },
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <WelcomeCard />

            {/* Statistics */}
            {renderStatistics()}

            {/* Recent Journals */}
            <RecentJournalsCard />

            {/* Quick Actions */}
            <QuickActions />

            {/* Motivation */}
            <MotivationCard />
        </div>
    );
}