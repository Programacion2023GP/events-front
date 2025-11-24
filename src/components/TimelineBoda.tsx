"use client";

import type React from "react";
import { easeInOut, motion } from "framer-motion";
import Divider from "./Divider";
import { useGlobalContext } from "../contexts/GlobalContext";
import images from "../constants/images";
import { image } from "motion/react-client";
import { useMobile } from "../hooks/useMobile";
import { Pointer } from "lucide-react";

const TimelineBoda = ({ weddingInfo }) => {
   // const { themeActive } = useGlobalContext();
   const isMobile = useMobile();

   // Definir los eventos de la boda
   const eventos = [
      {
         hora: "16:30",
         titulo: "Sesión",
         subtitulo: "Fotográfica",
         icono: images.camera,
      },
      {
         hora: "20:00",
         titulo: "Ceremonia",
         subtitulo: "Religiosa",
         icono: images.doves,
      },
      {
         hora: "20:30",
         titulo: "Ceremonia",
         subtitulo: "Civil",
         icono: images.weddingRings,
      },
      {
         hora: "21:00",
         titulo: "Recepción",
         subtitulo: "",
         icono: images.arch,
      },
      {
         hora: "21:30",
         titulo: "1er Baile",
         subtitulo: "",
         icono: images.vinyl,
      },
      // {
      //    hora: "21:40",
      //    titulo: "Baile con los Padres",
      //    subtitulo: "",
      //    icono: images.weddingGramophone,
      // },
      // {
      //    hora: "21:50",
      //    titulo: "Baile del billete",
      //    subtitulo: "",
      //    icono: images.weddingGramophone,
      // },
      {
         hora: "21:40",
         titulo: "Brindis",
         subtitulo: "de Honor",
         icono: images.brindis,
      },
      {
         hora: "22:00",
         titulo: "Cena",
         subtitulo: "Especial",
         icono: images.dinner,
      },
      {
         hora: "22:50",
         titulo: "¡A Bailar",
         subtitulo: "Todos!",
         icono: images.music,
      },
      {
         hora: "00:00",
         titulo: "Pastel",
         subtitulo: "de Bodas",
         icono: images.weddingCake,
      },
      // {
      //    hora: "01:00",
      //    titulo: "Snacks!",
      //    subtitulo: "",
      //    icono: images.icecream,
      // },
      {
         hora: "02:00",
         titulo: "Fin",
         subtitulo: "",
         icono: images.coche,
      },
   ];

   return (
      <>
         <div className="max-w-4xl mx-auto mb-10">
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{
                  once: false,
                  margin: isMobile ? "0px" : "-25% 0px",
               }}
               className="text-center mb-2">
               <h2 className="font-zapf-roman font-black text-2xl md:text-4xl mb-2 text-primary">
                  Itinerario del Evento
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
               <p className="font-zapf-roman italic leading-relaxed max-w-3xl mx-auto mb-2">
                  ¿Lo mejor? ¡No necesitarás moverte de lugar! Hemos preparado
                  todo en{" "}
                  <span className="font-bold">
                     {weddingInfo.place}, {weddingInfo.location}
                  </span>{" "}
                  para que disfrutes la velada sin complicaciones. Ceremonia y
                  fiesta... ¡todo en el mismo sitio! .
               </p>
            </motion.div>

            {/* Timeline horizontal */}
            <div className="relative overflow-x-scroll h-fit scroll-smooth">
               <div className="min-w-[800px] relative">
                  {/* Línea ondulada SVG */}
                  <svg
                     className="absolute top-32 left-0 text-primary/30 w-full h-16 hidden"
                     viewBox="0 0 800 60"
                     preserveAspectRatio="none">
                     <path
                        d="M 0 30 Q 100 10 200 30 T 400 30 T 600 30 T 800 30 "
                        stroke="#8b7355"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                     />
                     {/* Puntos en la línea */}
                     {eventos.map((_, index) => {
                        const x = (index * 800) / (eventos.length - 1);
                        const y = 30 + Math.sin((index * Math.PI) / 3) * 10;
                        return (
                           <circle
                              key={`point-${index}`}
                              cx={x}
                              cy={y}
                              r="4"
                              fill="#e5b168"
                           />
                        );
                     })}
                  </svg>

                  {/* Eventos */}
                  <div className="flex justify-between items-start mt-8 h-60 w-full">
                     {eventos.map((evento, index) => (
                        <motion.div
                           key={`event-${index}`}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{
                              duration: 0.5,
                              delay: index < 10 ? index * 0.35 : index * 0.06,
                              easings: [easeInOut],
                           }}
                           viewport={{
                              once: false,
                              margin: isMobile ? "0px" : "-25% 0px",
                           }}
                           className="flex flex-col items-center text-center w-24 md:w-32 px-3 transition-all ease-in-out hover:duration-300 hover:-translate-y-2">
                           {/* Icono */}
                           <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-primary border-2 flex items-center justify-center mb-4 shadow-sm">
                              <img
                                 src={evento.icono}
                                 alt={evento.titulo}
                                 className="text-center w-12 h-12 transition-all text-primary"
                                 style={{
                                    transition: "transform 0.3s easeInOut",
                                 }}
                                 onMouseOver={(e) =>
                                    (e.currentTarget.style.transform =
                                       "scale(1.1)")
                                 }
                                 onMouseOut={(e) =>
                                    (e.currentTarget.style.transform =
                                       "scale(1)")
                                 }
                              />
                           </div>

                           {/* Espacio para la línea */}
                           {/* <div className="h-16"></div> */}

                           {/* Hora */}
                           <div className="sm:text-lg md:text-2xl  font-anodina-extrabold mb-1">
                              {evento.hora}
                           </div>

                           {/* Título y subtítulo */}
                           <div className="sm:text-lg md:text-1xl font-zapf-roman">
                              <div className="">{evento.titulo}</div>
                              <div className="">{evento.subtitulo}</div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Nota al pie */}
            <div className="text-center mt-1">
               <p className="text-sm font-zapf-roman italic text-primary">
                  *Los horarios pueden variar ligeramente
               </p>
               {/* Indicador de scroll */}
               <motion.div
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-30"
                  style={
                     {
                        // opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
                     }
                  }>
                  <div className="flex flex-col items-center text-base-content">
                     <span className="text-sm font-zapf-roman mb-1 w-full">
                        Arrastra horizontalmente en la linea del tiempo para ver
                        todos los eventos
                     </span>
                     <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{
                           duration: 2,
                           repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="flex justify-center">
                        <Pointer className="text-base-content" />
                        {/* <div className="w-1 h-3 bg-white/70 rounded-full mt-2" /> */}
                     </motion.div>
                  </div>
               </motion.div>
            </div>
         </div>
      </>
   );
};

export default TimelineBoda;
