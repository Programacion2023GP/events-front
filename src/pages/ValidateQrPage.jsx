import React from "react";
import ValidateQr from "../ValidateQr";
import { Link } from "react-router-dom";

export default function ValidateQrPage() {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-4">
         <div className="max-w-lg w-full bg-base-300/80 rounded-xl shadow-lg p-6 mb-6 border border-primary/20 hidden">
            <h1 className="text-2xl font-marcellus font-bold text-primary mb-2 text-center">
               Validación de Invitación
            </h1>
            <p className="text-base font-marcellus text-center mb-4 text-base-content/80">
               Escanea el código QR de la invitación para registrar la
               asistencia en la recepción.
               {/* <br />
               Solo personal autorizado debe usar esta sección.
               <br />
               Los datos se registrarán automáticamente en la hoja de respuestas
               de Google Sheets. */}
            </p>
            <div className="flex justify-center">
               <Link to="/" className="btn btn-outline btn-sm btn-primary">
                  Volver a la invitación
               </Link>
            </div>
         </div>
         <div className="w-full bg-base-100 rounded-xl shadow p-4">
            <ValidateQr />
         </div>
      </div>
   );
}
