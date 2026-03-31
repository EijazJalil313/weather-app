import { cn } from "@/lib/utils";
import { WeatherIcon } from "@/components/dashboard/WeatherIcon";

export function ForecastDayCard({ day, selected, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex w-[76px] flex-col items-center justify-between rounded-3xl px-2.5 py-3 text-left transition-colors sm:w-[84px] sm:px-3",
                selected
                    ? "bg-weather-selectedCard text-weather-textOnPrimary shadow-sm"
                    : "bg-weather-card text-weather-textPrimary"
            )}
        >
            <div className={cn("text-xs font-semibold", selected && "opacity-95")}>
                {day?.dow}
            </div>
            <WeatherIcon
                condition={day?.condition}
                className={cn(
                    "mt-3 h-6 w-6 sm:h-7 sm:w-7",
                    selected ? "text-white" : "text-weather-textPrimary"
                )}
            />
            <div className={cn("mt-3 text-xs", selected ? "opacity-90" : "text-weather-textTertiary")}>
                {day?.tempC}°
            </div>
        </button>
    );
}
