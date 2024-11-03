"use client"

import { useEffect, useState } from "react"

interface TimeCount {
    minutes: string,
    seconds: string
}

const Timmer = () => {
    const [timeLeft, setTimeLeft] = useState<number>(10 * 60);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="">
            <div className="flex items-center justify-center gap-2 flex-col text-red-600 ">
                <p>Time Left <b>{formatTime(timeLeft)}</b></p>
                <p>Do not refresh or go back rom the page</p>
            </div>
        </div>
    )
}


export default Timmer


