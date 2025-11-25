import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { useMobile } from "../hooks/useMobile";
import LinkServiceOptions from "./LinkServiceOptions";

const ContactSection = () => {
   const isMobile = useMobile();

   return (
      <div className="max-w-6xl mx-auto px-4">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{
               once: false,
               margin: isMobile ? "0px" : "-25% 0px",
            }}
            className="text-center">
            {/* Encabezado */}
            <div className="mb-4">
               <motion.hr
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-0.5 bg-primary mx-auto mb-2 max-w-xs"
               />

               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="font-zapf-roman text-lg md:text-xl text-primary mb-2">
                  Atentamente
               </motion.p>

               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="font-anodina-bold text-xl md:text-2xl text-primary mb-1">
                  Dirección de Relaciones Públicas
               </motion.h2>

               <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="font-avenir-roman text-lg md:text-xl text-primary/80">
                  R. Ayuntamiento de Gómez Palacio, Dgo.
               </motion.h3>
            </div>

            {/* Línea divisoria */}
            <motion.div
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               transition={{ duration: 0.8, delay: 1 }}
               className="h-px bg-primary/30 mx-auto mb-4 max-w-md"
            />

            {/* Información de contacto */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
               {/* Dirección */}
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                     <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="bg-primary/10 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                     </motion.div>
                     <div>
                        <div className="font-avenir-roman text-base md:text-lg leading-relaxed text-base-content/90">
                           Piso 1, Presidencia Municipal
                           <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}>
                              <button
                                 className="btn btn-outline rounded-full btn-secondary mx-1 mb-1"
                                 onClick={() =>
                                    window.open(
                                       "https://maps.app.goo.gl/wvHPmVAH3js23qEg7",
                                       "_blank",
                                    )
                                 }>
                                 Ubicacion de Presidencia
                              </button>
                           </motion.div>
                           {/* <br />
                           C. Francisco I. Madero #400,
                           <br />
                           Zona Centro
                           <br />
                           35000, Gómez Palacio,
                           <br />
                           Durango, México */}
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Teléfonos */}
               <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                     <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-primary/10 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                     </motion.div>
                     <div className="flex flex-col gap-1">
                        <p className="font-avenir-roman text-base md:text-lg text-base-content/90">
                           87 11 75 10 00
                        </p>
                        <p className="font-avenir-roman text-base md:text-base text-base-content/90">
                           Ext. 125 / Ext. 360
                        </p>
                     </div>
                  </div>
               </motion.div>

               {/* Contacto */}
               <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="text-center md:text-left">
                  {/* Email */}
                  <motion.div whileHover={{ scale: 1.02 }} className="mb-4">
                     <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                        <motion.div
                           whileHover={{ scale: 1.1, rotate: -5 }}
                           className="bg-primary/10 p-3 rounded-full">
                           <Mail className="h-6 w-6 text-primary" />
                        </motion.div>
                        <div>
                           <p className="font-avenir-roman text-base md:text-lg text-base-content/90 break-all">
                              relaciones.publicas@gomezpalacio.gob.mx
                           </p>
                        </div>
                     </div>
                  </motion.div>
               </motion.div>
            </div>

            {/* Línea divisoria inferior */}
            <motion.div
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               transition={{ duration: 0.8, delay: 1.6 }}
               className="h-px bg-primary/30 mx-auto mt-8 max-w-md"
            />
         </motion.div>
      </div>
   );
};

export default ContactSection;
