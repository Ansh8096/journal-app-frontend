import type {
    SVGProps,
} from "react";


export type WeatherIconProps =
    SVGProps<SVGSVGElement>;


/* -------------------------------------------------------------------------- */
/*                                  SUNNY                                     */
/* -------------------------------------------------------------------------- */

export function SunnyWeatherIcon(
    props: WeatherIconProps,
) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx="32"
                cy="32"
                r="12"
                fill="currentColor"
            />

            <path
                d="M32 5V13M32 51V59M5 32H13M51 32H59M12.9 12.9L18.6 18.6M45.4 45.4L51.1 51.1M51.1 12.9L45.4 18.6M18.6 45.4L12.9 51.1"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
            />
        </svg>
    );
}


/* -------------------------------------------------------------------------- */
/*                             PARTLY CLOUDY                                  */
/* -------------------------------------------------------------------------- */

export function PartlyCloudyWeatherIcon(
    props: WeatherIconProps,
) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx="24"
                cy="23"
                r="9"
                fill="currentColor"
            />

            <path
                d="M8 42.5C8 36.7 12.7 32 18.5 32C20.1 32 21.7 32.4 23 33.1C25.2 27.9 30.3 24.5 36.2 24.5C44.2 24.5 50.7 31 50.7 39C50.7 39.5 50.7 40 50.6 40.5H52C56.4 40.5 60 44.1 60 48.5C60 52.9 56.4 56.5 52 56.5H18C12.5 56.5 8 52 8 46.5V42.5Z"
                fill="currentColor"
            />
        </svg>
    );
}


/* -------------------------------------------------------------------------- */
/*                                  CLOUDY                                    */
/* -------------------------------------------------------------------------- */

export function CloudyWeatherIcon(
    props: WeatherIconProps,
) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M7 40C7 33.9 11.9 29 18 29C19.8 29 21.5 29.4 23 30.1C25.2 25.1 30.2 21.5 36 21.5C44.3 21.5 51 28.2 51 36.5C51 37 51 37.5 50.9 38C54.8 38.6 57.8 42 57.8 46C57.8 50.5 54.2 54 49.8 54H18C11.9 54 7 49.1 7 43V40Z"
                fill="currentColor"
            />
        </svg>
    );
}


/* -------------------------------------------------------------------------- */
/*                                   RAIN                                     */
/* -------------------------------------------------------------------------- */

export function RainWeatherIcon(
    props: WeatherIconProps,
) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8 31C8 25.2 12.7 20.5 18.5 20.5C20.1 20.5 21.7 20.9 23 21.6C25.2 16.5 30.2 13 36 13C44.3 13 51 19.7 51 28C51 28.5 51 29 50.9 29.5H52C56.4 29.5 60 33.1 60 37.5C60 41.9 56.4 45.5 52 45.5H18C12.5 45.5 8 41 8 35.5V31Z"
                fill="currentColor"
            />

            <path
                d="M19 50L16 57M31 50L28 57M43 50L40 57"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
            />
        </svg>
    );
}


/* -------------------------------------------------------------------------- */
/*                                  STORM                                     */
/* -------------------------------------------------------------------------- */

export function StormWeatherIcon(
    props: WeatherIconProps,
) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8 26C8 20.2 12.7 15.5 18.5 15.5C20.1 15.5 21.7 15.9 23 16.6C25.2 11.5 30.2 8 36 8C44.3 8 51 14.7 51 23C51 23.5 51 24 50.9 24.5H52C56.4 24.5 60 28.1 60 32.5C60 36.9 56.4 40.5 52 40.5H18C12.5 40.5 8 36 8 30.5V26Z"
                fill="currentColor"
            />

            <path
                d="M34 39L27 51H34L30 59L42 44H35L40 39H34Z"
                fill="currentColor"
            />
        </svg>
    );
}


/* -------------------------------------------------------------------------- */
/*                                   SNOW                                     */
/* -------------------------------------------------------------------------- */

export function SnowWeatherIcon(
    props: WeatherIconProps,
) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8 27C8 21.2 12.7 16.5 18.5 16.5C20.1 16.5 21.7 16.9 23 17.6C25.2 12.5 30.2 9 36 9C44.3 9 51 15.7 51 24C51 24.5 51 25 50.9 25.5H52C56.4 25.5 60 29.1 60 33.5C60 37.9 56.4 41.5 52 41.5H18C12.5 41.5 8 37 8 31.5V27Z"
                fill="currentColor"
            />

            <path
                d="M20 49V59M15 54H25M16.5 50.5L23.5 57.5M23.5 50.5L16.5 57.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            <path
                d="M38 49V59M33 54H43M34.5 50.5L41.5 57.5M41.5 50.5L34.5 57.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
        </svg>
    );
}


/* -------------------------------------------------------------------------- */
/*                                  FOG/MIST                                  */
/* -------------------------------------------------------------------------- */

export function FogWeatherIcon(
    props: WeatherIconProps,
) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10 24H54M6 33H58M10 42H54M18 51H46"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
            />
        </svg>
    );
}