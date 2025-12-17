import images from "../constants/images";
import { formatDatetime } from "../utils/formats";

const nameEvent = "Posada";
const weddingDate = new Date("2025-12-20T14:30:00");
const weddingPlace = "Centro de Conveciones Expo Feria";
const location =
  "Ejército Nacional Mexicano, La Feria, 35049 Gómez Palacio, Dgo.";
const organizers = "",
  boyfriend = "";

const formattedDate = formatDatetime(
  weddingDate,
  true,
  "dddd DD [de] MMMM [de] YYYY"
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
    15
  )}00Z&details=¡Estamos+emocionados+de+contar+contigo!&location=${weddingPlace.replace(
  " ",
  "+"
)},+${location.replace(" ", "+")}&sf=true&output=xml`;

// Crear enlace para Google Maps
const googleMapsUrl = "https://maps.app.goo.gl/E2CW3w9h8GNeHHmr9";

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
export const invitationData_posada = {
  imgPortada: images.portada,
  bgPortada: "bg-secondary",
  textContentPortada:
    "Tu amiga Betzabé Martínez te invita a la Posada Amigos de Betza",
  nameEvent: nameEvent,
  bannerLema: "",
  showCaption: false,
  // bride: organizers,
  organizers: {
    department: "",
    email: "",
    direction: "",
    link: "",
    sede: "",
    tel: "",
    ext: "",
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
  recomendacion: "Invitación personal no transferible",
  showConfirmationForm: false,
  showContactSection: false,
  showFooter: false,
  API_MACRO:
    "https://script.google.com/macros/s/AKfycbwA3XbvylvMAGCfS0qrrmRyIiykEKBmd6J8-fVrUw6rlhzctSAXnc8aUPf5wgrFEdoK/exec",
};
