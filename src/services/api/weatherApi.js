import { apiGet } from "@/services/api/client";

function firstOrNull(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr[0];
}

export async function getCities() {
    return apiGet("/cities");
}

export async function getCurrent(cityId) {
    const data = await apiGet(`/current?cityId=${cityId}`);
    return firstOrNull(data);
}

export async function getForecast(cityId) {
    const data = await apiGet(`/forecast?cityId=${cityId}`);
    return firstOrNull(data);
}

export async function getAqi(cityId) {
    const data = await apiGet(`/aqi?cityId=${cityId}`);
    return firstOrNull(data);
}

export async function getSun(cityId) {
    const data = await apiGet(`/sun?cityId=${cityId}`);
    return firstOrNull(data);
}

export async function getRainfall(cityId) {
    const data = await apiGet(`/rainfall?cityId=${cityId}`);
    return firstOrNull(data);
}

export async function getOtherCurrents(excludeCityId, limit = 2) {
    return apiGet(`/current?cityId_ne=${excludeCityId}&_limit=${limit}`);
}
