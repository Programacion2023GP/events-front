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
} from "lucide-react";
import { useMobile } from "../hooks/useMobile";

export default function SplashLoader({
   weddingInfo,
   show,
   setShow,
   setIsPlaying,
}) {
   const isMobile = useMobile();
   // const [show, setShow] = useState(true);

   useEffect(() => {
      // const timeout = setTimeout(() => setShow(false), 3000); // 3 segundos
      // return () => clearTimeout(timeout);
   }, []);

   return (
      show && (
         <AnimatePresence>
            <motion.header
               className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center cursor-pointer overflow-x-hidden p-6"
               onClick={() => {
                  setShow(false);
                  setIsPlaying(true);
               }}
               // className="relative w-full h-screen flex flex-col items-center justify-center text-center p-6"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.6, ease: "easeInOut" }}
               exit={{ scale: 0, opacity: 0 }}>
               <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                  className="absolute inset-0 overflow-hidden z-0">
                  <img
                     src={
                        isMobile ? images.fondoSplashMovil : images.fondoSplash
                     }
                     alt="Imagen Splash"
                     className="object-cover w-full h-full transition-all"
                  />
               </motion.div>

               {/* Flechita de click */}
               <motion.div
                  className={`absolute ${
                     isMobile ? "bottom-5" : "md:top-56"
                  }  left-0 right-0 flex justify-center`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}>
                  <div
                     className="animate-bounce tooltip"
                     data-tip="Da click en cualquier parte de la pantalla para abrir la invitación">
                     <MousePointerClick
                        size={isMobile ? 30 : 70}
                        color="#FFF"
                     />
                  </div>
               </motion.div>

               <motion.div
                  className="z-10 max-w-3xl mx-auto relative h-full hidden"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8, type: "keyframes" }}>
                  {/* <h1 className="font-dashing text-3xl md:text-9xl mb-4 text-secondary">
                     {weddingInfo.bride} & {weddingInfo.groom}
                  </h1> */}
                  {/* <h1 className="font-mayoritte text-3xl md:text-9xl mb-4 text-rose-800 dark:text-rose-300">
                        {bride} & {groom}
                     </h1> */}
                  <motion.div
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{
                        delay: 1.5,
                        duration: 0.5,
                        type: "spring",
                     }}
                     className="flex justify-center my-2 -mt-36 bottom-50 left-30 absolute">
                     <Heart
                        className="text-primary h-12 w-12 animate-pulse"
                        fill="currentColor"
                     />
                  </motion.div>
                  {/* <motion.h2
                     className="font-marcellus text-xl md:text-2xl mb-2"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{
                        delay: 0.5,
                        duration: 1,
                        ease: "easeInOut",
                     }}>
                     !NOS CASAMOS!
                  </motion.h2>
                  <p className="font-anodina-extrabold text-lg text-base-content/75">
                     {weddingInfo.date} - {weddingInfo.weddingPlace}{" "}
                     {weddingInfo.location}
                  </p>
                  <p className="text-lg md:text-xl font-anodina-extrabold mb-8">
                     {weddingInfo.time} hrs
                  </p> */}
                  <motion.div
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className="">
                     <button
                        className="btn btn-primary font-marcellus rounded-full px-8 py-6 text-lg "
                        onClick={() => {
                           setShow(false);
                           setIsPlaying(true);
                        }}>
                        Te invitamos a nuestro evento
                     </button>
                  </motion.div>
               </motion.div>
            </motion.header>
         </AnimatePresence>
      )
   );
}
