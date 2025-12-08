import React, { useState } from "react";

interface LinkServiceOptionsProps {
   type: "calendar" | "maps";
   calendarUrl?: string | null;
   mapsUrl?: string | null;
   theDate?: string | "";
   place?: string | "";
}

const LinkServiceOptions: React.FC<LinkServiceOptionsProps> = ({
   type,
   calendarUrl = "",
   mapsUrl = "",
   theDate = "",
   place = "",
}) => {
   const services = {
      calendar: {
         "Google Calendar": calendarUrl,
         "Apple Calendar": calendarUrl?.replace("https://", "webcal://"),
         Outlook: `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=Evento&startdt=${theDate}&location=${place}`,
      },
      maps: {
         "Google Maps": mapsUrl,
         "Apple Maps": `maps://?q=${encodeURIComponent(place)}`,
         Waze: `https://www.waze.com/ul?q=${encodeURIComponent(place)}`,
      },
   };

   return (
      <>
         {/* Open the modal using document.getElementById('ID').showModal() method */}
         <button
            className="btn btn-outline rounded-full btn-primary"
            onClick={() => {
               const dialog = document.getElementById(
                  `my_modal_2_${type}`,
               ) as HTMLDialogElement | null;
               if (dialog instanceof HTMLDialogElement) dialog.showModal();
            }}>
            {type === "calendar" ? "Agregar al calendario" : "Como llegar"}
         </button>
         <dialog id={`my_modal_2_${type}`} className="modal">
            <div className="modal-box">
               <h3 className="font-bold text-lg">Selecciona una aplicación</h3>
               <p className="py-4">
                  {Object.entries(services[type]).map(([name, link]) => (
                     <button
                        className="btn btn-outline rounded-full btn-secondary mx-1 mb-1"
                        key={name}
                        onClick={() => {
                           if (link) {
                              window.open(link, "_blank");
                           }
                        }}>
                        {name}
                     </button>
                  ))}
               </p>
            </div>
            <form method="dialog" className="modal-backdrop">
               <button>x</button>
            </form>
         </dialog>
      </>
   );
};
export default LinkServiceOptions;
