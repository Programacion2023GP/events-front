import images from "../constants/images";
import { formatDatetime } from "../utils/formats";

const nameEvent = "100 Días";
const weddingDate = new Date("2025-12-13T13:00:00");
const weddingPlace = "Gimnasio Auditorio Centenario";
const location =
   "Ejército Nacional Mexicano, La Feria, 35049 Gómez Palacio, Dgo.";
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
const googleMapsUrl = "https://maps.app.goo.gl/DG93foPnxdiGsf677";

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
export const invitationData_100Dias = {
   imgPortada: images.portada,
   bgPortada: "bg-secondary",
   nameEvent: nameEvent,
   bannerLema: "despues",
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
   dressCode: "Casual",
   recomendacion:
      "Le recomendamos llegar 30 minutos antes de la hora señalada.",
   showConfirmationForm: true,
   showContactSection: true,
   API_MACRO:
      "https://script.google.com/macros/s/AKfycbxhzrCgMN_zMUke7Tpf9bh1nD3nl9YCrL6gze8F_JgcZ5jN7iHcpippv89yoF5x1X1kRA/exec",
};
