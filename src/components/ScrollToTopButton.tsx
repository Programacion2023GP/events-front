"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTopButton() {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const toggleVisibility = () => {
         if (window.pageYOffset > 300) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         }
      };

      window.addEventListener("scroll", toggleVisibility);

      return () => window.removeEventListener("scroll", toggleVisibility);
   }, []);

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };

   return (
      <AnimatePresence>
         {isVisible && (
            <motion.button
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.5 }}
               onClick={scrollToTop}
               className="btn btn-circle fixed bottom-6 right-6 z-50 bg-accent text-accent-content rounded-full shadow-lg transition-colors"
               aria-label="Volver arriba">
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
                  <path d="m18 15-6-6-6 6" />
               </svg>
            </motion.button>
         )}
      </AnimatePresence>
   );
}
