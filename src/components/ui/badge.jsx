import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
    {
        variants: {
            variant: {
                default: "bg-weather-primaryDataBg text-weather-textPrimary",
                success: "bg-weather-primaryDataBg text-weather-textSecondary",
                subtle: "bg-black/5 text-weather-textTertiary",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

function Badge({ className, variant, ...props }) {
    return (
        <span className={cn(badgeVariants({ variant, className }))} {...props} />
    );
}

export { Badge };
