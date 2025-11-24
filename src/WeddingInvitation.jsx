"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   Calendar,
   MapPin,
   Gift,
   Music,
   MicOffIcon as MusicOff,
   Moon,
   Sun,
   Heart,
   Shirt,
} from "lucide-react";
import AudioPlayer from "./components/AudioPlayer";
import ThemeChanger from "./components/ThemeChanger";
import CountdownTimer from "./components/CountdownTimer";
import TimelineBoda from "./components/TimelineBoda";
import RsvpForm from "./components/RsvpForm";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Divider from "./components/Divider";
import { useMobile } from "./hooks/useMobile";
import audios from "./constants/audios";
import images from "./constants/images";
import { formatDatetime } from "./utils/formats";
import dayjs from "dayjs";
import LoveHistory from "./components/LoveHistory";
import DressCode from "./components/DressCode";

export default function WeddingInvitation() {
   // const { theme, setTheme } = useTheme();
   const [showRsvp, setShowRsvp] = useState(false);
   const isMobile = useMobile();
   const [isScrolled, setIsScrolled] = useState(false);
   const mainRef = useRef(null);

   useEffect(() => {
      const handleScroll = () => {
         const scrollPosition = window.scrollY;
         setIsScrolled(scrollPosition > 500); // Ajusta este valor según necesites
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   // Variables
   const weddingDate = new Date("2025-10-03T19:00:00");
   const weddingPlace = "Hacienda Elegancia";
   const location = "Torreón, Coahuila";
   const girlfriend = "Daniela",
      boyfriend = "Néstor";

   const formattedDate = formatDatetime(
      weddingDate,
      true,
      "dddd DD [de] MMMM [de] YYYY",
   );

   const formattedTime = formatDatetime(weddingDate, false, "HH:mm");

   // Crear enlace para Google Calendar
   const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Evento+de+${girlfriend}+y+${boyfriend}&dates=${weddingDate
      .toISOString()
      .replace(/-|:|\.\d+/g, "")
      .slice(0, 15)}00Z/${weddingDate
      .toISOString()
      .replace(/-|:|\.\d+/g, "")
      .slice(
         0,
         15,
      )}00Z&details=¡Estamos+emocionados+de+celebrar+nuestro+día+especial+contigo!&location=${weddingPlace.replace(
      " ",
      "+",
   )},+${location.replace(" ", "+")}&sf=true&output=xml`;

   // Crear enlace para Google Maps
   const googleMapsUrl = "https://maps.app.goo.gl/oX2AEVkygjnscaXo9";

   // Crear enlace para mesa de regalos
   const giftRegistryUrls = "https://www.amazon.com.mx/wedding/registry";

   return (
      <div
         ref={mainRef}
         className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500  relative overflow-hidden">
         {/* <!-- Elementos decorativos laterales --> */}
         <div class="decorative-element top-left"></div>
         <div class="decorative-element top-right"></div>
         <div class="decorative-element middle-left"></div>
         <div class="decorative-element middle-right"></div>
         <div class="decorative-element bottom-left"></div>
         <div class="decorative-element bottom-right"></div>

         {/* Botones flotantes */}
         <div className="fixed top-4 right-4 z-50 flex gap-2">
            <AudioPlayer audios={[audios.bailando, audios.todoVaAEstarBien]} />
            <ThemeChanger />
         </div>

         {/* Contador sticky */}
         <AnimatePresence>
            {isScrolled && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -100 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -100 }}
                  className="fixed top-4 left-4 z-50">
                  <CountdownTimer targetDate={weddingDate} isSticky={true} />
               </motion.div>
            )}
         </AnimatePresence>

         {/* Encabezado */}
         <motion.header
            className="relative h-screen flex flex-col items-center justify-center text-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}>
            <motion.div
               initial={{ scale: 0.7, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.5, duration: 1.5 }}
               className="absolute inset-0 overflow-hidden z-0">
               <img
                  src={images.hero}
                  alt="Fondo floral"
                  className="object-cover w-full h-full opacity-20 dark:opacity-50 "
               />
            </motion.div>

            <motion.div
               className="z-10 max-w-3xl mx-auto"
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 1, duration: 0.8 }}>
               <h1 className="font-dashing text-3xl md:text-9xl mb-4 text-rose-800 dark:text-rose-300">
                  {girlfriend} & {boyfriend}
               </h1>
               {/* <h1 className="font-mayoritte text-3xl md:text-9xl mb-4 text-rose-800 dark:text-rose-300">
                  {girlfriend} & {boyfriend}
               </h1> */}
               <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
                  className="flex justify-center my-6">
                  <Heart
                     className="text-rose-500 dark:text-rose-400 h-12 w-12 animate-pulse"
                     fill="currentColor"
                  />
               </motion.div>
               <h2 className="font-marcellus text-xl md:text-2xl mb-8 text-slate-700 dark:text-slate-300">
                  Nos casamos
               </h2>
               <p className="text-lg md:text-xl font-anodina-extrabold text-slate-800 dark:text-slate-200 mb-2">
                  {formattedDate}
               </p>
               <p className="text-lg md:text-xl font-anodina-extrabold text-slate-800 dark:text-slate-200 mb-8">
                  {formattedTime} hrs
               </p>
               <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <button
                     className="btn bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 py-6 text-lg"
                     onClick={() => setShowRsvp(true)}>
                     Confirmar Asistencia
                  </button>
               </motion.div>
            </motion.div>

            {/* Flechita */}
            <motion.div
               className="absolute bottom-8 left-0 right-0 flex justify-center"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 2, duration: 1 }}>
               <div className="animate-bounce">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="text-white">
                     <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
               </div>
            </motion.div>

            {/* <!-- Efecto de papel rasgado en la parte inferior --> */}
            <div class="torn-paper-effect"></div>
         </motion.header>

         {/* Sección de cuenta regresiva */}
         <section className="py-10 px-6 bg-bg dark:bg-slate-900 relative">
            <div className="max-w-4xl mx-auto">
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}>
                  <CountdownTimer targetDate={weddingDate} />
               </motion.div>
            </div>
         </section>

         {/* Sección de historia */}
         <section className="py-20 px-6 relative">
            <div className="max-w-4xl mx-auto">
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16">
                  <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-2 text-primary">
                     Nuestra Historia de Amor
                  </h2>
                  <motion.div
                     initial={{ opacity: 0, scale: 0, x: 50 }}
                     whileInView={{ opacity: 1, scale: 1, x: 0 }}
                     transition={{
                        delay: 0.5,
                        duration: 1,
                        type: "spring",
                     }}>
                     <Divider color="primary" />
                  </motion.div>
                  <p className="font-marcellus leading-relaxed max-w-3xl mx-auto">
                     Nos conocimos hace 5 años en una tarde de otoño. Desde
                     entonces, hemos compartido innumerables momentos que nos
                     han llevado a este día tan especial. Ahora queremos
                     celebrar nuestro amor rodeados de las personas más
                     importantes en nuestras vidas.
                  </p>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6, delay: 0.1 }}
                     viewport={{ once: true }}>
                     <div className="card overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg">
                        <div className="aspect-square relative">
                           <img
                              src="https://picsum.photos/400/400"
                              alt="Primer encuentro"
                              className="object-cover"
                           />
                        </div>
                        <div className="p-4 text-center">
                           <h3 className="font-medium text-rose-700 dark:text-rose-400 mb-2">
                              Primer Encuentro
                           </h3>
                           <p className="text-sm text-slate-600 dark:text-slate-300">
                              Octubre 2020
                           </p>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.3 }}
                     viewport={{ once: true }}>
                     <div className="card overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg">
                        <div className="aspect-square relative">
                           <img
                              src="https://picsum.photos/400/401"
                              alt="Compromiso"
                              className="object-cover"
                           />
                        </div>
                        <div className="p-4 text-center">
                           <h3 className="font-medium text-rose-700 dark:text-rose-400 mb-2">
                              Compromiso
                           </h3>
                           <p className="text-sm text-slate-600 dark:text-slate-300">
                              Febrero 2024
                           </p>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6, delay: 0.5 }}
                     viewport={{ once: true }}>
                     <div className="card overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-none shadow-lg">
                        <div className="aspect-square relative">
                           <img
                              src="https://picsum.photos/400/402"
                              alt="Evento"
                              className="object-cover"
                           />
                        </div>
                        <div className="p-4 text-center">
                           <h3 className="font-medium text-rose-700 dark:text-rose-400 mb-2">
                              Nuestro Evento
                           </h3>
                           <p className="text-sm text-slate-600 dark:text-slate-300">
                              Junio 2025
                           </p>
                        </div>
                     </div>
                  </motion.div>
               </div>

               <LoveHistory />
            </div>
         </section>

         {/* Sección de Linea de tiempo */}
         <section className="py-20 px-6  bg-white/50 dark:bg-slate-900/50 relative">
            <div className="max-w-4xl mx-auto">
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16">
                  <TimelineBoda />
               </motion.div>
            </div>
         </section>

         {/* Sección de detalles */}
         <section className="py-20 px-6 relative">
            <div className="max-w-4xl mx-auto">
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16">
                  <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-2 text-primary">
                     Detalles del Evento
                  </h2>
                  <motion.div
                     initial={{ opacity: 0, scale: 0, x: 50 }}
                     whileInView={{ opacity: 1, scale: 1, x: 0 }}
                     transition={{
                        delay: 0.5,
                        duration: 1,
                        type: "spring",
                     }}>
                     <Divider color="primary" />
                  </motion.div>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6 }}
                     viewport={{ once: true }}
                     className="text-center">
                     <div className="flex justify-center mb-4">
                        <Calendar className="h-12 w-12 text-primary/75" />
                     </div>
                     <h3 className="text-xl font-medium mb-4 text-slate-800 dark:text-slate-200">
                        Fecha y Hora
                     </h3>
                     <p className="text-slate-700 dark:text-slate-300 mb-4">
                        {formattedDate}
                     </p>
                     <p className="text-slate-700 dark:text-slate-300 mb-6">
                        {formattedTime} hrs
                     </p>
                     <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <button
                           // variant="outline"
                           className="btn btn-outline rounded-full border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30">
                           <a
                              href={googleCalendarUrl}
                              target="_blank"
                              rel="noopener noreferrer">
                              Agregar a Google Calendar
                           </a>
                        </button>
                     </motion.div>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6 }}
                     viewport={{ once: true }}
                     className="text-center">
                     <div className="flex justify-center mb-4">
                        <MapPin className="h-12 w-12 text-primary/75" />
                     </div>
                     <h3 className="text-xl font-medium mb-4 text-slate-800 dark:text-slate-200">
                        Ubicación
                     </h3>
                     <p className="text-slate-700 dark:text-slate-300 mb-4">
                        {weddingPlace}
                     </p>
                     <p className="text-slate-700 dark:text-slate-300 mb-6">
                        {location}
                     </p>
                     <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <button
                           variant="outline"
                           className="btn btn-outline rounded-full border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30">
                           <a
                              href={googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer">
                              Ver en Google Maps
                           </a>
                        </button>
                     </motion.div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* Sección de mesa de regalos */}
         <section className="py-20 px-6  bg-white/50 dark:bg-slate-900/50 relative">
            <div className="max-w-4xl mx-auto">
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center">
                  <div className="flex justify-center mb-4">
                     <Gift className="h-12 w-12 text-primary/75" />
                  </div>
                  <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-2 text-primary">
                     Mesa de Regalos
                  </h2>
                  <motion.div
                     initial={{ opacity: 0, scale: 0, x: 50 }}
                     whileInView={{ opacity: 1, scale: 1, x: 0 }}
                     transition={{
                        delay: 0.5,
                        duration: 1,
                        type: "spring",
                     }}>
                     <Divider color="primary" />
                  </motion.div>
                  <p className="font-marcellus text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
                     Tu presencia es nuestro mejor regalo. Sin embargo, si
                     deseas obsequiarnos algo, hemos creado una mesa de regalos
                     para facilitar tu elección.
                  </p>
                  <motion.div
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}>
                     <button className="btn bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 py-6">
                        <a
                           href={giftRegistryUrls}
                           target="_blank"
                           rel="noopener noreferrer">
                           Ver Mesa de Regalos
                        </a>
                     </button>
                  </motion.div>
               </motion.div>
            </div>
         </section>

         {/* Sección de Código de Vestimenta */}
         <section className="py-20 px-6 relative">
            <DressCode />
         </section>

         {/* Sección de RSVP */}
         <section className="py-20 px-6bg-white/50 dark:bg-slate-900/50 relative">
            <div className="max-w-4xl mx-auto">
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-12">
                  <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-2 text-primary">
                     Confirma tu Asistencia
                  </h2>
                  <motion.div
                     initial={{ opacity: 0, scale: 0, x: 50 }}
                     whileInView={{ opacity: 1, scale: 1, x: 0 }}
                     transition={{
                        delay: 0.5,
                        duration: 1,
                        type: "spring",
                     }}>
                     <Divider color="primary" />
                  </motion.div>
                  <p className="font-marcellus text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                     Por favor, confirma tu asistencia antes del{" "}
                     {dayjs(weddingDate)
                        .subtract(15, "days")
                        .format("dddd DD [de] MMMM [de] YYYY")}
                     .
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}>
                  <RsvpForm />
               </motion.div>
            </div>
         </section>

         {/* Footer */}
         <footer className="py-12 px-6 text-center">
            <p className="mb-4">atentamente,</p>
            <h2 className="font-dashing text-2xl mb-8 text-rose-700 dark:text-rose-400">
               {girlfriend} & {boyfriend}
            </h2>
            <p className="text-sm">
               &copy; {new Date().getFullYear()} | Diseñado con ♥
            </p>
         </footer>

         {/* Modal de RSVP para móviles */}
         {isMobile && showRsvp && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-serif text-xl text-rose-800 dark:text-rose-300">
                        Confirma tu Asistencia
                     </h3>
                     <button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowRsvp(false)}
                        className="text-slate-500">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round">
                           <path d="M18 6 6 18" />
                           <path d="m6 6 12 12" />
                        </svg>
                     </button>
                  </div>
                  <RsvpForm onComplete={() => setShowRsvp(false)} />
               </motion.div>
            </div>
         )}

         {/* Botón para volver arriba */}
         <ScrollToTopButton />
      </div>
   );
}
