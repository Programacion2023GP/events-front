import images from "../constants/images";
import { formatDatetime } from "../utils/formats";

const nameEvent = "1er Informe de Gobierno";
const weddingDate = new Date("2026-08-26T13:00:00");
const weddingPlace = "Altozano";
const location =
   "Nueva Laguna, Carreteta la Unión Km 1.5, 35140 Gómez Palacio, Dgo.";
const organizers =
      "Dirección de Relaciones Públicas, R. Ayuntamiento de Gómez Palacio, Dgo.",
   boyfriend = "";

const formattedDate = formatDatetime(
   weddingDate,
   true,
   "dddd DD [de] MMMM [de] YYYY",
);

const formattedTime = formatDatetime(weddingDate, false, "HH:mm");

// Crear enlace para Google Calendar
const calendarUrl = `https://calendar.google.com/calendar/`;
const googleCalendarUrl = `${calendarUrl}render?action=TEMPLATE&text=Evento+de+${organizers}+&dates=${weddingDate
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
const googleMapsUrl = "https://maps.app.goo.gl/MM3qhQtVaRx9vsZ27";

const giftRegistryUrls = [
   {
      site: "Cimaco",
      link: "https://www.cimaco.com.mx/mesa-regalo/45392",
      image: images.cimaco,
      color: "white",
      type: "link",
   },
   {
      type: "transferencia",
      bankData: {
         banco: "BBVA",
         nombre: "Néstor Josue Puentes Inchaurregui",
         numeroTarjeta: "4152 3139 8353 6074",
         clabe: "012 078 02895772494 9",
         concepto: "Regalo boda de [Tu Nombre]",
         linkCobro: null,
      },
   },
];

/**
 *
 */
const invitationData = {
   imgPortada: images.portadaSesionSolemne,
   imgPortadaMovil: images.portadaSesionSolemneMovil,
   bgPortada: "bg-[#A0163D]",
   nameEvent: nameEvent,
   leyend: `El R. Ayuntamiento de Gómez Palacio, Dgo., tiene el honor de invitarle al evento del <br/>
      <strong>1er Informe de Gobierno</strong>.`,
   bannerLema: null,
   bannerInvitado: "despues", //antes o despues de la imagen de portada
   // bride: organizers,
   organizers: {
      department: "Dirección de Relaciones Públicas",
      email: "relaciones.publicas@gomezpalacio.gob.mx",
      direction: "Piso 1, Presidencia Municipal",
      link: "https://maps.app.goo.gl/wvHPmVAH3js23qEg7",
      sede: "Presidencia",
      tel: "87 11 75 10 00",
      ext: "Ext. 125 / Ext. 360",
   },
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
   dressCode: "Formal",
   recomendacion:
      "Le recomendamos llegar 30 minutos antes de la hora señalada.",
   showConfirmationForm: true,
   showContactSection: true,
   API_MACRO:
      "https://script.google.com/macros/s/AKfycbzAURtnAHjI0LBOCsrwC0V1uA0k-ZiHTwE2xvhA3A1XKKwrpUGUj44fxFs--BYsiyyTwQ/exec",
};
export default invitationData;
