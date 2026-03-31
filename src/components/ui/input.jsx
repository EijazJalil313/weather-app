import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(function Input(
    { className, type = "text", ...props },
    ref
) {
    return (
        <input
            ref={ref}
            type={type}
            className={cn(
                "flex h-11 w-full rounded-2xl border border-border bg-weather-card px-4 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-weather-textTertiary focus-visible:ring-2 focus-visible:ring-ring",
                className
            )}
            {...props}
        />
    );
});

export { Input };
