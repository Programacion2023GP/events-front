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
const calendarUrl = `https://calendar.google.com/calendar/`;
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
const googleMapsUrl = "https://maps.app.goo.gl/hXjwuD8yCn4rfRHi9";

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
