import { getOpenWeatherApiKey } from "@/config/openWeather";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

function requireApiKey() {
    const key = getOpenWeatherApiKey();
    if (!key) {
        throw new Error(
            "Missing OpenWeather API key. Set VITE_OWM_API_KEY in a .env file (see .env.example)."
        );
    }
    return key;
}

async function fetchJson(url) {
    const res = await fetch(url);
    const data = await res.json().catch(() => null);
    if (!res.ok) {
        const msg = data?.message ? String(data.message) : `${res.status} ${res.statusText}`;
        throw new Error(msg);
    }
    return data;
}

function formatUnixTime(unixSeconds) {
    if (!unixSeconds) return "—";
    const d = new Date(unixSeconds * 1000);
    return d.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
    });
}

function toKph(ms) {
    if (ms == null) return null;
    return Math.round(ms * 3.6);
}

function mapCondition(main, icon) {
    const isNight = typeof icon === "string" && icon.endsWith("n");

    switch (main) {
        case "Clear":
            return isNight ? "Night Cloudy" : "Sunny";
        case "Clouds":
            return isNight ? "Night Cloudy" : "Partly Cloudy";
        case "Rain":
            return isNight ? "Night Rain" : "Rain";
        case "Drizzle":
            return "Drizzle";
        case "Thunderstorm":
            return "Storm";
        case "Snow":
            return "Cloudy";
        default:
            return isNight ? "Night Cloudy" : "Cloudy";
    }
}

function dowFromDate(date) {
    return date.toLocaleDateString(undefined, { weekday: "short" });
}

function groupForecastDays(list) {
    const byDate = new Map();
    for (const item of list || []) {
        const dt = new Date((item.dt || 0) * 1000);
        if (Number.isNaN(dt.getTime())) continue;
        const key = dt.toISOString().slice(0, 10);
        const arr = byDate.get(key) || [];
        arr.push({ dt, item });
        byDate.set(key, arr);
    }

    const keys = Array.from(byDate.keys()).sort();
    const days = [];

    for (const key of keys) {
        const arr = byDate.get(key);
        if (!arr || arr.length === 0) continue;

        // Pick the entry closest to 12:00 local time
        const targetMinutes = 12 * 60;
        let best = arr[0];
        let bestDelta = Infinity;
        let maxTemp = -Infinity;

        for (const x of arr) {
            const minutes = x.dt.getHours() * 60 + x.dt.getMinutes();
            const delta = Math.abs(minutes - targetMinutes);
            if (delta < bestDelta) {
                bestDelta = delta;
                best = x;
            }
            const t = x.item?.main?.temp_max;
            if (typeof t === "number" && t > maxTemp) maxTemp = t;
        }

        const item = best.item;
        const conditionMain = item?.weather?.[0]?.main;
        const conditionIcon = item?.weather?.[0]?.icon;

        const tempC = Number.isFinite(maxTemp)
            ? Math.round(maxTemp)
            : Math.round(item?.main?.temp ?? 0);

        days.push({
            dow: dowFromDate(best.dt),
            tempC,
            condition: mapCondition(conditionMain, conditionIcon),
        });
    }

    // Prefer showing today + next days (limit 6 like the UI)
    return days.slice(0, 6);
}

function aqiStatus(aqi) {
    switch (aqi) {
        case 1:
            return "Good";
        case 2:
            return "Fair";
        case 3:
            return "Moderate";
        case 4:
            return "Poor";
        case 5:
            return "Very Poor";
        default:
            return "—";
    }
}

function aqiNote(aqi) {
    if (aqi === 1) return "A perfect day for a walk!";
    if (aqi === 2) return "Nice conditions for most activities.";
    if (aqi === 3) return "Sensitive groups should take care.";
    if (aqi === 4) return "Limit prolonged outdoor activity.";
    if (aqi === 5) return "Avoid outdoor activity if possible.";
    return "";
}

export async function getCurrentByQuery(query) {
    const apiKey = requireApiKey();
    const params = new URLSearchParams({
        q: query,
        units: "metric",
        appid: apiKey,
    });

    const data = await fetchJson(`${BASE_URL}/weather?${params.toString()}`);

    const main = data?.main || {};
    const wind = data?.wind || {};
    const weather0 = data?.weather?.[0] || {};

    return {
        cityName: data?.name || query,
        country: data?.sys?.country || "",
        tempC: Math.round(main.temp ?? 0),
        condition: mapCondition(weather0.main, weather0.icon),
        windKph: toKph(wind.speed),
        humidity: main.humidity ?? null,
        coord: data?.coord ? { lat: data.coord.lat, lon: data.coord.lon } : null,
        sun: {
            sunrise: formatUnixTime(data?.sys?.sunrise),
            sunset: formatUnixTime(data?.sys?.sunset),
        },
    };
}

export async function getForecastByQuery(query) {
    const apiKey = requireApiKey();
    const params = new URLSearchParams({
        q: query,
        units: "metric",
        appid: apiKey,
    });

    const data = await fetchJson(`${BASE_URL}/forecast?${params.toString()}`);
    return {
        cityName: data?.city?.name || query,
        days: groupForecastDays(data?.list || []),
    };
}

export async function getAqiByCoords(lat, lon) {
    const apiKey = requireApiKey();
    const params = new URLSearchParams({
        lat: String(lat),
        lon: String(lon),
        appid: apiKey,
    });

    const data = await fetchJson(`${BASE_URL}/air_pollution?${params.toString()}`);
    const first = data?.list?.[0];
    const aqi = first?.main?.aqi;
    const c = first?.components || {};

    return {
        status: aqiStatus(aqi),
        note: aqiNote(aqi),
        metrics: {
            pm2_5: c.pm2_5,
            pm10: c.pm10,
            so2: c.so2,
            no2: c.no2,
            o3: c.o3,
            co: c.co,
        },
    };
}

export function getDefaultRainfall() {
    return {
        months: [
            { month: "Jan", rain: 60, sun: 28 },
            { month: "Feb", rain: 52, sun: 26 },
            { month: "Mar", rain: 66, sun: 30 },
            { month: "Apr", rain: 74, sun: 34 },
            { month: "May", rain: 80, sun: 32 },
            { month: "Jun", rain: 88, sun: 25 },
            { month: "Jul", rain: 92, sun: 22 },
            { month: "Aug", rain: 90, sun: 24 },
            { month: "Sep", rain: 84, sun: 28 },
            { month: "Oct", rain: 76, sun: 30 },
            { month: "Nov", rain: 68, sun: 26 },
            { month: "Dec", rain: 62, sun: 24 }
        ]
    };
}
