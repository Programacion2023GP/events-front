import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeAlert, Clock, Users } from "lucide-react";
import Divider from "./Divider";
import { useMobile } from "../hooks/useMobile";

const Considerations = ({}) => {
   const isMobile = useMobile();

   const considerations = [
      {
         icon: <Users className="h-6 w-6" />,
         text: "Agradecemos su comprensión, este evento es solo para adultos (no niños).",
         color: "text-primary",
      },
      {
         icon: <Clock className="h-6 w-6" />,
         text: "Le recomendamos llegar 30 minutos antes de la hora señalada.",
         color: "text-secondary",
      },
   ];

   return (
      <div className="max-w-4xl mx-auto px-4">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{
               once: false,
               margin: isMobile ? "0px" : "-25% 0px",
            }}
            className="text-center">
            <div className="flex justify-center mb-4">
               <BadgeAlert className="h-12 w-12 text-primary/75" />
            </div>
            <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-2 text-primary">
               Consideraciones
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
            <p className="font-marcellus leading-relaxed max-w-3xl mx-auto mb-8">
               "Para que todos podamos disfrutar de este día especial, les
               compartimos algunas consideraciones:"
            </p>

            {/* Lista de consideraciones */}
            {isMobile ? (
               <>
                  {/* Versión alternativa en una sola columna para móviles */}
                  <div className="md:hidden mt-6 space-y-4">
                     {considerations.map((consideration, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, x: -30 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           transition={{
                              duration: 0.6,
                              delay: 0.8 + index * 0.2,
                           }}
                           whileHover={{ scale: 0.6 }}
                           whileTap={{ scale: 0.98 }}
                           className="flex items-center gap-4 bg-base-200/50 rounded-2xl px-6 py-4 backdrop-blur-sm border border-base-300/30">
                           <div
                              className={`${consideration.color} flex-shrink-0`}>
                              {consideration.icon}
                           </div>
                           <p className="text-base-content/75 text-sm text-left">
                              {consideration.text}
                           </p>
                        </motion.div>
                     ))}
                  </div>
               </>
            ) : (
               <>
                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                     {considerations.map((consideration, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 30 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{
                              duration: 0.6,
                              delay: 0.8 + index * 0.2,
                           }}
                           whileHover={{ scale: 0.6 }}
                           whileTap={{ scale: 0.95 }}
                           className="flex flex-col items-center">
                           <div className={`${consideration.color} mb-3`}>
                              {consideration.icon}
                           </div>
                           <div className="text-base-content/75 bg-base-200/50 rounded-2xl px-6 py-5 text-center backdrop-blur-sm border border-base-300/30">
                              {consideration.text}
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </>
            )}
         </motion.div>
      </div>
   );
};

export default Considerations;
