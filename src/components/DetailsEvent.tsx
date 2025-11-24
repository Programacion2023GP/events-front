import React from "react";
import { motion } from "framer-motion";
import {
   Calendar,
   MapPin,
   Clock,
   Users,
   Car,
   Accessibility,
   Music,
   Utensils,
} from "lucide-react";
import LinkServiceOptions from "./LinkServiceOptions";
import { useMobile } from "../hooks/useMobile";

interface DetailsEventProps {
   formattedDate: string;
   formattedTime: string;
   googleCalendarUrl: string;
   weddingPlace: string;
   weddingDate: string;
   location: string;
   googleMapsUrl: string;
   dressCode?: string;
   eventType?: string;
   parkingInfo?: string;
   specialInstructions?: string;
   guestCount?: string;
   duration?: string;
   hasValet?: boolean;
   isAccessible?: boolean;
}

const DetailsEvent: React.FC<DetailsEventProps> = ({
   formattedDate,
   formattedTime,
   googleCalendarUrl,
   weddingPlace,
   weddingDate,
   location,
   googleMapsUrl,
   dressCode = "Vestimenta formal",
   eventType = "Recepcion",
   parkingInfo = "Estacionamiento disponible",
   specialInstructions = "",
   guestCount = "Invitados confirmados",
   duration = "4 horas",
   hasValet = false,
   isAccessible = true,
}) => {
   const isMobile = useMobile();

   const eventDetails = [
      {
         icon: <Calendar className="h-6 w-6" />,
         title: "Fecha y Hora",
         items: [
            { label: "Fecha", value: formattedDate },
            { label: "Hora", value: `${formattedTime} hrs` },
            { label: "Duración", value: duration },
         ],
         action: (
            <LinkServiceOptions
               type="calendar"
               calendarUrl={googleCalendarUrl}
               mapsUrl={googleMapsUrl}
               weddingDate={weddingDate}
               weddingPlace={weddingPlace}
            />
         ),
      },
      {
         icon: <MapPin className="h-6 w-6" />,
         title: "Ubicación",
         items: [
            { label: "Lugar", value: weddingPlace },
            { label: "Dirección", value: location },
         ],
         action: (
            <LinkServiceOptions
               type="maps"
               calendarUrl={googleCalendarUrl}
               mapsUrl={googleMapsUrl}
               weddingDate={weddingDate}
               weddingPlace={weddingPlace}
            />
         ),
      },
      {
         icon: <Users className="h-6 w-6" />,
         title: "Invitados",
         items: [
            { label: "Tipo de evento", value: eventType },
            { label: "Confirmados", value: guestCount },
            { label: "Vestimenta", value: dressCode },
         ],
      },
      {
         icon: <Car className="h-6 w-6" />,
         title: "Transporte y Estacionamiento",
         items: [
            { label: "Estacionamiento", value: parkingInfo },
            {
               label: "Servicio de valet",
               value: hasValet ? "Disponible" : "No disponible",
            },
            {
               label: "Accesibilidad",
               value: isAccessible ? "Accesible" : "Consultar",
            },
         ],
      },
      {
         icon: <Utensils className="h-6 w-6" />,
         title: "Recepción",
         items: [
            { label: "Tipo de comida", value: "Banquete" },
            { label: "Bebidas", value: "Bar abierto" },
            { label: "Menú", value: "Internacional" },
         ],
      },
      {
         icon: <Music className="h-6 w-6" />,
         title: "Entretenimiento",
         items: [
            { label: "Música", value: "Banda en vivo y DJ" },
            { label: "Baile", value: "Pista de baile" },
            { label: "Actividades", value: "Fotografía y más" },
         ],
      },
   ];

   return (
      <div className="max-w-6xl mx-auto px-4 py-12">
         {/* Encabezado */}
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, margin: isMobile ? "0px" : "-25% 0px" }}
            className="text-center mb-12">
            <h2 className="font-marcellus font-black text-3xl md:text-4xl mb-4 text-primary">
               Detalles del Evento
            </h2>
            <motion.div
               initial={{ opacity: 0, scale: 0 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5, duration: 1, type: "spring" }}
               className="h-1 bg-primary/30 mx-auto max-w-xs mb-6"
            />
            <p className="font-anodina-regular text-base-content/75 text-lg max-w-2xl mx-auto">
               Toda la información importante para que disfrutes al máximo esta
               celebración
            </p>
         </motion.div>

         {/* Grid de detalles - Mobile First */}
         <div className="space-y-6 md:space-y-8">
            {eventDetails.map((section, index) => (
               <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{
                     once: false,
                     margin: isMobile ? "0px" : "-25% 0px",
                  }}
                  className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-300/50">
                  {/* Header de la sección */}
                  <div className="flex items-center gap-4 mb-6">
                     <div className="bg-primary/10 p-3 rounded-xl">
                        <div className="text-primary">{section.icon}</div>
                     </div>
                     <div className="flex-1">
                        <h3 className="font-anodina-bold text-xl text-primary">
                           {section.title}
                        </h3>
                     </div>
                  </div>

                  {/* Contenido de la sección */}
                  <div className="space-y-4">
                     {section.items.map((item, itemIndex) => (
                        <div
                           key={itemIndex}
                           className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2 border-b border-base-300/30 last:border-b-0">
                           <span className="font-anodina-bold text-base-content/60 text-sm min-w-32">
                              {item.label}:
                           </span>
                           <span className="font-anodina-regular text-base-content/90 flex-1">
                              {item.value}
                           </span>
                        </div>
                     ))}
                  </div>

                  {/* Acción (si existe) */}
                  {section.action && (
                     <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 pt-4 border-t border-base-300/30">
                        {section.action}
                     </motion.div>
                  )}
               </motion.div>
            ))}
         </div>

         {/* Instrucciones especiales */}
         {specialInstructions && (
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.8 }}
               className="mt-8 bg-warning/10 rounded-2xl p-6 border border-warning/20">
               <div className="flex items-start gap-4">
                  <Accessibility className="h-6 w-6 text-warning mt-1 flex-shrink-0" />
                  <div>
                     <h4 className="font-anodina-bold text-warning text-lg mb-2">
                        Información importante
                     </h4>
                     <p className="font-anodina-regular text-base-content/80">
                        {specialInstructions}
                     </p>
                  </div>
               </div>
            </motion.div>
         )}

         {/* Llamada a la acción principal */}
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-12">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
               <h3 className="font-marcellus text-2xl md:text-3xl text-primary mb-4">
                  ¿Tienes alguna duda?
               </h3>
               <p className="font-anodina-regular text-base-content/75 mb-6 max-w-2xl mx-auto">
                  No dudes en contactarnos si necesitas información adicional
                  sobre el evento, direcciones o cualquier otro detalle.
               </p>
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-lg rounded-full px-8">
                  <MapPin className="h-5 w-5 mr-2" />
                  Contactar anfitriones
               </motion.button>
            </div>
         </motion.div>
      </div>
   );
};

export default DetailsEvent;
