import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Divider from "./Divider";
import { Calendar, Clock, MapPin, Shirt } from "lucide-react";
import LinkServiceOptions from "./LinkServiceOptions";
import { useMobile } from "../hooks/useMobile";
import images from "../constants/images";

const DetailsEvent = ({
   formattedDate,
   formattedTime,
   googleCalendarUrl,
   weddingPlace,
   weddingDate,
   location,
   googleMapsUrl,
}) => {
   const isMobile = useMobile();

   return (
      <>
         {/* <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="">
            <img
               src={images.haciendaElegancia}
               alt="Hacienda Elegancia"
               className="absolute object-center opacity-25 w-full -mt-20 left-0 right-0"
            />
         </motion.div> */}
         <div className="max-w-4xl mx-auto relative">
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{
                  once: false,
                  margin: isMobile ? "0px" : "-25% 0px",
               }}
               className="text-center mb-16">
               <h2 className="font-zapf-roman font-black text-2xl md:text-4xl mb-2 text-primary">
                  Detalles del Evento
               </h2>
               <motion.div
                  initial={{ opacity: 0, scale: 0, x: 50 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{
                     delay: 0.5,
                     duration: 1,
                     type: "spring",
                  }}
                  viewport={{ once: false, margin: "-25% 0px" }}>
                  <Divider color="primary" />
               </motion.div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {/* Calendario */}
               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{
                     once: false,
                     margin: isMobile ? "0px" : "-25% 0px",
                  }}
                  className="text-center">
                  <div className="flex justify-center mb-4">
                     <Calendar className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-zapf-roman   mb-4">
                     Fecha y Hora
                  </h3>
                  <p className="font-avenir-roman">{formattedDate}</p>
                  <p className="mb-6 font-avenir-roman">{formattedTime} hrs</p>
                  <motion.div
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}>
                     <LinkServiceOptions
                        key={"caldendar"}
                        type={"calendar"}
                        calendarUrl={googleCalendarUrl}
                        mapsUrl={googleMapsUrl}
                        weddingDate={weddingDate}
                        weddingPlace={weddingPlace}
                     />

                     {/* <button
                     // variant="outline"
                     className="btn btn-outline rounded-full btn-primary">
                     <a
                        href={googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        Agregar a Google Calendar
                     </a>
                  </button> */}
                  </motion.div>
               </motion.div>

               {/* Ubicación */}
               <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{
                     once: false,
                     margin: isMobile ? "0px" : "-25% 0px",
                  }}
                  className="text-center">
                  <div className="flex justify-center mb-4">
                     <MapPin className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-zapf-roman   mb-4">
                     Ubicación
                  </h3>
                  <p className="font-avenir-roman">{weddingPlace}</p>
                  <p className="font-avenir-roman mb-6">{location}</p>
                  <motion.div
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}>
                     <LinkServiceOptions
                        key={"maps"}
                        type={"maps"}
                        calendarUrl={googleCalendarUrl}
                        mapsUrl={googleMapsUrl}
                        weddingDate={weddingDate}
                        weddingPlace={weddingPlace}
                     />
                     {/* <button
                     // variant="outline"
                     className="btn btn-outline rounded-full btn-primary">
                     <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        Ver en Google Maps
                     </a>
                  </button> */}
                  </motion.div>
               </motion.div>

               {/* Código de Vestimenta */}
               <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{
                     once: false,
                     margin: isMobile ? "0px" : "-25% 0px",
                  }}
                  className="text-center">
                  <div className="flex justify-center mb-4">
                     <Shirt className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-zapf-roman   mb-4">
                     Código de Vestimenta
                  </h3>
                  <p className="font-avenir-roman mb-6">Formal</p>
               </motion.div>

               {/* Recomendaciones */}
               <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{
                     once: false,
                     margin: isMobile ? "0px" : "-25% 0px",
                  }}
                  className="text-center">
                  <div className="flex justify-center mb-4">
                     <Clock className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-zapf-roman   mb-4">
                     Recomendaciones
                  </h3>
                  <p className="font-avenir-roman mb-6">
                     Le recomendamos llegar 30 minutos antes de la hora
                     señalada.
                  </p>
               </motion.div>
            </div>
         </div>
      </>
   );
};

export default DetailsEvent;
