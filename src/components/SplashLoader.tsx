import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import images from "../constants/images";
import {
   ClipboardCheck,
   Heart,
   LucideMousePointerClick,
   MousePointer2,
   MousePointerClick,
   Pointer,
   Phone,
} from "lucide-react";
import { useMobile } from "../hooks/useMobile";
import env from "../constants/env";
import Loading from "./Loading";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function SplashLoader({
   invitationData,
   show,
   setShow,
   setIsPlaying,
   formData,
   setFormData,
}): any {
   const isMobile = useMobile();
   const [phoneNumber, setPhoneNumber] = useState("");
   const [error, setError] = useState("");
   const [authorized, setAuthorized] = useState<boolean | null>(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [showButtonDownload, setShowButtonDownload] = useState(false);
   const { isLoading, setIsLoading } = useGlobalContext();

   useEffect(() => {
      console.log("cargando");
      setIsLoading(false);
      // const timeout = setTimeout(() => setShow(false), 3000);
      // return () => clearTimeout(timeout);
   }, []);

   const checkPhone = async () => {
      setShowButtonDownload(false);
      if (formData.telefono.length < 10) return;
      try {
         setIsLoading(true);
         setIsSubmitting(true);
         const res = await fetch(
            `${invitationData.API_MACRO}?telefono=${formData.telefono}&action=getGuest`,
         );
         const data = await res.json();
         console.log("🚀 ~ checkPhone ~ data:", data);
         setAuthorized(data.autorizado);
         if (data.autorizado) {
            // setTable(data.table);
            setFormData({
               ...formData,
               nombre: data.nombre,
               puesto: data.puesto,
            });
            setShow(false);

            setError("");
            if (data.guestCode) {
               setShowButtonDownload(true);
            }
         } else {
            setError("Este número no está autorizado.");
         }
         setIsSubmitting(false);
         setIsLoading(false);
      } catch {
         setError("Error validando el teléfono.");
      } finally {
         setIsSubmitting(false);
         setIsLoading(false);
      }
   };

   const handlePhoneChange = (e) => {
      const value = e.target.value.replace(/\D/g, ""); // Solo números
      if (value.length <= 10) {
         setPhoneNumber(value);
         setFormData({ ...formData, telefono: value });
         setError("");
      }
   };

   const handleContinue = () => {
      if (phoneNumber.length === 10) {
         console.log("Número telefónico:", phoneNumber);
         // Aquí puedes guardar el número o enviarlo a tu backend
         setIsLoading(true);
         setIsPlaying(true);
         checkPhone();
      } else {
         setError("Por favor ingresa un número válido de 10 dígitos");
      }
   };

   const handleKeyPress = (e) => {
      if (e.key === "Enter" && phoneNumber.length === 10) {
         handleContinue();
      }
   };

   return (
      show && (
         <>
            <AnimatePresence>
               <Loading open={isLoading} animation="bounce" />
               <motion.header
                  className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center overflow-x-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  exit={{ scale: 0, opacity: 0 }}>
                  <motion.img
                     src={
                        isMobile ? images.fondoSplashMovil : images.fondoSplash
                     }
                     alt="Foto Principal"
                     className="object-cover object-center w-full h-full transition-all opacity-20 dark:opacity-80"
                     style={{ objectPosition: "center center" }}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 1.2, ease: "easeInOut" }}
                  />

                  {/* Formulario de número telefónico */}
                  <motion.div
                     className="absolute z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl max-w-md w-full mx-4"
                     initial={{ scale: 0.8, opacity: 0, y: 50 }}
                     animate={{ scale: 1, opacity: 1, y: 0 }}
                     transition={{ delay: 1.5, duration: 0.6, type: "spring" }}>
                     <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.8, duration: 0.5 }}
                        className="flex justify-center mb-4">
                        <Phone className="text-primary h-10 w-10" />
                     </motion.div>

                     <h2 className="font-marcellus text-2xl md:text-3xl mb-2 text-gray-800 dark:text-white">
                        Bienvenido
                     </h2>
                     <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
                        Por favor ingresa tu número telefónico para continuar
                     </p>

                     <div className="space-y-4">
                        <div>
                           <input
                              type="tel"
                              inputMode="numeric"
                              placeholder="(___) ___ ____"
                              value={phoneNumber}
                              onChange={handlePhoneChange}
                              onKeyPress={handleKeyPress}
                              className="w-full px-4 py-3 text-center text-lg md:text-xl tracking-widest rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-primary transition-colors"
                              maxLength={10}
                           />
                           {error && (
                              <motion.p
                                 initial={{ opacity: 0, y: -10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className="text-red-500 text-sm mt-2">
                                 {error}
                              </motion.p>
                           )}
                        </div>

                        {/* Botón de envío */}
                        <div className="text-center pt-4">
                           <button
                              className="btn btn-primary btn-wide rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                              // disabled={isSubmitting || maxGuests === null}
                           >
                              {isSubmitting &&
                              formData.asistencia == "confirmed" &&
                              formData.guests > 0 ? (
                                 <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Enviando...
                                 </>
                              ) : (
                                 <>
                                    <span>🎊</span>
                                    Confirmar Asistencia
                                    <span>🎊</span>
                                 </>
                              )}
                           </button>
                        </div>

                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={handleContinue}
                           disabled={phoneNumber.length !== 10}
                           className={`w-full btn btn-primary font-marcellus rounded-lg px-6 py-3 text-lg transition-all ${
                              phoneNumber.length !== 10
                                 ? "opacity-50 cursor-not-allowed"
                                 : ""
                           }`}>
                           Continuar
                        </motion.button>
                     </div>

                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                        Ingresa tu número para accesar a la invitación
                     </p>
                  </motion.div>

                  {/* Flechita de click - opcional, puedes comentarla si prefieres */}
                  {/* <motion.div
            className={`absolute ${
              isMobile ? "bottom-5" : "md:top-56"
            } left-0 right-0 flex justify-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div
              className="animate-bounce tooltip"
              data-tip="Ingresa tu número telefónico para continuar"
            >
              <MousePointerClick size={isMobile ? 30 : 70} color="#FFF" />
            </div>
          </motion.div> */}
               </motion.header>
            </AnimatePresence>{" "}
         </>
      )
   );
}
