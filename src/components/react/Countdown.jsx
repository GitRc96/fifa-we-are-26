import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date: June 11, 2026 (approximate start of the tournament)
    const targetDate = new Date('2026-06-11T00:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <div className="flex gap-3 sm:gap-6 md:gap-8 justify-center select-none">
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col items-center flex-1 max-w-[140px]">
          {/* Card Cell */}
          <div className="w-full aspect-[4/3] bg-black/65 backdrop-blur-md border border-[#3CAC3B]/30 rounded-xl shadow-[0_0_20px_rgba(60,172,59,0.15)] flex flex-col items-center justify-center mb-3 group hover:border-[#3CAC3B]/80 hover:shadow-[0_0_30px_rgba(60,172,59,0.3)] transition-all duration-500">
            <span className="text-3xl sm:text-5xl md:text-7xl font-extrabold italic tracking-tighter text-[#3CAC3B] drop-shadow-[0_0_12px_rgba(60,172,59,0.7)] transition-transform duration-500 group-hover:scale-105">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 group-hover:text-white transition-colors">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
