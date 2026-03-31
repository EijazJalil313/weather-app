import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LegendPill({ color, label }) {
    return (
        <div className="flex items-center gap-2 rounded-full bg-weather-card px-3 py-1 text-xs text-weather-textTertiary">
            <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: color }}
            />
            {label}
        </div>
    );
}

export function MonthlyRainfallCard({ rainfall }) {
    const data = rainfall?.months || [];

    const MAX_TOTAL = 100;

    const chartData = data.map((row) => {
        const sun = Number(row?.sun ?? 0) || 0;
        const rain = Number(row?.rain ?? 0) || 0;
        const used = Math.min(MAX_TOTAL, Math.max(0, sun + rain));
        const rest = Math.max(0, MAX_TOTAL - used);

        return {
            ...row,
            sun,
            rain,
            rest,
        };
    });

    // Use the same palette as the rest of the dashboard.
    const RAIN_COLOR = "#8db2fe";
    const SUN_COLOR = "#ffb866";

    return (
        <Card className="h-full">
            <CardHeader className="px-4 pt-4 pb-3 sm:px-5">
                <CardTitle>Monthly Rainfall</CardTitle>
                <div className="flex items-center gap-2">
                    <LegendPill color={RAIN_COLOR} label="Rain" />
                    <LegendPill color={SUN_COLOR} label="Sun" />
                </div>
            </CardHeader>
            <CardContent className="h-[120px] px-4 pb-2 sm:h-[108px] sm:px-5">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        barCategoryGap={20}
                        margin={{ top: 4, right: 0, left: 0, bottom: -6 }}
                    >
                        {/* Screenshot shows clean background (no grid) */}
                        <YAxis hide domain={[0, MAX_TOTAL]} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: "#acb4e3" }}
                            height={18}
                            tickMargin={6}
                        />
                        <Bar
                            dataKey="sun"
                            stackId="m"
                            fill={SUN_COLOR}
                            radius={[0, 0, 0, 0]}
                            barSize={6}
                        />
                        <Bar
                            dataKey="rain"
                            stackId="m"
                            fill={RAIN_COLOR}
                            radius={[0, 0, 0, 0]}
                            barSize={6}
                        />
                        <Bar
                            dataKey="rest"
                            stackId="m"
                            fill="#ffffff"
                            stroke="rgba(0,0,0,0.06)"
                            strokeWidth={1}
                            radius={[999, 999, 0, 0]}
                            barSize={6}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
