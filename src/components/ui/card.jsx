import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }) {
    return (
        <div
            data-slot="card"
            className={cn(
                "rounded-3xl bg-weather-card text-foreground shadow-sm",
                className
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }) {
    return (
        <div
            data-slot="card-header"
            className={cn("flex items-center justify-between px-6 pt-6", className)}
            {...props}
        />
    );
}

function CardTitle({ className, ...props }) {
    return (
        <h3
            data-slot="card-title"
            className={cn("text-sm font-semibold text-weather-textPrimary", className)}
            {...props}
        />
    );
}

function CardDescription({ className, ...props }) {
    return (
        <p
            data-slot="card-description"
            className={cn("text-xs text-weather-textTertiary", className)}
            {...props}
        />
    );
}

function CardContent({ className, ...props }) {
    return (
        <div
            data-slot="card-content"
            className={cn("px-6 pb-6", className)}
            {...props}
        />
    );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
