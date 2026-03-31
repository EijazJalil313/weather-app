const DEFAULT_BASE_URL = "http://localhost:3001";

export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL;

export async function apiGet(path) {
    const res = await fetch(`${API_BASE_URL}${path}`);
    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
