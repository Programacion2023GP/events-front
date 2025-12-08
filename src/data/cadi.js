import images from "../constants/images";
// import { InvitationData } from "../types/types";
import { formatDatetime } from "../utils/formats";

const nameEvent =
   "Instalación del Consejo Asesor Para El Desarrollo E Inversiones Del Municipio De Gómez Palacio";
const weddingDate = new Date("2025-12-10T10:00:00");
const weddingPlace = "Salón de eventos Nuplen";
const location = "Calle Canatlán #305, Gómez Palacio, Durango";
const organizers = ", R. Ayuntamiento de Gómez Palacio, Dgo.",
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
const googleMapsUrl = "https://maps.app.goo.gl/BHHzN1znh1Jo3xRj7";

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

export const invitationData_cadi = {
   imgPortada: images.CADI.portada,
   bgPortada: "",
   nameEvent: nameEvent,
   bannerLema: "antes",
   organizers: {
      department: "Dirección de Desarrollo Económico",
      email: "desarrollo.economico@gomezpalacio.gob.mx",
      direction: "Oficinas de Expo Feria",
      link: "https://maps.app.goo.gl/YDFHSmjQaG6w4Bco6",
      sede: "Expo Feria",
      tel: "87 11 75 10 00",
      ext: "Ext. 125 / Ext. 360",
   },
   groom: boyfriend,
   date: formattedDate,
   time: formattedTime,
   theDate: weddingDate,
   fullDate: formattedDate,
   place: weddingPlace,
   location: location,
   calendarUrl: googleCalendarUrl,
   mapsUrl: googleMapsUrl,
   giftTable: giftRegistryUrls,
   dressCode: "Formal-Casual",
   recomendacion:
      "Le recomendamos llegar 30 minutos antes de la hora señalada.",
   showConfirmationForm: false,
   API_MACRO:
      "https://script.google.com/macros/s/AKfycbwDZseKZopchrSQcnc-MEmuN5gZurKpRLxr0AzrPJgsT8ajZmW3czANT2mmlVJZ0UyjqA/exec",
};
// export const cadiEventData: InvitationData = {
//    imgPortada: images.CADI.portada,
//    backgroundImage: "",
//    eventName: nameEvent,
//    eventType: "government",
//    organizers: {
//       department: "Dirección de Desarrollo Económico",
//       email: "relacionespublicas@coahuila.gob.mx",
//    },
//    hostName: boyfriend,
//    formattedDate: formattedDate,
//    formattedTime: formattedTime,
//    dateObject: weddingDate,
//    displayDate: formattedDate,
//    venue: weddingPlace,
//    location: {
//       place: weddingPlace,
//       address: location,
//       city: "Gómez Palacio",
//       state: "Durango",
//    },
//    calendarLink: googleCalendarUrl,
//    mapsLink: googleMapsUrl,
//    giftRegistry: giftRegistryUrls,
//    dressCode: "Formal-Casual",
//    recommendations: [
//       "Le recomendamos llegar 1 hora antes de la hora señalada.",
//    ],
//    showRSVP: false,
//    showGiftTable: true,
//    showCountdown: true,
//    apiEndpoint:
//       "https://script.google.com/macros/s/AKfycbwDZseKZopchrSQcnc-MEmuN5gZurKpRLxr0AzrPJgsT8ajZmW3czANT2mmlVJZ0UyjqA/exec",
//    createdAt: new Date(),
//    version: "1.0.0",
// };
