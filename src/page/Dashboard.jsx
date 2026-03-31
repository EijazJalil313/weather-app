import { Bell, Search, Settings, SlidersHorizontal, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ForecastDayCard } from "@/components/dashboard/ForecastDayCard";
import { LeftRail } from "@/components/dashboard/LeftRail";
import { AqiCard } from "@/components/dashboard/AqiCard";
import { MonthlyRainfallCard } from "@/components/dashboard/MonthlyRainfallCard";
import { PrimaryWeatherCard } from "@/components/dashboard/PrimaryWeatherCard";
import { SidebarCityCard } from "@/components/dashboard/SidebarCityCard";
import { SunriseSunsetCard } from "@/components/dashboard/SunriseSunsetCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useClock } from "@/hooks/useClock";
import {
    fetchDashboard,
    setQuery,
    setSelectedForecastIndex,
} from "@/redux/slices/weatherSlice";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { time, longDate } = useClock();

    const {
        query,
        selectedForecastIndex,
        current,
        forecast,
        aqi,
        sun,
        rainfall,
        otherCurrents,
        status,
        error,
    } = useSelector((s) => s.weather);

    const [searchText, setSearchText] = useState(query || "");

    useEffect(() => {
        const next = String(searchText || "").trim();
        const currentQuery = String(query || "").trim();
        if (!next || next.length < 2) return;
        if (next.toLowerCase() === currentQuery.toLowerCase()) return;

        const t = setTimeout(() => {
            dispatch(setQuery(next));
        }, 700);

        return () => clearTimeout(t);
    }, [dispatch, query, searchText]);

    useEffect(() => {
        dispatch(fetchDashboard(query));
    }, [dispatch, query]);

    const cityName = useMemo(() => {
        return current?.cityName || query || "—";
    }, [current?.cityName, query]);

    const greeting = useMemo(() => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 18) return "Good afternoon";
        return "Good evening";
    }, []);

    const rightCards = otherCurrents || [];

    const selectedDay = useMemo(() => {
        const days = forecast?.days || [];
        return days[selectedForecastIndex] || null;
    }, [forecast?.days, selectedForecastIndex]);

    return (
        <div className="min-h-dvh bg-weather-mainBg">
            <div className="pointer-events-none fixed left-3 top-[168px] z-30 hidden lg:block xl:left-4">
                <div className="pointer-events-auto">
                    <LeftRail />
                </div>
            </div>

            <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-6 min-[600px]:grid-cols-[1fr_340px] min-[600px]:items-start md:grid-cols-[1fr_360px] lg:grid-cols-[1fr_380px] lg:pl-28">

                <main className="space-y-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="text-3xl font-semibold tracking-tight text-weather-textPrimary sm:text-4xl">
                                {time}
                            </div>
                            <div className="mt-1 text-xs text-weather-textTertiary">
                                {longDate}
                            </div>
                            <div className="mt-3 text-base font-semibold text-weather-textPrimary sm:mt-4 sm:text-lg">
                                <span className="inline-flex items-center gap-2">
                                    <Sun className="h-5 w-5 text-weather-textPrimary" aria-hidden="true" />
                                    {greeting}, Asif!
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="secondary" size="icon" aria-label="Theme" className="rounded-full">
                                <Sun className="h-5 w-5 text-weather-textPrimary" aria-hidden="true" />
                            </Button>
                            <Button variant="secondary" size="icon" aria-label="Settings" className="rounded-full">
                                <Settings className="h-5 w-5 text-weather-textPrimary" aria-hidden="true" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-1 sm:gap-4">
                        {(forecast?.days || []).map((d, idx) => (
                            <ForecastDayCard
                                key={`${d.dow}-${idx}`}
                                day={d}
                                selected={idx === selectedForecastIndex}
                                onClick={() => dispatch(setSelectedForecastIndex(idx))}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr]">
                        <AqiCard aqi={aqi} cityName={cityName} />
                        <SunriseSunsetCard cityName={cityName} sun={sun} />
                    </div>

                    <MonthlyRainfallCard rainfall={rainfall} />

                    {status === "failed" ? (
                        <div className="rounded-2xl bg-white px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    ) : null}
                </main>

                <aside className="flex flex-col gap-4 sm:gap-5">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <form
                            className="relative min-w-[220px] flex-1"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const next = String(searchText || "").trim();
                                if (!next) return;
                                dispatch(setQuery(next));
                            }}
                        >
                            <Search
                                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-weather-textTertiary"
                                aria-hidden="true"
                            />
                            <button
                                type="button"
                                aria-label="Filters"
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-weather-textTertiary hover:bg-black/5"
                            >
                                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                            </button>
                            <Input
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onBlur={() => {
                                    const next = String(searchText || "").trim();
                                    if (!next) return;
                                    dispatch(setQuery(next));
                                }}
                                placeholder="Search city (e.g., Karachi,PK)"
                                className="h-10 rounded-full pl-11 pr-12"
                                aria-label="Search"
                            />
                        </form>
                        <Button variant="secondary" size="icon" aria-label="Notifications" className="rounded-full">
                            <Bell className="h-5 w-5 text-weather-textPrimary" />
                        </Button>
                        <Avatar size="lg">
                            <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                    </div>

                    <PrimaryWeatherCard
                        cityName={cityName}
                        dateLabel={longDate.split(",").slice(1).join(",").trim() || longDate}
                        current={current}
                        selectedDay={selectedDay}
                    />

                    <div className="grid grid-cols-1 gap-4">
                        <SidebarCityCard
                            variant="secondary"
                            cityName={rightCards?.[0]?.cityName || "Tokyo"}
                            tempC={rightCards?.[0]?.tempC}
                            windKph={rightCards?.[0]?.windKph}
                            humidity={rightCards?.[0]?.humidity}
                            onClick={() => {
                                const city = rightCards?.[0]?.cityName;
                                if (city) {
                                    setSearchText(city);
                                    dispatch(setQuery(city));
                                }
                            }}
                        />
                        <SidebarCityCard
                            variant="tertiary"
                            cityName={rightCards?.[1]?.cityName || "NY"}
                            tempC={rightCards?.[1]?.tempC}
                            windKph={rightCards?.[1]?.windKph}
                            humidity={rightCards?.[1]?.humidity}
                            onClick={() => {
                                const city = rightCards?.[1]?.cityName;
                                if (city) {
                                    setSearchText(city);
                                    dispatch(setQuery(city));
                                }
                            }}
                        />
                    </div>
                </aside>
            </div>

            {status === "loading" ? (
                <div className="mx-auto max-w-[1280px] px-4 pb-8 text-xs text-weather-textTertiary sm:px-6">
                    Loading dashboard…
                </div>
            ) : null}
        </div>
    );
}
