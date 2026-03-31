export function getOpenWeatherApiKey() {
	return String(import.meta.env.VITE_OWM_API_KEY || "").trim();
}

