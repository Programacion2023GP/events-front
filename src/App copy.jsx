"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
   motion,
   AnimatePresence,
   useScroll,
   useTransform,
} from "framer-motion";
import AudioPlayer from "./components/AudioPlayer";
import ThemeChanger from "./components/ThemeChanger";
import CountdownTimer from "./components/CountdownTimer";
import TimelineBoda from "./components/TimelineBoda";
import RsvpForm from "./components/RsvpForm";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Divider from "./components/Divider";
import { useMobile } from "./hooks/useMobile";
import audios from "./constants/audios";
import { detectOS, formatDatetime, getLinkWhatsApp } from "./utils/formats";
import LoveHistory from "./components/LoveHistory";
import DressCode from "./components/DressCode";
import GiftTable from "./components/GiftTable";
import DetailsEvent from "./components/DetailsEvent";
import InvitationCard from "./components/InvitationCard";
import Considerations from "./components/Considerations";
import { useGlobalContext } from "./contexts/GlobalContext";
import SplashLoader from "./components/SplashLoader";
import env from "./constants/env";
import Loading from "./components/Loading";
import PhotosThrown from "./components/PhotosThrown";
import images from "./constants/images";
import { useDynamicFavicon } from "./hooks/useDynamicFavicon";
import ContactSection from "./components/ContactSecction";
import InvitationHeader from "./components/InvitationHeader";
import ConfirmationForm from "./components/confirmationForm";
import { name } from "dayjs/locale/es";

export default function App() {
   //#region SCROLL DENSO
   // const containerRef = useRef(null);
   // // 1. Obtenemos el progreso del scroll (0 a 1)
   // const { scrollYProgress } = useScroll({
   //    container: containerRef, // Contenedor personalizado
   // });

   // // 2. Aplicamos una transformación no lineal para hacerlo más lento
   // const denseScroll = useTransform(
   //    scrollYProgress,
   //    [0, 1], // Rango de entrada
   //    [0, 1], // Rango de salida
   //    { clamp: false }, // Permite valores fuera del rango
   // );

   // // 3. Mapeamos a un desplazamiento "más lento"
   // const y = useTransform(denseScroll, [0, 1], ["0%", "-50%"]);

   //OPCION 2
   // const containerRef = useRef(null);
   // const contentRef = useRef(null);

   // useEffect(() => {
   //    const container = containerRef.current;
   //    const content = contentRef.current;

   //    const handleScroll = () => {
   //       console.log("🚀 ~ handleScroll ~ handleScroll:");
   //       const scrollY = container.scrollTop;
   //       // Ajusta la velocidad (0.5 = 50% más lento)
   //       content.style.transform = `translateY(${scrollY * 0.5}px)`;
   //    };

   //    container?.addEventListener("scroll", handleScroll);
   //    return () => container?.removeEventListener("scroll", handleScroll);
   // }, []);
   //#endregion SCROLL DENSO

   // const { theme, setTheme } = useTheme();
   const { themeActive } = useGlobalContext();
   useDynamicFavicon();

   const [showRsvp, setShowRsvp] = useState(false);
   const isMobile = useMobile();
   const [isScrolled, setIsScrolled] = useState(false);
   const mainRef = useRef(null);
   const rsvpRef = useRef(null);
   const [formData, setFormData] = useState({
      autorizado: false,
      guestCode: "",
      nombre: "",
      puesto: "",
      telefono: "",
      asistencia: "confirmed",
      seccion: "",
      asiento: "",
      timeStamp: "",
      confirmationType: "titular",
   });

   useEffect(() => {
      setIsLoading(false);
      // console.log(`🚀 ~ App ~ themeActive:`, themeActive);
   }, [themeActive]);

   useEffect(() => {
      const handleScroll = () => {
         const scrollPosition = window.scrollY;
         setIsScrolled(scrollPosition > 500); // Ajusta este valor según necesites
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   // Variables
   const nameEvent = "Presentación del Plan Municipal de Desarrollo 2025-2028";
   const weddingDate = new Date("2025-12-01T18:00:00");
   const weddingPlace = "Salón de eventos Altozano";
   const location = "ALTOZANO CP 35140, Gómez Palacio, Durango";
   const girlfriend =
         "Dirección de Relaciones Públicas, R. Ayuntamiento de Gómez Palacio, Dgo.",
      boyfriend = "";

   const formattedDate = formatDatetime(
      weddingDate,
      true,
      "dddd DD [de] MMMM [de] YYYY",
   );

   const formattedTime = formatDatetime(weddingDate, false, "HH:mm");

   // Crear enlace para Google Calendar
   const calendarUrl = `https://calendar.google.com/calendar/`; // ["MacOS", "iOS"].includes(detectOS()) ? `webcal://pXX-caldav.icloud.com/`:
   const googleCalendarUrl = `${calendarUrl}render?action=TEMPLATE&text=Evento+de+${girlfriend}+&dates=${weddingDate
      .toISOString()
      .replace(/-|:|\.\d+/g, "")
      .slice(0, 15)}00Z/${weddingDate
      .toISOString()
      .replace(/-|:|\.\d+/g, "")
      .slice(
         0,
         15,
      )}00Z&details=¡Estamos+emocionados+de+contar+contigo!&location=${weddingPlace.replace(
      " ",
      "+",
   )},+${location.replace(" ", "+")}&sf=true&output=xml`;

   // Crear enlace para Google Maps
   const googleMapsUrl = "https://maps.app.goo.gl/hXjwuD8yCn4rfRHi9"; //["MacOS", "iOS"].includes(detectOS()) ? `http://maps.apple.com/?q=${weddingPlace},${location}` :

   // Crear enlace para mesa de regalos
   const giftRegistryUrls = [
      {
         site: "Cimaco",
         link: "https://www.cimaco.com.mx/mesa-regalo/45392",
         image: images.cimaco,
         color: "white",
         type: "link",
      },
      // {
      //    site: "Mercado Libre",
      //    link: "https://meli.uniko.co/Home",
      //    image: "",
      //    color: "yellow-500",
      //    type: "link",
      // },
      {
         type: "transferencia",
         bankData: {
            banco: "BBVA",
            nombre: "Néstor Josue Puentes Inchaurregui",
            numeroTarjeta: "4152 3139 8353 6074",
            clabe: "012 078 02895772494 9",
            concepto: "Regalo boda de [Tu Nombre]",
            linkCobro: null, //"https://bbva.mx/tu-link-de-cobro",
         },
      },
   ];
   const weddingInfo = {
      nameEvent: nameEvent,
      bride: girlfriend,
      groom: boyfriend,
      date: formattedDate,
      time: formattedTime,
      theDate: weddingDate,
      fullDate: formatDatetime,
      place: weddingPlace,
      location: location,
      calendarUrl: googleCalendarUrl,
      mapsUrl: googleMapsUrl,
      giftTable: giftRegistryUrls,
   };

   const photos = [
      {
         src: images.memory1,
         alt: "Nuestra primera cita",
      },
      { src: images.memory2, alt: "Día en la playa" },
      { src: images.memory3, alt: "Cena romántica" },
      { src: images.memory4, alt: "Viaje a París" },
      {
         src: images.memory5,
         alt: "Cumpleaños juntos",
      },
      {
         src: images.memory6,
         alt: "Navidad en familia",
      },
      { src: images.memory7, alt: "Día de lluvia" },
      {
         src: images.memory8,
         alt: "Atardecer perfecto",
      },
      {
         src: images.memory9,
         alt: "Picnic en el parque",
      },
      {
         src: images.memory10,
         alt: "Concierto favorito",
      },
      {
         src: images.memory11,
         alt: "Picnic en el parque",
      },
      {
         src: images.memory12,
         alt: "Concierto favorito",
      },
      { src: images.memory13, alt: "Viaje a París" },
      {
         src: images.memory14,
         alt: "Cumpleaños juntos",
      },
      {
         src: images.memory15,
         alt: "Nuestra primera cita",
      },
      { src: images.memory16, alt: "Día en la playa" },
      { src: images.memory17, alt: "Cena romántica" },
      { src: images.memory18, alt: "Viaje a París" },
      {
         src: images.memory19,
         alt: "Cumpleaños juntos",
      },
      {
         src: images.memory20,
         alt: "Navidad en familia",
      },
      { src: images.memory21, alt: "Día de lluvia" },
      {
         src: images.memory22,
         alt: "Atardecer perfecto",
      },
      {
         src: images.memory23,
         alt: "Picnic en el parque",
      },
      {
         src: images.memory24,
         alt: "Concierto favorito",
      },
      {
         src: images.memory25,
         alt: "Picnic en el parque",
      },
      {
         src: images.memory26,
         alt: "Concierto favorito",
      },
      // Puedes añadir tantas como quieras...
   ];
   // Textos personalizados
   const customTexts = [
      {
         text: `🎵Y así te fui queriendo a diario Sin una ley sin un horario🎶`,
         position: { x: 40, y: 37 },
         delay: 0.1,
      },
      {
         text: "Cada foto cuenta nuestra historia",
         position: { x: 80, y: 25 },
         delay: 0.2,
      },
      {
         text: "Momentos que atesoramos para siempre",
         position: { x: 20, y: 58 },
         delay: 0.3,
      },
      {
         text: "Cada foto es un latido de nuestro corazón",
         position: { x: 4, y: 20 },
         delay: 0.4,
      },
      {
         text: "Momentos que se vuelven eternos",
         position: { x: 20, y: 90 },
         delay: 0.5,
      },
      {
         text: "Nuestra historia de amor en imágenes",
         position: { x: 70, y: 85 },
         delay: 0.6,
      },
      {
         text: "Las memorias nos vuelven a enamorar",
         position: { x: 6, y: 70 },
         delay: 0.7,
      },
   ];

   const handleClickConfirm = () => {
      setShowRsvp(true);
      setTimeout(() => {
         rsvpRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
   };
   const [showSplash, setShowSplash] = useState(true);
   const [isPlaying, setIsPlaying] = useState(false);
   const { isLoading, setIsLoading } = useGlobalContext();
   const [authorized, setAuthorized] = useState(false);

   const { tel } = useParams();

   const checkPhone = async (tel) => {
      // console.log("🚀 ~ checkPhone ~ tel:", tel, tel.length);
      // setShowButtonDownload(false);
      if (tel.length < 10) return;
      try {
         setIsLoading(true);
         // setIsSubmitting(true);
         const res = await fetch(
            `${env.API_MACRO}?telefono=${tel}&action=getGuest`,
         );
         const data = await res.json();
         //  console.log("🚀 ~ checkPhone ~ data:", data);
         setAuthorized(data.autorizado);
         if (data.autorizado) {
            // setTable(data.table);
            setFormData({
               ...formData,
               nombre: data.nombre,
               puesto: data.puesto,
               telefono: data.telefono,
            });
            setShow(false);

            // setError("");
            // if (data.guestCode) {
            //    // setShowButtonDownload(true);
            // }
         } else {
            // setError("Este número no está autorizado.");
         }
         // setIsSubmitting(false);
         setIsLoading(false);
      } catch {
         // setError("Error validando el teléfono.");
      } finally {
         // setIsSubmitting(false);
         setIsLoading(false);
      }
   };
   useEffect(() => {
      /* if (formData.nombre != "") */
      (async () => {
         //  console.log("first tel:", tel);
         await checkPhone(tel);
      })();
   }, []);

   if (formData.nombre == "")
      return <Loading open={isLoading} animation="bounce" />;

   // console.log("🚀 ~ App ~ authorized:", authorized);
   // console.log("🚀 ~ App ~ isLoading:", isLoading);
   if (!isLoading && !authorized)
      return (
         <>
            <p>sin invitacion</p>
         </>
      );

   // dark:from-slate-900 dark:to-slate-800
   return (
      <>
         {/* <SplashLoader
            weddingInfo={weddingInfo}
            show={showSplash}
            setShow={setShowSplash}
            setIsPlaying={setIsPlaying}
            formData={formData}
            setFormData={setFormData}
         /> */}

         {/* {!showSplash && (
            <> */}

         <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            ref={mainRef}
            className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 transition-colors duration-500 max-w-[100vw] overflow-x-hidden relative">
            {/* Enlace visible solo para staff/recepción */}
            {/* <div className="fixed bottom-10 left-4 z-50">
                     <Link
                        to="/validar"
                        className="btn btn-outline btn-sm btn-primary opacity-70 hover:opacity-100"
                        title="Ir a Validar QR">
                        Validar QR
                     </Link>
                  </div> */}
            {/* <!-- Elementos decorativos laterales --> */}
            {/* <div className="decorative-element top-left"></div>
                  <div className="decorative-element top-right"></div>
                  <div className="decorative-element middle-left"></div>
                  <div className="decorative-element middle-right"></div>
                  <div className="decorative-element bottom-left"></div>
                  <div className="decorative-element bottom-right"></div> */}

            {/* Botones flotantes */}
            <div className="fixed top-4 right-6 z-50 flex gap-2">
               {/* <AudioPlayer
                  audios={[audios.bailando, audios.todoVaAEstarBien]}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
               /> */}
               <ThemeChanger />
            </div>

            {/* Contador sticky */}
            {/* <AnimatePresence>
               {isScrolled && (
                  <motion.div
                     initial={{ opacity: 0, scale: 0.8, x: -100 }}
                     animate={{ opacity: 1, scale: 1, x: 0 }}
                     exit={{ opacity: 0, scale: 0.8, x: -100 }}
                     className="fixed top-4 left-4 z-50">
                     <CountdownTimer targetDate={weddingDate} isSticky={true} />
                  </motion.div>
               )}
            </AnimatePresence> */}

            {/* Encabezado */}
            <InvitationCard
               nameEvent={nameEvent}
               bride={girlfriend}
               groom={boyfriend}
               weddingDate={formattedDate}
               weddingTime={formattedTime}
               weddingPlace={weddingPlace}
               location={location}
               option={1}
               onConfirmClick={handleClickConfirm}
            />

            {/* Sección de Código de Vestimenta */}
            <section className=" relative">
               <InvitationHeader
                  guestName={formData.nombre}
                  relationship={formData.puesto}
                  eventName={weddingInfo.nameEvent}
                  backgroundImage={images.hero}
                  decorativeElements={false}
               />
            </section>

            {/* Sección de cuenta regresiva */}
            {/* <section className="py-10 px-6 relative bg-base-100">
               <div className="max-w-4xl mx-auto">
                  <motion.div
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8 }}
                     viewport={{
                        once: false,
                        margin: isMobile ? "0px" : "-25% 0px",
                     }}>
                     <CountdownTimer targetDate={weddingDate} />
                  </motion.div>
               </div>
            </section> */}

            {/* Sección de historia */}
            {/* <section className="py-20 px-6 relative">
                     <LoveHistory />
                  </section> */}

            {/* Sección de Fotografias */}
            {/* <section className="py-10 px-6 relative bg-base-100"> */}
            {/* <secction className={`min-h-screen absolute`}> */}
            {/* <PhotosThrown
                     photos={photos}
                     title="Aventando Nuestros Recuerdos"
                     subtitle={`${photos.length} momentos especiales volando hacia la mesa`}
                     // sectionHeight="auto" // Se calcula automáticamente basado en número de fotos
                     sectionHeight="2000vh"
                     animationSpeed={0.05} // Más rápido para muchas fotos
                     photoSizes={{
                        minWidth: 100,
                        maxWidth: 180,
                        minHeight: 100,
                        maxHeight: 200,
                     }}
                     floatingTexts={customTexts}
                     finalMessage={{
                        title: "♥ Recuerdos que avivan nuestro amor",
                        description: `cada memoria un tesoro de nuestra historia juntos.`,
                     }}
                     backgroundImage={images.bgTable}
                  /> */}
            {/* </secction> */}

            {/* Sección de Linea de tiempo */}
            {/* <section className="py-20 px-6 bg-base-100 relative">
                     <TimelineBoda weddingInfo={weddingInfo} />
                  </section> */}

            {/* Sección de detalles */}
            <section className="py-5 px-6 bg-base-100 relative">
               <DetailsEvent
                  formattedDate={formattedDate}
                  formattedTime={formattedTime}
                  googleCalendarUrl={googleCalendarUrl}
                  weddingPlace={weddingPlace}
                  weddingDate={weddingDate}
                  location={location}
                  googleMapsUrl={googleMapsUrl}
               />
            </section>

            {/* Sección de mesa de regalos */}
            {/* <section className="py-20 px-6  bg-base-100 relative">
                     <GiftTable giftRegistryUrls={giftRegistryUrls} />
                  </section> */}

            {/* Sección de Código de Vestimenta */}
            {/* <section className="py-20 px-6 bg-base-100 relative">
               <DressCode />
            </section> */}

            {/* Sección de Consideraciones */}
            {/* <section className="py-20 px-6 relative">
               <Considerations />
            </section> */}

            {/* Sección de RSVP */}
            {/* <section className="py-20 px-6 bg-base-100 relative" ref={rsvpRef}>
               <RsvpForm weddingInfo={weddingInfo} />
            </section> */}
            <section className="py-5 px-6 relative" ref={rsvpRef}>
               <ConfirmationForm
                  eventName={weddingInfo.nameEvent}
                  formData={formData}
                  // onSubmit={(data) => {
                  //    // Enviar datos a tu API
                  //    console.log("Datos confirmados:", data);
                  // }}
               />
            </section>

            <section
               className="py-5 px-6 bg-base-200/50 relative"
               ref={rsvpRef}>
               <ContactSection weddingInfo={weddingInfo} />
            </section>

            {/* Footer */}
            <footer className="py-2 px-6 text-center font-zapf-roman bg-base-200">
               {/* <p className="">Atentamente,</p>
               <h2 className="font-zapf-roman text-sm mb-4 text-primary">
                  {girlfriend} {boyfriend && `& ${boyfriend}`}
               </h2> */}
               <p className="text-sm font-zapf-roman">
                  &copy; 2025 | Diseñado con ♥ | R. Ayuntamiento de Gómez
                  Palacio | {env.VERSION}
               </p>
            </footer>

            {/* Botón para volver arriba */}
            <ScrollToTopButton />
         </motion.header>

         {/* </>
         )} */}
      </>
   );
}
