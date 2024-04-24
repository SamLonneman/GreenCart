import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const distance = targetDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval);
                // Handle expiry here, perhaps setting a state to indicate the countdown is complete
            } else {
                setTimeLeft({
                    days: days < 10 ? `0${days}` : days,
                    hours: hours < 10 ? `0${hours}` : hours,
                    minutes: minutes < 10 ? `0${minutes}` : minutes,
                    seconds: seconds < 10 ? `0${seconds}` : seconds,
                });
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [targetDate]);

    return (
        <div className="flex gap-5">
            <div>
                <span className="countdown font-mono text-4xl">
                    <span style={{ "--value": timeLeft.days }}></span>
                </span>
                days
            </div>
            <div>
                <span className="countdown font-mono text-4xl">
                    <span style={{ "--value": timeLeft.hours }}></span>
                </span>
                hours
            </div>
            <div>
                <span className="countdown font-mono text-4xl">
                    <span style={{ "--value": timeLeft.minutes }}></span>
                </span>
                min
            </div>
            <div>
                <span className="countdown font-mono text-4xl">
                    <span style={{ "--value": timeLeft.seconds }}></span>
                </span>
                sec
            </div>
        </div>
    );
};

export default CountdownTimer;