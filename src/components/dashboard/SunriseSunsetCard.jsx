import { MapPin, Sunrise, Sunset } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CityRow({ name, sunrise, sunset, variant = "primary" }) {
    const rowBg = variant === "primary" ? "bg-weather-primaryDataBg" : "bg-weather-card";
    const pinColor = variant === "primary" ? "text-weather-textTertiary" : "text-weather-textTertiary";
    const timeColor = variant === "primary" ? "text-weather-textTertiary" : "text-weather-textTertiary";

    return (
        <div className={`flex items-center justify-between gap-3 rounded-3xl ${rowBg} px-4 py-3`}>
            <div className="flex min-w-0 items-center gap-2">
                <MapPin className={`h-4 w-4 ${pinColor}`} aria-hidden="true" />
                <div className="truncate text-xs font-semibold text-weather-textPrimary">{name}</div>
            </div>
            <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex items-center gap-2">
                    <Sunrise className="h-4 w-4 text-weather-textPrimary" aria-hidden="true" />
                    <div className={`text-xs ${timeColor}`}>{sunrise}</div>
                </div>
                <div className="flex items-center gap-2">
                    <Sunset className="h-4 w-4 text-weather-textPrimary" aria-hidden="true" />
                    <div className={`text-xs ${timeColor}`}>{sunset}</div>
                </div>
            </div>
        </div>
    );
}

export function SunriseSunsetCard({ cityName, sun }) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Sunrise &amp; Sunset</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <CityRow
                    name={cityName || "—"}
                    sunrise={sun?.sunrise || "—"}
                    sunset={sun?.sunset || "—"}
                />
                <CityRow name="Tokyo" sunrise="4:47 AM" sunset="6:49 PM" variant="secondary" />
                <CityRow name="Kabul" sunrise="5:00 AM" sunset="7:00 PM" variant="secondary" />
                <CityRow name="Tirana" sunrise="5:31 AM" sunset="8:04 PM" variant="secondary" />
                <CityRow name="Algiers" sunrise="5:50 AM" sunset="7:59 PM" variant="secondary" />
            </CardContent>
        </Card>
    );
}
