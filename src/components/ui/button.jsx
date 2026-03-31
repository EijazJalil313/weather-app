import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-weather-primaryCard text-weather-textOnPrimary",
                secondary: "bg-weather-card text-weather-textPrimary",
                ghost: "bg-transparent text-weather-textPrimary hover:bg-black/5",
            },
            size: {
                default: "h-10 px-4",
                icon: "h-10 w-10 p-0",
                sm: "h-8 px-3 text-xs",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(function Button(
    { className, variant, size, ...props },
    ref
) {
    return (
        <button
            ref={ref}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
});

export { Button };
