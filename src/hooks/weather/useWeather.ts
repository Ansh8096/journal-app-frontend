import {
    useQuery,
} from "@tanstack/react-query";

import weatherService
    from "@/services/weather.service";

import {
    weatherKeys,
} from "@/lib/react-query/query-keys";

import type {
    WeatherData,
    WeatherResponse,
} from "@/types/api/weather";

import {
    toWeatherData,
} from "@/utils/weather/toWeatherData";


export function useWeather() {

    return useQuery<
        WeatherResponse,
        Error,
        WeatherData
    >({

        /**
         * --------------------------------
         * QUERY KEY
         * --------------------------------
         */
        queryKey:
            weatherKeys.current(),


        /**
         * --------------------------------
         * FETCH WEATHER
         * --------------------------------
         */
        queryFn:
            () =>
                weatherService.getWeather(),


        /**
         * --------------------------------
         * API → UI MAPPING
         * --------------------------------
         *
         * React Query stores/exposes the
         * transformed WeatherData through
         * the `data` returned by this hook.
         */
        select:
            toWeatherData,
    });
}