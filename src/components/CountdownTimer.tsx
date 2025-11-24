"use client";

import React, { useState, useEffect } from "react";
import { formatDatetime } from "../utils/formats";
import { useMobile } from "../hooks/useMobile";
import { motion } from "framer-motion";

interface CountdownTimerProps {
   targetDate: Date;
   isSticky?: boolean;
}

export default function CountdownTimer({
   targetDate,
   isSticky = false,
}: CountdownTimerProps) {
   const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
   });
   const isMobile = useMobile();

   useEffect(() => {
      const calculateTimeLeft = () => {
         const difference = targetDate.getTime() - new Date().getTime();

         if (difference > 0) {
            setTimeLeft({
               days: Math.floor(difference / (1000 * 60 * 60 * 24)),
               hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
               minutes: Math.floor((difference / 1000 / 60) % 60),
               seconds: Math.floor((difference / 1000) % 60),
            });
         } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
         }
      };

      // Calcular inicialmente
      calculateTimeLeft();

      // Actualizar cada segundo
      const timer = setInterval(calculateTimeLeft, 1000);

      // Limpiar intervalo al desmontar
      return () => clearInterval(timer);
   }, [targetDate]);

   // Estilos condicionales basados en si es sticky o no
   // bg-[#f8f5f2]/90 dark:bg-slate-900/90
   const containerClasses = isSticky
      ? `bg-base-300 p-3 rounded-lg shadow-lg backdrop-blur-sm ${
           isMobile &&
           "opacity-35 active:opacity-100 hover:opacity-100 transition-opacity"
        }`
      : "";

   const titleClasses = isSticky //bg-neutral rounded-sm
      ? "font-anodina-extrabold text-xs text-center text-primary font-medium mb-1"
      : "font-anodina-bold text-2xl text-center text-primary font-medium mb-4";

   const numberClasses = isSticky
      ? "sm:text-sm md:text-2xl font-anodina-bold text-primary"
      : "text-4xl md:text-7xl font-anodina-extrabold text-primary";

   const labelClasses = isSticky
      ? "font-avenir-roman text-[10px] text-primary"
      : "font-avenir-light text-primary";

   const gridClasses = isSticky
      ? `grid ${isMobile ? "grid-rows-4" : "grid-cols-4"} gap-1 text-center`
      : "grid grid-cols-4 gap-2 text-center";

   return (
      <div className={containerClasses}>
         <h2 className={titleClasses}>FALTAN:</h2>
         <div className={gridClasses}>
            {/* <div
               className={`flex flex-col p-2 ${labelClasses}`}>
               <span
                  className={`countdown text-center auto-cols-max justify-center ${numberClasses}`}>
                  <span
                     style={{
                        "--value": timeLeft.seconds,
                     }}
                     aria-live="polite"
                     aria-label={timeLeft.days}>
                     99
                  </span>
               </span>
               Dias
            </div> */}
            <div className="flex flex-col items-center">
               <div className={numberClasses}>{timeLeft.days}</div>
               <div className={labelClasses}>Días</div>
            </div>
            <div className="flex flex-col items-center">
               <div className={numberClasses}>{timeLeft.hours}</div>
               <div className={labelClasses}>horas</div>
            </div>
            <div className="flex flex-col items-center">
               <div className={numberClasses}>{timeLeft.minutes}</div>
               <div className={labelClasses}>minutos</div>
            </div>
            <div className="flex flex-col items-center">
               <div className={numberClasses}>{timeLeft.seconds}</div>
               <div className={labelClasses}>segundos</div>
            </div>
         </div>

         {/* text-[#7D2E2E] dark:text-[#d4a5a5] */}
         {/* border-[#7D2E2E] dark:border-[#d4a5a5] */}
         {!isSticky && (
            <>
               <div className="text-center mt-8 mb-1">
                  <p className="font-avenir-roman text-primary">
                     Te esperamos para celebrar nuestro evento:
                  </p>
               </div>

               <div className="flex items-center justify-center gap-2 mb-8 text-primary">
                  <div className="text-center border-t border-b  py-2 px-4">
                     <span className="font-avenir-roman">
                        {String(
                           formatDatetime(targetDate, false, "dddd"),
                        ).toUpperCase()}
                     </span>
                  </div>
                  <span className="block text-7xl font-anodina-extrabold">
                     {String(
                        formatDatetime(targetDate, false, "DD"),
                     ).toUpperCase()}
                  </span>
                  <div className="text-center border-t border-b py-2 px-4">
                     <span className="block text-xl font-anodina-extrabold">
                        {String(
                           formatDatetime(targetDate, false, "MMMM"),
                        ).toUpperCase()}
                     </span>
                  </div>
               </div>
            </>
         )}
      </div>
   );
}
