import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Divider from "./Divider";
import { useMobile } from "../hooks/useMobile";

const LoveHistory = ({}) => {
   const isMobile = useMobile();

   // Definir los eventos de la historia de amor
   const historiaEvents = [
      {
         titulo: "Primer Encuentro",
         fecha: "Octubre 15, 2020",
         descripcion:
            "Nos conocimos en una cafetería del centro. Fue casualidad, o quizás el destino. Una conversación que debía durar 5 minutos se extendió por horas. Desde ese momento supimos que había algo especial entre nosotros.",
         imagen: "/placeholder.svg?height=400&width=400",
         alt: "Primer encuentro",
      },
      {
         titulo: "Primera Cita",
         fecha: "Noviembre 5, 2020",
         descripcion:
            "Nuestra primera cita oficial fue en un pequeño restaurante italiano. Entre risas, vino y conversaciones interminables, confirmamos lo que ya sabíamos: esto era el comienzo de algo maravilloso.",
         imagen: "/placeholder.svg?height=400&width=400",
         alt: "Primera cita",
      },
      {
         titulo: "Propuesta de Matrimonio",
         fecha: "Febrero 14, 2024",
         descripcion:
            "En nuestro lugar favorito, bajo las estrellas y con la ciudad de fondo, la pregunta más importante fue hecha. Con lágrimas de felicidad, la respuesta fue un rotundo 'Sí'.",
         imagen: "/placeholder.svg?height=400&width=400",
         alt: "Propuesta de matrimonio",
      },
      {
         titulo: "Nuestro Compromiso",
         fecha: "Marzo 30, 2024",
         descripcion:
            "Celebramos nuestro compromiso rodeados de familia y amigos. Un día lleno de amor, felicitaciones y planes para el futuro que estamos construyendo juntos.",
         imagen: "/placeholder.svg?height=400&width=400",
         alt: "Compromiso",
      },
   ];
   return (
      <div className="max-w-4xl mx-auto">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, margin: "-25% 0px" }}
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
            <p className="font-marcellus text-base-content leading-relaxed max-w-3xl mx-auto">
               Nos conocimos hace 5 años en una tarde de otoño. Desde entonces,
               hemos compartido innumerables momentos que nos han llevado a este
               día tan especial. Ahora queremos celebrar nuestro amor rodeados
               de las personas más importantes en nuestras vidas.
            </p>
         </motion.div>

         {/* Seccion Opcion 1 */}
         <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{ display: "none" }}>
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               viewport={{
                  once: false,
                  margin: isMobile ? "0px" : "-25% 0px",
               }}>
               <div className="card overflow-hidden backdrop-blur-sm border-none shadow-lg">
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
               viewport={{
                  once: false,
                  margin: isMobile ? "0px" : "-25% 0px",
               }}>
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
               viewport={{
                  once: false,
                  margin: isMobile ? "0px" : "-25% 0px",
               }}>
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

         <div className="relative">
            {/* <!-- Línea vertical central --> */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/30"></div>

            {/* <!-- Eventos de la historia de amor --> */}
            <div className="space-y-24 relative">
               {historiaEvents.map((evento, index) => (
                  <motion.div
                     key={`motion-event-item-${index}`}
                     initial={{ opacity: 0, scale: 0, y: -50 }}
                     whileInView={{ opacity: 1, scale: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.25 }}
                     viewport={{
                        once: false,
                     }}>
                     <div
                        className={`flex flex-col md:flex-row items-center ${
                           index % 2 === 0
                              ? "md:flex-row"
                              : "md:flex-row-reverse"
                        }`}>
                        <div
                           className={`w-full md:w-1/2 ${
                              index % 2 === 0
                                 ? "md:text-right md:pr-8"
                                 : "md:text-left md:pl-8"
                           } mb-6 md:mb-0`}>
                           <h3
                              className={`text-3xl font-mayoritte text-[#e5b168] bg-base-200 md:bg-transparent`}>
                              {evento.titulo}
                           </h3>
                           <p className="font-anodina-regular text-primary/80 mb-3 bg-base-200 md:bg-transparent">
                              {evento.fecha}
                           </p>
                           <p className="font-marcellus italic text-base-content leading-relaxed opacity-80 bg-base-200 md:bg-transparent">
                              {evento.descripcion}
                           </p>
                        </div>

                        <div className="z-10  items-center justify-center w-4 h-4 rounded-full bg-[#e5b168] absolute left-1/2 transform -translate-x-1/2 hidden md:flex"></div>

                        <div
                           className={`w-full md:w-1/2 ${
                              index % 2 === 0
                                 ? "md:text-left md:pl-8"
                                 : "md:text-right md:pr-8"
                           } flex justify-center md:justify-${
                              index % 2 === 0 ? "start" : "end"
                           }`}>
                           <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#e5b168]/30 shadow-lg">
                              <img
                                 // src={evento.imagen || "/placeholder.svg"}
                                 src={`https://picsum.photos/400/40${index}`}
                                 alt={evento.alt}
                                 width={400}
                                 height={400}
                                 className="object-cover w-full h-full"
                              />
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default LoveHistory;
