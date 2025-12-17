"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import images from "../constants/images";
import { Heart } from "lucide-react";
import BokehCircle from "./BokehCircle";
import { useMobile } from "../hooks/useMobile";

interface InvitationCardProps {
  nameEvent: string;
  organizers: { department: string; email: string };
  groom: string;
  theDate: string;
  time: string;
  place: string;
  location: string;
  option: 1 | 2;
  imgOficialFlotante?: boolean;
  imgPortada: string;
  bgPortada: string;
  textContent: string | null;
  onConfirmClick?: () => void;
}

export default function InvitationCard({
  nameEvent,
  organizers,
  groom,
  theDate,
  time,
  place,
  location,
  option = 1,
  onConfirmClick,
  imgPortada,
  bgPortada,
  imgOficialFlotante = false,
  textContent = null,
}: InvitationCardProps) {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const isMobile = useMobile();

  // Carrusel de imágenes de fondo
  const heroImages = [
    imgPortada,
    // images.hero2,
    // isMobile ? images.hero2 : images.hero2,
    // Agrega aquí más imágenes si lo deseas
  ];
  const [currentImage, setCurrentImage] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Cambia cada N segundos
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return option == 1 ? (
    <>
      {/* Círculos Bokeh */}

      <motion.section
        className={`relative h-screen flex flex-col items-center justify-start text-center p-6 ${bgPortada}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute inset-0 overflow-hidden z-0 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {textContent ? (
              <div className="relative z-10 max-w-6xl mx-auto text-center">
                <h1 className="font-zapf-bold text-6xl md:text-8xl text-primary-content mb-4">
                  {textContent}
                </h1>

                {/* <p className="font-zapf-roman text-xl md:text-2xl mb-2">
                  {nameEvent}
                </p>
                <p className="font-anodina-extrabold text-lg text-base-content/75">
                  {theDate} - {location}
                </p> */}
              </div>
            ) : (
              <motion.img
                key={heroImages[currentImage]}
                src={heroImages[currentImage]}
                alt="Foto Principal"
                className="object-contain object-center w-full h-full transition-all "
                style={{ objectPosition: "center center" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {imgOficialFlotante && (
          <img
            key={`key-logo-oficial`}
            src={images.logo_oficial_negro}
            alt="Foto Principal"
            className="object-contain absolute right-0 w-[550px] h-[250px] transition-all"
            style={{}}
            // style={{ objectPosition: "center right" }}
          />
        )}
        {/* <BokehCircle /> */}

        <motion.div
          className="z-10 max-w-9xl mx-auto mt-20 hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h1 className="font-zapf-roman text-2xl md:text-7xl mb-4 text-secondary">
            {organizers.department} {groom && `& ${groom}`}
          </h1>
          {/* <h1 className="font-zapf-roman text-3xl md:text-9xl mb-4 text-rose-800 dark:text-rose-300">
                        {organizers.department} & {groom}
                     </h1> */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
            className="flex justify-center my-2"
          >
            <Heart
              className="text-primary h-12 w-12 animate-pulse"
              fill="currentColor"
            />
          </motion.div>
          <p className="font-zapf-roman text-xl md:text-2xl mb-2 text-white">
            {nameEvent}
          </p>
          <p className="font-zapf-roman text-lg text-white">
            {theDate} - {place}, {location}
          </p>
          <p className="text-lg md:text-xl font-zapf-roman mb-8 text-white">
            {time} hr
          </p>
          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <button
                  className="btn btn-primary rounded-full px-8 py-6 text-lg"
                  onClick={onConfirmClick}>
                  Confirmar Asistencia
               </button>
            </motion.div> */}
        </motion.div>

        {/* Flechita */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
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
              className="text-white"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </motion.div>

        {/* <!-- Efecto de papel rasgado en la parte inferior --> */}
        {/* <div className="torn-paper-effect"></div> */}
      </motion.section>
    </>
  ) : (
    <motion.section
      className="relative bg-primary py-20 px-6 text-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <img
        src={images.floral}
        alt="Decoración floral"
        className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-20 pointer-events-none"
      />

      <div className="relative z-10 max-w-xl mx-auto">
        <h1 className="font-zapf-roman text-4xl md:text-6xl text-primary-content mb-4">
          {organizers.department} {groom && `& ${groom}`}
        </h1>
        <p className="font-zapf-roman text-xl md:text-2xl mb-2">{nameEvent}</p>
        <p className="font-anodina-extrabold text-lg text-base-content/75">
          {theDate} - {location}
        </p>

        <div className="mt-8">
          <button
            onClick={onConfirmClick}
            className="btn btn-primary px-6 py-3 rounded-full shadow-lg transition transform hover:scale-105"
          >
            Confirmar Asistencia
          </button>
        </div>
      </div>
    </motion.section>
  );
}
