"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { useMobile } from "../hooks/useMobile";

interface PhotoConfig {
   src: string;
   alt?: string;
}

interface PhotoItem {
   content: string;
   alt: string;
   initialRotation: number;
   finalRotation: number;
   finalPosition: { x: number; y: number };
   size: { width: number; height: number };
   throwDirection: "left" | "right" | "top";
   zIndex: number;
   startProgress: number;
   endProgress: number;
   initialPos: { x: number; y: number };
}

interface DynamicPhotosThrownProps {
   photos: PhotoConfig[];
   sectionHeight?: string; // Altura de la sección (ej: "600vh")
   title?: string;
   subtitle?: string;
   finalMessage?: {
      title: string;
      description: string;
   };
   floatingTexts?: {
      text: string;
      position: { x: number; y: number };
      delay: number;
   }[];
   backgroundImage?: string;
   animationSpeed?: number; // Factor de velocidad (0.05 por defecto)
   photoSizes?: {
      minWidth: number;
      maxWidth: number;
      minHeight: number;
      maxHeight: number;
   };
}

/* ---------- Child component : single photo ---------- */
interface PhotoThrownProps {
   item: PhotoItem;
   scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
   windowDimensions: { width: number; height: number };
}
const PhotoThrown = ({
   item,
   scrollYProgress,
   windowDimensions,
}: PhotoThrownProps) => {
   const isMobile = useMobile();

   // individual transforms per photo
   const x = useTransform(
      scrollYProgress,
      [item.startProgress, item.endProgress],
      [
         item.initialPos.x,
         (item.finalPosition.x * windowDimensions.width) / 100 -
            item.size.width / 2,
      ],
   );

   const y = useTransform(
      scrollYProgress,
      [item.startProgress, item.endProgress],
      [
         item.initialPos.y,
         (item.finalPosition.y * windowDimensions.height) / 100 -
            item.size.height / (isMobile ? 10 : 5),
      ],
   );

   const rotate = useTransform(
      scrollYProgress,
      [item.startProgress, item.endProgress],
      [item.initialRotation, item.finalRotation],
   );

   const opacity = useTransform(
      scrollYProgress,
      [item.startProgress, item.endProgress],
      [0, 1],
   );
   const scale = useTransform(
      scrollYProgress,
      [item.startProgress, item.endProgress],
      [0.3, 1],
   );

   return (
      <motion.div
         className="absolute"
         style={{ x, y, rotate, opacity, scale, zIndex: item.zIndex }}>
         <div className="relative group cursor-pointer">
            {/* Shadow */}
            <motion.div
               className="absolute inset-0 bg-black/40 rounded-lg blur-md"
               style={{
                  x: useTransform(rotate, (r) => Math.sin(r * 0.017) * 8),
                  y: useTransform(rotate, (r) => Math.cos(r * 0.017) * 8 + 6),
               }}
            />
            {/* Frame */}
            <div className="relative bg-white p-0.5 md:p-3 rounded-lg shadow-2xl border border-gray-200">
               <img
                  src={item.content || "/placeholder.svg"}
                  alt={item.alt}
                  className="object-cover rounded"
                  style={{ width: item.size.width, height: item.size.height }}
                  loading="lazy"
               />
               {/* hover highlight */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
               <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-300 rounded-lg" />
            </div>
         </div>
      </motion.div>
   );
};

/* ---------- Child component : floating text ---------- */
interface FloatingTextProps {
   cfg: {
      text: string;
      position: { x: number; y: number };
      delay: number;
   };
   scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}
const FloatingText = ({ cfg, scrollYProgress }: FloatingTextProps) => {
   const opacity = useTransform(
      scrollYProgress,
      [cfg.delay, cfg.delay + 0.1],
      [0, 0.9],
   );
   const y = useTransform(
      scrollYProgress,
      [cfg.delay, cfg.delay + 0.1],
      [-50, 0],
   );

   return (
      <motion.div
         className="absolute z-40"
         style={{
            left: `${cfg.position.x}%`,
            top: `${cfg.position.y}%`,
            opacity,
            y,
         }}>
         <div className="relative max-w-sm">
            <div className="bg-black/70 backdrop-blur-md rounded-xl p-1 md:p-4 border border-white/20 shadow-2xl">
               <p className="text-white font-marcellus text-xs md:text-base leading-relaxed text-center drop-shadow-lg">
                  "{cfg.text}"
               </p>
               <div className="flex justify-center mt-3">
                  <div className="w-8 h-0.5 bg-primary/80 rounded-full" />
               </div>
            </div>
         </div>
      </motion.div>
   );
};

const DynamicPhotosThrown = ({
   photos,
   sectionHeight = "600vh",
   title = "Aventando Recuerdos a la Mesa",
   subtitle,
   finalMessage = {
      title: "Mesa Llena de Recuerdos",
      description:
         "Cada fotografía aventada con amor, cada momento capturado para la eternidad.",
   },
   floatingTexts = [
      {
         text: "Cada foto es un latido de nuestro corazón",
         position: { x: 50, y: 10 },
         delay: 0.7,
      },
      {
         text: "Momentos que se vuelven eternos",
         position: { x: 20, y: 90 },
         delay: 0.85,
      },
      {
         text: "Nuestra historia de amor en imágenes",
         position: { x: 70, y: 85 },
         delay: 0.95,
      },
   ],
   backgroundImage = "/placeholder.svg?height=800&width=1200&text=Mesa+de+Madera+Barnizada",
   animationSpeed = 0.05,
   photoSizes = {
      minWidth: 100,
      maxWidth: 210,
      minHeight: 100,
      maxHeight: 250,
   },
}: DynamicPhotosThrownProps) => {
   const isMobile = useMobile();
   const containerRef = useRef<HTMLDivElement>(null);
   const [windowDimensions, setWindowDimensions] = useState({
      width: 0,
      height: 0,
   });

   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end start"],
   });

   useEffect(() => {
      const updateDimensions = () => {
         setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
   }, []);

   // Función para generar posición inicial según dirección
   const getInitialPosition = (
      direction: "left" | "right" | "top",
      windowWidth: number,
      windowHeight: number,
   ) => {
      switch (direction) {
         case "left":
            return {
               x: -300,
               y: Math.random() * (windowHeight * 0.6) - windowHeight * 0.3,
            };
         case "right":
            return {
               x: windowWidth + 200,
               y: Math.random() * (windowHeight * 0.6) - windowHeight * 0.3,
            };
         case "top":
            return {
               x: Math.random() * (windowWidth * 0.8) - windowWidth * 0.4,
               y: -300,
            };
         default:
            return { x: -300, y: 0 };
      }
   };

   // Función para generar tamaño aleatorio
   const getRandomSize = () => {
      const isMobile = window.innerWidth < 768; // Breakpoint típico para móvil
      const photoSizes = isMobile
         ? { minWidth: 100, maxWidth: 180, minHeight: 80, maxHeight: 120 } // Tamaños para móvil (ej: en píxeles)
         : { minWidth: 150, maxWidth: 300, minHeight: 120, maxHeight: 250 }; // Tamaños para desktop

      return {
         width: Math.floor(
            Math.random() * (photoSizes.maxWidth - photoSizes.minWidth) +
               photoSizes.minWidth,
         ),
         height: Math.floor(
            Math.random() * (photoSizes.maxHeight - photoSizes.minHeight) +
               photoSizes.minHeight,
         ),
      };

      // const minWidthPercent = 40; // 20% del ancho de pantalla
      // const maxWidthPercent = 110; // 70% del ancho de pantalla
      // const minHeightPercent = 30; // 10% del alto de pantalla
      // const maxHeightPercent = 70; // 40% del alto de pantalla

      // return {
      //    width: Math.floor(
      //       Math.random() * (maxWidthPercent - minWidthPercent) +
      //          minWidthPercent,
      //    ),
      //    height: Math.floor(
      //       Math.random() * (maxHeightPercent - minHeightPercent) +
      //          minHeightPercent,
      //    ),
      //    unit: "vw", // Usamos viewport units (opcional: cambiar a 'vh' si prefieres altura)
      // };
      //     width: Math.floor(
      //        Math.random() * (photoSizes.maxWidth - photoSizes.minWidth) +
      //           photoSizes.minWidth,
      //     ),
      //     height: Math.floor(
      //        Math.random() * (photoSizes.maxHeight - photoSizes.minHeight) +
      //           photoSizes.minHeight,
      //     ),
   };

   // Función para generar posición final sin superposición excesiva
   const generateFinalPositions = (count: number) => {
      const positions: { x: number; y: number }[] = [];
      const gridCols = Math.ceil(Math.sqrt(count * 1.5)); // Más columnas para permitir superposición
      const gridRows = Math.ceil(count / gridCols);

      for (let i = 0; i < count; i++) {
         const col = i % gridCols;
         const row = Math.floor(i / gridCols);

         // Posición base en grid
         const baseX = (col / (gridCols - 1)) * 80 + 10; // 10% a 90%
         const baseY = (row / (gridRows - 1)) * 70 + 15; // 15% a 85%

         // Añadir variación aleatoria para naturalidad
         const randomOffsetX = (Math.random() - 0.5) * 15;
         const randomOffsetY = (Math.random() - 0.5) * (isMobile ? 25 : 15);

         positions.push({
            x: Math.max(5, Math.min(90, baseX + randomOffsetX)),
            y: Math.max(10, Math.min(85, baseY + randomOffsetY)),
         });
      }

      return positions;
   };

   // Generar items dinámicamente
   const items: PhotoItem[] = useMemo(() => {
      if (!photos.length || !windowDimensions.width) return [];

      const directions: ("left" | "right" | "top")[] = ["left", "right", "top"];
      const finalPositions = generateFinalPositions(photos.length);

      return photos.map((photo, index) => {
         const direction = directions[index % directions.length];
         const size = getRandomSize();
         const initialPos = getInitialPosition(
            direction,
            windowDimensions.width,
            windowDimensions.height,
         );

         // Rotaciones más variadas
         const initialRotationRange =
            direction === "top" ? [-90, 90] : [-75, 75];
         const initialRotation =
            Math.random() *
               (initialRotationRange[1] - initialRotationRange[0]) +
            initialRotationRange[0];

         const finalRotation = Math.random() * 50 - 25; // -25 a 25 grados

         return {
            content: photo.src,
            alt: photo.alt || `Foto ${index + 1}`,
            initialRotation,
            finalRotation,
            finalPosition: finalPositions[index],
            size,
            throwDirection: direction,
            zIndex: Math.floor(Math.random() * 20) + 1, // 1-20
            startProgress: index * animationSpeed,
            endProgress: index * animationSpeed + animationSpeed * 1.6, // Duración de animación
            initialPos,
         };
      });
   }, [photos, windowDimensions, animationSpeed, photoSizes]);

   // Calcular altura dinámica basada en número de fotos
   const dynamicHeight = useMemo(() => {
      if (sectionHeight !== "auto") return sectionHeight;
      const baseHeight = Math.max(400, photos.length * 25); // Mínimo 400vh, +25vh por foto
      return `${baseHeight}vh`;
   }, [photos.length, sectionHeight]);

   return (
      <div
         ref={containerRef}
         className="relative"
         style={{ height: dynamicHeight }}>
         {/* Sección fija */}
         <div className="sticky top-0 h-screen w-full overflow-hidden z-30">
            {/* Fondo fijo */}
            <div
               className="absolute inset-0 w-full h-full dark:opacity-90"
               style={{
                  backgroundImage: `url('${backgroundImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundAttachment: "fixed",
               }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Título */}
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.5 }}
               className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50">
               <h2 className="text-3xl md:text-5xl font-dashing text-white text-center drop-shadow-2xl">
                  {title}
               </h2>
               {subtitle && (
                  <p className="text-white/80 text-center mt-2 font-marcellus">
                     {subtitle}
                  </p>
               )}
               <div className="w-20 h-0.5 bg-primary mx-auto mt-3 rounded-full" />
            </motion.div>

            {/* Contador de fotos */}
            {/* <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="absolute top-20 right-8 z-50">
               <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <p className="text-white font-marcellus text-sm">
                     {photos.length} foto{photos.length !== 1 ? "s" : ""} para
                     aventar
                  </p>
               </div>
            </motion.div> */}

            {/* Fotos aventadas */}
            <div className="relative h-full w-full">
               {items.map((item, idx) => (
                  <PhotoThrown
                     key={idx}
                     item={item}
                     scrollYProgress={scrollYProgress}
                     windowDimensions={windowDimensions}
                  />
               ))}
            </div>

            {/* Textos flotantes */}
            {!isMobile && floatingTexts.length > 0 && (
               <div className="absolute inset-0 pointer-events-none">
                  {floatingTexts.map((cfg, idx) => (
                     <FloatingText
                        key={idx}
                        cfg={cfg}
                        scrollYProgress={scrollYProgress}
                     />
                  ))}
               </div>
            )}

            {/* Mensaje final */}
            <motion.div
               className="absolute inset-0 flex items-center justify-center z-50"
               style={{
                  opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]),
                  scale: useTransform(scrollYProgress, [0.9, 1], [0.8, 1]),
               }}>
               <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-8 md:p-12 max-w-2xl mx-4 border border-white/30">
                  <h3 className="text-2xl md:text-4xl font-marcellus text-white text-center mb-4 text-shadow-gray-950 shadow-2xl">
                     {finalMessage.title}
                  </h3>
                  <p className="text-white/90 text-center text-lg md:text-xl font-light leading-relaxed text-shadow-gray-950 shadow-2xl">
                     {finalMessage.description}
                  </p>
                  <div className="flex justify-center mt-6">
                     <div className="w-16 h-0.5 bg-primary rounded-full" />
                  </div>
               </div>
            </motion.div>

            {/* Indicador de scroll */}
            <motion.div
               className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
               style={{
                  opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
               }}>
               <div className="flex flex-col items-center text-white">
                  <span className="text-sm font-marcellus mb-2">
                     Desliza lentamente para aventar las fotos
                  </span>
                  <motion.div
                     animate={{ y: [0, 10, 0] }}
                     transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                     }}
                     className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                     <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
                  </motion.div>
               </div>
            </motion.div>
         </div>
      </div>
   );
};

export default DynamicPhotosThrown;
