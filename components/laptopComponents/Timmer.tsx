"use client"

import { useEffect, useState } from "react"

interface TimeCount {
    minutes: string,
    seconds: string
}

// const getTimeLeft = () => {
//     // const expiry = Date.now()
//     let minutes = "0"
//     let seconds = "0"

//     const difference = new Date().setMinutes(new Date().getMinutes() + 10) - new Date().getTime()

//     if (difference <= 0) {
//         return {
//             minutes,
//             seconds
//         }
//     }

//     minutes = Math.floor((difference / (1000 * 60)) % 60).toString()
//     seconds = Math.floor((difference / 1000) % 60).toString()

//     return {
//         minutes,
//         seconds
//     }

// }

const Timmer = () => {
    const [timeLeft, setTimeLeft] = useState<number>(15 * 60); 

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
        <div className="flex items-center justify-center gap-3">
            <div className=" text-red-600 ">
                Time Left <b>{formatTime(timeLeft)}</b>
                <p>Do not refresh or go back rom the page</p>
            </div>
        </div>
    )
}


export default Timmer


