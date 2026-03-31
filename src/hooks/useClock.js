import { useEffect, useMemo, useState } from "react";

function pad2(n) {
    return String(n).padStart(2, "0");
}

function formatTime(date) {
    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = pad2(date.getMinutes());
    const ampm = hours24 >= 12 ? "PM" : "AM";
    return `${pad2(hours12)}:${minutes} ${ampm}`;
}

function formatLongDate(date) {
    return date.toLocaleDateString(undefined, {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export function useClock({ tickMs = 30_000 } = {}) {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), tickMs);
        return () => clearInterval(id);
    }, [tickMs]);

    return useMemo(
        () => ({ now, time: formatTime(now), longDate: formatLongDate(now) }),
        [now]
    );
}
