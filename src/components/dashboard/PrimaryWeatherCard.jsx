import { Droplets, MapPin, Wind } from "lucide-react";

import { WeatherIcon } from "@/components/dashboard/WeatherIcon";

export function PrimaryWeatherCard({ cityName, dateLabel, current, selectedDay }) {
    const tempC = selectedDay?.tempC ?? current?.tempC ?? "—";
    const condition = selectedDay?.condition || current?.condition || "—";

    return (
        <div className="relative overflow-hidden rounded-[32px] bg-weather-primaryCard px-6 py-6 text-white shadow-sm sm:px-7 sm:py-7">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {cityName || "—"}
                </div>
                <div className="h-6 w-6" aria-hidden="true" />
            </div>

            <div className="mt-7 flex flex-col items-center text-center sm:mt-8">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 sm:h-20 sm:w-20">
                    <WeatherIcon condition={condition} className="h-9 w-9 text-white sm:h-10 sm:w-10" />
                </div>
                <div className="text-xs opacity-90">{dateLabel}</div>
                <div className="mt-2 text-5xl font-semibold leading-none sm:text-6xl">{tempC}°</div>
                <div className="mt-2 text-sm font-semibold opacity-95">{condition}</div>

                <div className="mt-6 flex w-full items-center justify-between text-xs opacity-95">
                    <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4" aria-hidden="true" />
                        Wind
                        <span className="ml-1 font-semibold">{current?.windKph ?? "—"} km/h</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4" aria-hidden="true" />
                        Hum
                        <span className="ml-1 font-semibold">{current?.humidity ?? "—"}%</span>
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-weather-tertiaryCard opacity-90" />
        </div>
    );
}
