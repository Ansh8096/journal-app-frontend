
function formatRoundedValue(value: number, suffix: string): string {
    return `${Math.round(value)}${suffix}`;
}

export function formatTemperature(value: number, unit: string): string {
    return formatRoundedValue(value, " " + unit);
}

export function formatHumidity(value: number): string {
    return formatRoundedValue(value, "%");
}

export function formatWind(value: number, unit: string): string {
    return formatRoundedValue(value, " " + unit);
}