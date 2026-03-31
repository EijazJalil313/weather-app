import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    getAqiByCoords as owmGetAqiByCoords,
    getCurrentByQuery as owmGetCurrentByQuery,
    getDefaultRainfall as owmGetDefaultRainfall,
    getForecastByQuery as owmGetForecastByQuery,
} from "@/services/api/openWeatherApi";

export const fetchDashboard = createAsyncThunk(
    "weather/fetchDashboard",
    async (query, { rejectWithValue }) => {
        try {
            const q = String(query || "").trim();
            if (!q) throw new Error("Please enter a city name");

           
            const current = await owmGetCurrentByQuery(q);
            const coord = current?.coord;

            const defaults = ["Tokyo,JP", "New York,NY,US"];
            const sidebarQueries = defaults
                .filter(Boolean)
                .filter((cityQuery) => cityQuery.toLowerCase() !== q.toLowerCase())
                .slice(0, 2);

            const [forecastRes, aqiRes, other0Res, other1Res] = await Promise.allSettled([
                owmGetForecastByQuery(q),
                coord ? owmGetAqiByCoords(coord.lat, coord.lon) : Promise.resolve(null),
                sidebarQueries[0]
                    ? owmGetCurrentByQuery(sidebarQueries[0])
                    : Promise.resolve(null),
                sidebarQueries[1]
                    ? owmGetCurrentByQuery(sidebarQueries[1])
                    : Promise.resolve(null),
            ]);

            const forecast =
                forecastRes.status === "fulfilled" ? forecastRes.value : null;

            const aqi = aqiRes.status === "fulfilled" ? aqiRes.value : null;

            const otherCurrents = [];
            if (other0Res.status === "fulfilled" && other0Res.value) {
                otherCurrents.push({ ...other0Res.value, cityId: sidebarQueries[0] || "city0" });
            }
            if (other1Res.status === "fulfilled" && other1Res.value) {
                otherCurrents.push({ ...other1Res.value, cityId: sidebarQueries[1] || "city1" });
            }

            return {
                query: q,
                current,
                forecast,
                aqi,
                sun: current?.sun || null,
                rainfall: owmGetDefaultRainfall(),
                otherCurrents,
            };
        } catch (err) {
            return rejectWithValue(err?.message || "Failed to load dashboard");
        }
    }
);

const initialState = {
    query: "Dhaka",
    selectedForecastIndex: 3,
    current: null,
    forecast: null,
    aqi: null,
    sun: null,
    rainfall: owmGetDefaultRainfall(),
    otherCurrents: [],
    status: "idle",
    error: null,
};

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
        setSelectedForecastIndex(state, action) {
            state.selectedForecastIndex = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.status = "loading";
                state.error = null;

                state.current = null;
                state.forecast = null;
                state.aqi = null;
                state.sun = null;
                state.otherCurrents = [];
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                const payload = action.payload;
                state.status = "succeeded";
                state.current = payload.current;
                state.forecast = payload.forecast;
                state.aqi = payload.aqi;
                state.sun = payload.sun;
                state.rainfall = payload.rainfall;
                state.otherCurrents = payload.otherCurrents;

                state.query = payload.query;

                const selected = state.selectedForecastIndex;
                const totalDays = payload.forecast?.days?.length || 0;
                if (totalDays > 0 && (selected < 0 || selected >= totalDays)) {
                    state.selectedForecastIndex = 0;
                }
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;

                // Keep UI consistent with the failed search.
                state.current = null;
                state.forecast = null;
                state.aqi = null;
                state.sun = null;
                state.otherCurrents = [];
            });
    },
});

export const { setQuery, setSelectedForecastIndex } = weatherSlice.actions;

export default weatherSlice.reducer;
