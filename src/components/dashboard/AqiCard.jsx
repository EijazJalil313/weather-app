import { ChevronDown, Droplets, RefreshCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Metric({ label, value }) {
    return (
        <div className="flex flex-col items-start rounded-2xl bg-weather-primaryDataBg px-3 py-2">
            <div className="text-[10px] font-medium text-weather-textTertiary">
                {label}
            </div>
            <div className="mt-1 text-xs font-semibold text-weather-textPrimary">
                {value}
            </div>
        </div>
    );
}

export function AqiCard({ aqi, cityName }) {
    const status = aqi?.status || "—";
    const note = aqi?.note || "";
    const m = aqi?.metrics || {};

    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-weather-textPrimary" aria-hidden="true" />
                    <CardTitle>Air Quality Index</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="h-8 max-w-[140px] rounded-full px-3 text-weather-textTertiary sm:max-w-none"
                        aria-label="Location"
                    >
                        <span className="truncate">{cityName || "—"}</span>
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-full px-3">
                        <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                        Refresh
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <Badge variant={status === "Good" ? "success" : "default"}>
                            {status}
                        </Badge>
                        {note ? (
                            <div className="mt-1 text-xs text-weather-textSecondary">{note}</div>
                        ) : null}
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
                    <Metric label="PM2.5" value={m.pm2_5 ?? "—"} />
                    <Metric label="PM10" value={m.pm10 ?? "—"} />
                    <Metric label="SO₂" value={m.so2 ?? "—"} />
                    <Metric label="NO₂" value={m.no2 ?? "—"} />
                    <Metric label="O₃" value={m.o3 ?? "—"} />
                    <Metric label="CO" value={m.co ?? "—"} />
                </div>
            </CardContent>
        </Card>
    );
}
