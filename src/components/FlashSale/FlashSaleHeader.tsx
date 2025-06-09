// components/FlashSale/FlashSaleHeader.tsx
"use client";

import React, { useEffect, useState } from "react";

const getRemainingTime = (endTime: Date) => {
  const total = endTime.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  return {
    total,
    hours,
    minutes,
    seconds,
  };
};

export const FlashSaleHeader: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Thời điểm kết thúc sale (ví dụ sau 3 tiếng)
    const endTime = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);

    const interval = setInterval(() => {
      const { total, hours, minutes, seconds } = getRemainingTime(endTime);

      if (total <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-between bg-white rounded-md p-4 mb-4">
      <div className="text-xl font-bold text-red-600 flex items-center">
        <span className="mr-2">⚡FLASH SALE</span>
        <span className="text-black text-sm mr-2">Kết thúc trong</span>
        <div className="flex items-center gap-1">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded text-sm shadow-md">
           {pad(timeLeft.hours)}
         </div>
          <span className="text-black">:</span>
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded text-sm shadow-md">{pad(timeLeft.minutes)}</div>
          <span className="text-black">:</span>
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded text-sm shadow-md">{pad(timeLeft.seconds)}</div>
        </div>
      </div>
      <a href="#" className="text-blue-500 hover:underline text-sm"
      style={{fontWeight: "bolder", fontFamily: "Lato", fontSize: "20px", textDecoration: "none"}}>
        Xem tất cả &rarr;
      </a>
    </div>
  );
};
