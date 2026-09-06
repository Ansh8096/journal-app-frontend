export type WeatherCondition =
    | "clear"
    | "partly-cloudy"
    | "cloudy"
    | "rain"
    | "storm"
    | "snow"
    | "fog";

export interface WeatherData {
    city: string;
    temperature: number;
    temperatureUnit: string;
    condition: WeatherCondition;
    description: string;
    humidity: number;
    windSpeed: number;
    windSpeedUnit: string;
    feelsLike: number;
    feelsLikeUnit: string;
    icon: string;
}

export interface WeatherMetric {
    label: string;
    value: string;
}

export type WeatherStatus =
    | "idle"
    | "loading"
    | "success"
    | "error";

export interface WeatherResponse {
    city: string;
    temperature: number;
    temperatureUnit: string;
    description: string;
    humidity: number;
    windSpeed: number;
    windSpeedUnit: string;
    feelsLike: number;
    feelsLikeUnit: string;
    icon: string | null;
}    