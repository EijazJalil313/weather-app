import { ChevronDown, Droplets, MapPin, Wind } from "lucide-react";

import { cn } from "@/lib/utils";

export function SidebarCityCard({
    variant = "secondary",
    cityName,
    tempC,
    windKph,
    humidity,
    onClick,
}) {
    const bg =
        variant === "secondary" ? "bg-weather-secondaryCard" : "bg-weather-tertiaryCard";

    const tempLabel = tempC ?? "—";
    const windLabel = windKph ?? "—";
    const humidityLabel = humidity ?? "—";

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "w-full rounded-[28px] px-5 py-4 text-left text-white shadow-sm",
                bg
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-2 text-xs/none opacity-95">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span className="truncate">{cityName || "—"}</span>
                    <ChevronDown className="h-4 w-4 opacity-80" aria-hidden="true" />
                </div>
                <div className="text-xl font-semibold sm:text-2xl">{tempLabel}°</div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs opacity-95">
                <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4" aria-hidden="true" />
                    Wind
                    <span className="ml-1 font-semibold">{windLabel} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4" aria-hidden="true" />
                    Hum
                    <span className="ml-1 font-semibold">{humidityLabel}%</span>
                </div>
            </div>
        </button>
    );
}
