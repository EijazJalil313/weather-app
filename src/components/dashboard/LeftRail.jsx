import { Activity, BarChart3, Calendar, LayoutGrid, MapPin, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const ITEMS = [
    { key: "grid", Icon: LayoutGrid, selected: true },
    { key: "map", Icon: MapPin },
    { key: "chart", Icon: BarChart3 },
    { key: "activity", Icon: Activity },
    { key: "calendar", Icon: Calendar },
    { key: "settings", Icon: Settings },
];

export function LeftRail() {
    return (
        <nav aria-label="Primary" className="relative w-[68px]">
            {/* Top active section */}
            <div
                className={cn(
                    "relative z-20 flex h-[76px] w-full items-center justify-center",
                    "rounded-t-[28px] rounded-bl-[28px]",
                    "bg-gradient-to-br from-weather-secondaryCard to-weather-secondaryCard/90",
                    "shadow-sm"
                )}
            >
                <LayoutGrid className="h-6 w-6 text-white" aria-hidden="true" strokeWidth={2.5} />

                {/* Scoop transition into blue rail */}
                <div className="absolute -bottom-6 right-0 h-6 w-6 bg-weather-secondaryCard/90">
                    <div className="h-full w-full rounded-tr-[24px] bg-weather-primaryCard" />
                </div>
            </div>

            {/* Blue rail section */}
            <div
                className={cn(
                    "-mt-6 flex w-full flex-col items-center",
                    "gap-8 pb-8 pt-12",
                    "rounded-b-[28px]",
                    "bg-gradient-to-b from-weather-primaryCard to-weather-primaryCard/90",
                    "shadow-sm"
                )}
            >
                {ITEMS.filter((i) => !i.selected).map((item) => {
                    const Icon = item.Icon;
                    return (
                        <button
                            key={item.key}
                            type="button"
                            className="text-white/90 transition-transform hover:text-white active:scale-90"
                            aria-label={item.key}
                        >
                            <Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}