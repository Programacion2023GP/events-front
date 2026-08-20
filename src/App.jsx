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
import { Shield, AlertCircle, Home, Mail } from "lucide-react";

export default function App({ invitationData }) {
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
      ya_confirmo: "",
   });

   useEffect(() => {
      setIsLoading(false);
   }, [themeActive]);

   useEffect(() => {
      const handleScroll = () => {
         const scrollPosition = window.scrollY;
         setIsScrolled(scrollPosition > 500);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   //#region Variables

   //#endregion

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
   const [validationChecked, setValidationChecked] = useState(false);
   const [demo, setDemo] = useState(false);

   const { tel } = useParams();

   useEffect(() => {
      const baseTitle = "Invitación GPD";
      const eventName = invitationData?.nameEvent;
      document.title = eventName ? `${baseTitle} | ${eventName}` : baseTitle;
   }, [invitationData?.nameEvent]);

   const checkPhone = async (tel) => {
      if (!tel || tel.length < 10) {
         setValidationChecked(true);
         if (tel === "8700000000") setDemo(true);
         return;
      }

      try {
         setIsLoading(true);
         if (demo) {
            setAuthorized(true);
            setFormData(...formData, {
               autorizado: true,
               guestCode: "000",
               nombre: "A QUIEN CORRESPONDA",
               puesto: "Director General",
               telefono: "8700000000",
            });
            return;
         }
         const res = await fetch(
            `${invitationData.API_MACRO}?telefono=${tel}&action=getGuest`,
         );
         const data = await res.json();

         setAuthorized(data.autorizado);
         if (data.autorizado) {
            setFormData({
               ...formData,
               ...data,
            });
         }
      } catch (error) {
         console.error("Error validando teléfono:", error);
      } finally {
         setIsLoading(false);
         setValidationChecked(true);
      }
   };

   useEffect(() => {
      if (tel) {
         checkPhone(tel);
      } else {
         setValidationChecked(true);
      }
   }, [tel]);

   // Componente para pantalla de no autorizado
   const UnauthorizedView = () => (
      <div className="min-h-screen bg-gradient-to-b from-base-100/25 to-base-100 flex items-center justify-center px-4">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md w-full text-center">
            {/* Icono de alerta */}
            <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.3, type: "spring" }}
               className="flex justify-center mb-6">
               <div className="bg-error/20 p-6 rounded-full">
                  <Shield className="h-16 w-16 text-error" />
               </div>
            </motion.div>

            {/* Título y mensaje */}
            <h1 className="font-marcellus text-3xl md:text-4xl text-error mb-4">
               Acceso No Autorizado
            </h1>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="space-y-4 mb-8">
               <p className="font-anodina-regular text-base-content/75 text-lg">
                  Lo sentimos, pero no encontramos una invitación asociada a
                  este link.
               </p>
               <p className="font-avenir-light text-base-content/60">
                  Si crees que esto es un error, por favor contacta a los
                  anfitriones del evento.
               </p>
            </motion.div>

            {/* Información de contacto */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.7 }}
               className="bg-base-100 rounded-2xl p-6 mb-6 border border-base-300/50">
               <h3 className="font-anodina-bold text-primary mb-4 flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contacto
               </h3>
               <p className="font-avenir-roman text-base-content/75">
                  {invitationData.organizers.department}
               </p>
               <p className="font-avenir-light text-base-content/60 text-sm mt-2">
                  {invitationData.organizers.email}
               </p>
            </motion.div>

            {/* Acciones */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.9 }}
               className="flex flex-col sm:flex-row gap-4 justify-center">
               {/* <Link
                  to="/"
                  className="btn btn-primary btn-outline rounded-full flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Página Principal
               </Link> */}
               <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary rounded-full flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Reintentar
               </button>
            </motion.div>

            {/* Footer */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.1 }}
               className="mt-8 pt-6 border-t border-base-300/30">
               <p className="text-sm font-zapf-roman text-base-content/50">
                  &copy; {formatDatetime(invitationData.theDate, false, "YYYY")}{" "}
                  | R. Ayuntamiento de Gómez Palacio
               </p>
            </motion.div>
         </motion.div>
      </div>
   );

   // Mostrar loading mientras se valida
   if (isLoading || !validationChecked) {
      return <Loading open={true} animation="typing" />;
      // <InvitationCard
      //    nameEvent={invitationData.nameEvent}
      //    organizers={invitationData.organizers}
      //    groom={invitationData.groom}
      //    theDate={invitationData.date}
      //    time={invitationData.time}
      //    place={invitationData.place}
      //    location={invitationData.location}
      //    imgPortada={invitationData.imgPortada}
      //    bgPortada={invitationData.bgPortada}
      //    option={1}
      //    onConfirmClick={handleClickConfirm}
      // />
   }

   // Mostrar pantalla de no autorizado
   if (!authorized) {
      return <UnauthorizedView />;
   }

   // Si está autorizado, mostrar la aplicación normal
   return (
      <>
         <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            ref={mainRef}
            className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 transition-colors duration-500 max-w-[100vw] overflow-x-hidden relative">
            {/* Botones flotantes */}
            <div className="fixed top-4 right-6 z-50 flex gap-2">
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
                     <CountdownTimer targetDate={theDate} isSticky={true} />
                  </motion.div>
               )}
            </AnimatePresence> */}

            {/* Sección de Invitación Personalizada */}
            {invitationData.bannerInvitado === "antes" && (
               <section className="bg-base-100 relative">
                  <InvitationHeader
                     guestName={formData.nombre}
                     relationship={formData.puesto}
                     eventName={invitationData.nameEvent}
                     backgroundImage={images.hero}
                     decorativeElements={false}
                     bannerLema={invitationData.bannerLema}
                     bannerInvitado={invitationData.bannerInvitado}
                     showCaption={invitationData.showCaption}
                     leyend={invitationData.leyend}
                  />
               </section>
            )}

            {/* Encabezado */}
            <InvitationCard
               nameEvent={invitationData.nameEvent}
               organizers={invitationData.organizers}
               groom={invitationData.groom}
               theDate={invitationData.date}
               time={invitationData.time}
               place={invitationData.place}
               location={invitationData.location}
               imgPortada={
                  isMobile && invitationData.imgPortadaMovil != null
                     ? invitationData.imgPortadaMovil
                     : invitationData.imgPortada
               }
               bgPortada={invitationData.bgPortada}
               option={1}
               onConfirmClick={handleClickConfirm}
               textContent={invitationData.textContentPortada}
            />

            {invitationData.bannerInvitado === "despues" && (
               <section className="py-5 px-6 relative">
                  <InvitationHeader
                     guestName={formData.nombre}
                     relationship={formData.puesto}
                     eventName={invitationData.nameEvent}
                     backgroundImage={images.hero}
                     decorativeElements={false}
                     bannerLema={invitationData.bannerLema}
                     bannerInvitado={invitationData.bannerInvitado}
                     showCaption={invitationData.showCaption}
                     leyend={invitationData.leyend}
                  />
               </section>
            )}

            {/* Sección de detalles */}
            <section className="py-5 px-6 bg-base-100 relative">
               <img
                  src={images.logoGris}
                  alt="Logo Gris"
                  className={`absolute ${isMobile ? "h-6/12" : "h-15/12 translate-y-[-25%]"} -translate-y-4 translate-x-[-50%] opacity-25`}
               />
               <DetailsEvent
                  date={invitationData.date}
                  time={invitationData.time}
                  googleCalendarUrl={invitationData.googleCalendarUrl}
                  place={invitationData.place}
                  theDate={invitationData.theDate}
                  location={invitationData.location}
                  googleMapsUrl={invitationData.mapsUrl}
                  dressCode={invitationData.dressCode}
                  recomendacion={invitationData.recomendacion}
               />
               <img
                  src={images.logoPrimerInforme}
                  alt="Logo 1 Informe"
                  className={`absolute right-0 ${isMobile ? "h-6/12 translate-y-[-83%]" : "h-15/12 "}  translate-x-[8%] opacity-10`}
               />
            </section>

            {/* Sección de Confirmación */}
            {invitationData.showConfirmationForm && (
               <section className="py-5 px-6 relative" ref={rsvpRef}>
                  <ConfirmationForm
                     eventName={invitationData.nameEvent}
                     showDownloadTicket={
                        invitationData.showDownloadTicket ?? false
                     }
                     formData={formData}
                     setFormData={setFormData}
                     API_MACRO={invitationData.API_MACRO}
                     // onSubmit={(data) => {
                     //    console.log("Datos confirmados:", data);
                     // }}
                  />
               </section>
            )}

            {/* Sección de Contacto */}
            {invitationData.showContactSection && (
               <section className="py-5 px-6 bg-base-200/50 relative">
                  <ContactSection invitationData={invitationData} />
               </section>
            )}

            {/* Footer */}
            <footer className="py-2 px-6 text-center font-zapf-roman bg-base-200">
               <p className="text-sm font-zapf-roman">
                  &copy; {formatDatetime(invitationData.theDate, false, "YYYY")}{" "}
                  {invitationData.showFooter &&
                     `| Diseñado con ♥ | R. Ayuntamiento de Gómez
                  Palacio`}{" "}
                  | {env.VERSION}
               </p>
            </footer>

            {/* Botón para volver arriba */}
            <ScrollToTopButton />
         </motion.header>
      </>
   );
}
