// CountdownTimer.tsx
import { formatNumberToStringTime } from "@/utils/timeUtil";
import { useEffect, useState } from "react";

interface CountdownTimerProps {
    endTime: number;
    children: React.ReactNode;
}

function CountdownTimer({ endTime, children }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState(endTime); // in second

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-lg font-mono text-center text-red-500">
            {children} {formatNumberToStringTime(timeLeft)}
        </div>
    );
}

export default CountdownTimer;
