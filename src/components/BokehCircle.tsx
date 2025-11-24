"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Bubble {
   id: number;
   size: number;
   x: number;
   y: number;
   opacity: number;
   duration: number;
   delay: number;
   rotationDuration: number;
}

export default function FloatingBubbles() {
   const [bubbles, setBubbles] = useState<Bubble[]>([]);
   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

   useEffect(() => {
      const updateDimensions = () => {
         setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);

      return () => window.removeEventListener("resize", updateDimensions);
   }, []);

   useEffect(() => {
      if (dimensions.width === 0) return;

      const generateBubbles = () => {
         const newBubbles: Bubble[] = [];
         const bubbleCount = Math.floor(dimensions.width / 120); // Menos burbujas para mejor rendimiento

         for (let i = 0; i < bubbleCount; i++) {
            newBubbles.push({
               id: i,
               size: Math.random() * 100 + 60, // 60px to 160px
               x: Math.random() * dimensions.width,
               y: Math.random() * dimensions.height,
               opacity: Math.random() * 0.25 + 0.05, // 0.05 to 0.3 - más sutil
               duration: Math.random() * 30 + 30, // 30 to 60 seconds - mucho más lento
               delay: Math.random() * 10, // Delay aleatorio para evitar sincronización
               rotationDuration: Math.random() * 40 + 20, // Rotación independiente
            });
         }
         setBubbles(newBubbles);
      };

      generateBubbles();
   }, [dimensions]);

   return (
      <>
         <div className="absolute h-[105vh] w-full bg-gradient-to-br from-emerald-900 via-black to-green-900 flex items-center justify-center opacity-20 overflow-hidden -mt-10"></div>

         <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {bubbles.map((bubble) => (
               <motion.div
                  key={bubble.id}
                  className="absolute rounded-full bg-gradient-to-br from-white to-white backdrop-blur-sm border border-white"
                  style={{
                     width: bubble.size,
                     height: bubble.size,
                     opacity: bubble.opacity,
                  }}
                  initial={{
                     x: bubble.x,
                     y: bubble.y,
                     rotate: 0,
                  }}
                  animate={{
                     // Movimiento circular/elíptico más orgánico
                     x: [
                        bubble.x,
                        bubble.x + Math.sin(0) * 100,
                        bubble.x + Math.sin(Math.PI / 2) * 150,
                        bubble.x + Math.sin(Math.PI) * 100,
                        bubble.x + Math.sin((3 * Math.PI) / 2) * 150,
                        bubble.x,
                     ],
                     y: [
                        bubble.y,
                        bubble.y + Math.cos(0) * 80,
                        bubble.y + Math.cos(Math.PI / 2) * 120,
                        bubble.y + Math.cos(Math.PI) * 80,
                        bubble.y + Math.cos((3 * Math.PI) / 2) * 120,
                        bubble.y,
                     ],
                     rotate: [0, 360],
                  }}
                  transition={{
                     x: {
                        duration: bubble.duration,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: bubble.delay,
                     },
                     y: {
                        duration: bubble.duration * 0.8, // Diferente duración para Y para crear movimiento más orgánico
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: bubble.delay * 0.5,
                     },
                     rotate: {
                        duration: bubble.rotationDuration,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: bubble.delay,
                     },
                  }}
               />
            ))}

            {/* Burbujas adicionales con movimiento vertical lento */}
            {bubbles.slice(0, Math.floor(bubbles.length / 3)).map((bubble) => (
               <motion.div
                  key={`vertical-${bubble.id}`}
                  className="absolute rounded-full bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm border border-white/5"
                  style={{
                     width: bubble.size * 0.7,
                     height: bubble.size * 0.7,
                     opacity: bubble.opacity * 0.6,
                  }}
                  initial={{
                     x: bubble.x + 50,
                     y: dimensions.height + bubble.size,
                  }}
                  animate={{
                     y: -bubble.size,
                     x: [
                        bubble.x + 50,
                        bubble.x + 80,
                        bubble.x + 20,
                        bubble.x + 50,
                     ],
                  }}
                  transition={{
                     y: {
                        duration: bubble.duration * 1.5, // Movimiento vertical muy lento
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: bubble.delay * 2,
                     },
                     x: {
                        duration: bubble.duration * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: bubble.delay * 2,
                     },
                  }}
               />
            ))}
         </div>
      </>
   );
}

// import { useEffect, useMemo, useState } from "react";
// import { motion, useAnimation } from "framer-motion";

// interface BokehCircle {
//    id: number;
//    size: number;
//    initialX: number;
//    initialY: number;
//    duration: number;
//    delay: number;
//    opacity: number;
//    blur: number;
// }

// /* ---------- Bokeh Circle Component ---------- */
// interface BokehProps {
//    circle: BokehCircle;
//    bokehCount: number;
//    windowDimensions: { width: number; height: number };
// }

// const BokehCircle = ({ circle, bokehCount, windowDimensions }: BokehProps) => {
//    const controls = useAnimation();

//    useEffect(() => {
//       const animateCircle = async () => {
//          // Movimiento muy sutil y lento, como en la imagen
//          await controls.start({
//             x: [
//                circle.initialX,
//                circle.initialX + Math.random() * 60 - 30,
//                circle.initialX + Math.random() * 80 - 40,
//                circle.initialX + Math.random() * 60 - 30,
//                circle.initialX,
//             ],
//             y: [
//                circle.initialY,
//                circle.initialY + Math.random() * 40 - 20,
//                circle.initialY + Math.random() * 60 - 30,
//                circle.initialY + Math.random() * 40 - 20,
//                circle.initialY,
//             ],
//             scale: [1, 1.1, 0.9, 1.05, 1],
//             transition: {
//                duration: circle.duration,
//                repeat: Number.POSITIVE_INFINITY,
//                ease: "easeInOut",
//                delay: circle.delay,
//             },
//          });
//       };

//       animateCircle();
//    }, [controls, circle]);

//    // Generar círculos bokeh como en la imagen
//    const bokehCircles: BokehCircle[] = useMemo(() => {
//       if (!windowDimensions.width) return [];

//       return Array.from({ length: bokehCount }, (_, i) => ({
//          id: i,
//          size: Math.random() * 200 + 100, // 100-300px (círculos grandes)
//          initialX: Math.random() * (windowDimensions.width + 400) - 200, // Pueden salir del borde
//          initialY: Math.random() * (windowDimensions.height + 400) - 200,
//          duration: Math.random() * 20 + 15, // 15-35 segundos (muy lento)
//          delay: Math.random() * 8, // 0-8 segundos de delay
//          opacity: Math.random() * 0.15 + 0.05, // 0.05-0.2 opacidad (muy sutil)
//          blur: Math.random() * 3 + 1, // 1-4px blur
//       }));
//    }, [bokehCount, windowDimensions]);

//    return (
//       <div className="absolute inset-0 overflow-hidden">
//          {bokehCircles.map((circle) => (
//             <motion.div
//                className="absolute pointer-events-none"
//                animate={controls}
//                initial={{
//                   x: circle.initialX,
//                   y: circle.initialY,
//                   opacity: 0,
//                }}
//                whileInView={{
//                   opacity: circle.opacity,
//                }}
//                transition={{
//                   opacity: { duration: 3, delay: circle.delay },
//                }}
//                style={{
//                   zIndex: 1,
//                }}>
//                <div
//                   className="rounded-full"
//                   style={{
//                      width: circle.size,
//                      height: circle.size,
//                      background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))`,
//                      filter: `blur(${circle.blur}px)`,
//                      border: "1px solid rgba(255, 255, 255, 0.1)",
//                   }}
//                />
//             </motion.div>
//          ))}
//       </div>
//    );
// };
