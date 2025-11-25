import React from "react";
import { motion } from "framer-motion";
import { useMobile } from "../hooks/useMobile";

interface InvitationHeaderProps {
   guestName: string;
   eventName: string;
   relationship?: string;
   backgroundImage?: string;
   decorativeElements?: boolean;
}

const InvitationHeader: React.FC<InvitationHeaderProps> = ({
   guestName,
   eventName,
   relationship = "Estimado(a)",
   backgroundImage,
   decorativeElements = true,
}) => {
   const isMobile = useMobile();

   return (
      <div className="relative w-full min-h-screen flex flex-col">
         {/* Sección del encabezado de invitación */}
         <div className="flex-1 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Fondo con efecto granulado */}
            <div className="absolute inset-0 bg-base-100/95 z-0"></div>

            {/* Elementos decorativos opcionales */}
            {decorativeElements && (
               <>
                  <div className="absolute top-10 left-10 w-24 h-24 opacity-10">
                     <div className="w-full h-full border-2 border-primary rounded-full"></div>
                  </div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 opacity-10">
                     <div className="w-full h-full border-2 border-secondary rounded-full"></div>
                  </div>
               </>
            )}

            {/* Contenido principal */}
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: false, margin: isMobile ? "0px" : "-25% 0px" }}
               className="text-center relative z-10 max-w-4xl mx-auto">
               {/* Línea decorativa superior */}
               <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-px bg-primary/30 mx-auto mb-0 max-w-xs"
               />

               {/* Nombre del invitado */}
               <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="font-zapf-bold text-4xl md:text-6xl lg:text-7xl text-primary mb-2 leading-tight">
                  {guestName}
                  <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6, delay: 0.4 }}
                     className="font-avenir-book text-lg md:text-xl text-primary mb-4">
                     {relationship}
                  </motion.p>
               </motion.h1>

               {/* Línea decorativa media */}
               <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-0.5 bg-primary/50 mx-auto mb-4 max-w-sm"
               />

               {/* Mensaje de invitación */}
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mb-3">
                  <p className="font-avenir-light text-lg md:text-xl text-base-content/80 mb-0">
                     Es un honor para nosotros invitarle a asistir al evento
                  </p>
               </motion.div>

               {/* Nombre del evento */}
               {/* <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="font-anodina-bold text-2xl md:text-4xl lg:text-5xl text-secondary mb-8 leading-relaxed">
                  {eventName}
               </motion.h2> */}

               {/* Línea decorativa inferior */}
               <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1.4 }}
                  className="h-px bg-primary/30 mx-auto mt-0 max-w-xs"
               />

               {/* Elemento decorativo central */}
               <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 1.6, type: "spring" }}
                  className="w-16 h-16 mx-auto mt-2 flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-primary/50 rounded-full flex items-center justify-center">
                     <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
               </motion.div>
            </motion.div>
         </div>

         {/* Sección de imagen a lo largo */}
         <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            viewport={{ once: true }}
            className="w-full h-64 md:h-96 lg:h-[500px] relative overflow-hidden">
            {backgroundImage ? (
               <img
                  src={backgroundImage}
                  alt="Evento"
                  className="w-full h-full object-contain"
               />
            ) : (
               <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                  <p className="font-avenir-roman text-base-content/50 text-lg">
                     Imagen
                  </p>
               </div>
            )}

            {/* Overlay para mejor legibilidad del texto que pueda ir encima */}
            <div className="absolute inset-0 bg-gradient-to-t from-base-100/10 to-transparent"></div>
         </motion.div>
      </div>
   );
};

export default InvitationHeader;
