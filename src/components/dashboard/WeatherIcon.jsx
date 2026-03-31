import {
    Cloud,
    CloudDrizzle,
    CloudLightning,
    CloudMoon,
    CloudMoonRain,
    CloudRain,
    CloudSun,
    Sun,
} from "lucide-react";

const ICONS = {
    Sunny: Sun,
    Clear: Sun,
    "Partly Cloudy": CloudSun,
    Cloudy: Cloud,
    Rain: CloudRain,
    Drizzle: CloudDrizzle,
    Storm: CloudLightning,
    "Night Cloudy": CloudMoon,
    "Night Rain": CloudMoonRain,
};

export function WeatherIcon({ condition, className }) {
    const Icon = ICONS[condition] || CloudSun;
    return <Icon className={className} aria-hidden="true" />;
}
