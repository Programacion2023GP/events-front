import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, User, Users, Mail, Phone, MessageSquare } from "lucide-react";
import { useMobile } from "../hooks/useMobile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvitationPDF from "./InvitationPDF";
import images from "../constants/images";

interface ConfirmationFormProps {
   guestName: string;
   eventName: string;
   onSubmit?: (data: ConfirmationData) => void;
}

export interface ConfirmationData {
   attendance: "confirmed" | "declined";
   confirmationType: "titular" | "asistente";
   fullName: string;
   email: string;
   phone: string;
   message?: string;
   guestCount?: number;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
   guestName,
   eventName,
   onSubmit,
}) => {
   const isMobile = useMobile();
   const [formData, setFormData] = useState<ConfirmationData>({
      attendance: "confirmed",
      confirmationType: "titular",
      fullName: "",
      email: "",
      phone: "",
      message: "",
      guestCount: 1,
   });

   const [isSubmitted, setIsSubmitted] = useState(false);

   const handleInputChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleRadioChange = (name: keyof ConfirmationData, value: string) => {
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Aquí puedes enviar los datos a tu API
      console.log("Datos de confirmación:", formData);

      if (onSubmit) {
         onSubmit(formData);
      }

      setIsSubmitted(true);
   };

   if (isSubmitted) {
      return (
         <div className="max-w-2xl mx-auto px-4 py-16">
            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
               className="text-center">
               <div className="bg-success/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-success" />
               </div>
               <h3 className="font-anodina-bold text-2xl md:text-3xl text-success mb-4">
                  ¡Confirmación Recibida!
               </h3>
               <p className="font-avenir-roman text-base-content/75 text-lg mb-6">
                  Gracias por confirmar su asistencia al evento.
                  <br />
                  Nos vemos pronto.
               </p>
               <div className="bg-base-200 rounded-2xl p-6 max-w-md mx-auto">
                  <p className="font-anodina-bold text-primary">{guestName}</p>
                  <p className="font-avenir-roman text-base-content/60">
                     {eventName}
                  </p>
                  <p className="font-avenir-light text-sm text-base-content/50 mt-2">
                     {formData.attendance === "confirmed" ? (
                        <>
                           <p>Asistencia confirmada</p>
                           <div className="text-center animate-pulse">
                              <PDFDownloadLink
                                 document={
                                    <InvitationPDF
                                       name={"formData.name"}
                                       weddingInfo={"weddingInfo"}
                                       qrValue={"guestCode"}
                                       // guests={"guests"}
                                       guests={0}
                                       table={0}
                                       // table={"formData.attendance == "no" ? 0 : table"}
                                       backgroundImage={images.fondoInvitacion}
                                    />
                                 }
                                 fileName={`Invitacion_${formData.attendance.replaceAll(
                                    " ",
                                    "_",
                                 )}.pdf`}
                                 className="btn btn-outline btn-primary btn-xl font-zapf-bold">
                                 {({ loading }) =>
                                    loading
                                       ? "Generando invitación..."
                                       : "🎟️ DESCARGAR INVITACIÓN"
                                 }
                              </PDFDownloadLink>
                           </div>
                        </>
                     ) : (
                        "Lamentamos que no pueda asistir"
                     )}
                  </p>
               </div>
               {/* {formData.attendance == "yes" && guestCode && ( 
               // <motion.div
               //    initial={{ opacity: 0, scale: 0, y: 50 }}
               //    whileInView={{ opacity: 1, scale: 1 }}
               //    transition={{
               //       duration: 0.3,
               //    }}>*/}
            </motion.div>
         </div>
      );
   }

   return (
      <div className="max-w-4xl mx-auto px-4 py-16">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, margin: isMobile ? "0px" : "-25% 0px" }}
            className="text-center mb-12">
            <div className="flex justify-center mb-4">
               <Check className="h-12 w-12 text-primary/75" />
            </div>
            <h2 className="font-zapf-roman font-black text-2xl md:text-4xl mb-2 text-primary">
               Confirmación de Asistencia
            </h2>
            <motion.div
               initial={{ opacity: 0, scale: 0, x: 50 }}
               whileInView={{ opacity: 1, scale: 1, x: 0 }}
               transition={{ delay: 0.5, duration: 1, type: "spring" }}
               className="mb-6">
               <div className="h-0.5 bg-primary/30 mx-auto max-w-xs"></div>
            </motion.div>
            <p className="font-zapf-roman leading-relaxed max-w-3xl mx-auto text-base-content/75">
               Por favor, confirme su asistencia al evento antes de la fecha
               indicada.
            </p>
         </motion.div>

         <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto">
            {/* Sección: Confirmación de asistencia */}
            <div className="bg-base-200 rounded-2xl p-6 mb-8">
               <h3 className="font-anodina-bold text-xl text-primary mb-4 flex items-center gap-3">
                  <Check className="h-5 w-5" />
                  ¿Podrá asistir al evento?
               </h3>

               <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <label className="flex-1 cursor-pointer">
                     <input
                        type="radio"
                        name="attendance"
                        value="confirmed"
                        checked={formData.attendance === "confirmed"}
                        onChange={() =>
                           handleRadioChange("attendance", "confirmed")
                        }
                        className="hidden"
                     />
                     <div
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                           formData.attendance === "confirmed"
                              ? "border-success bg-success/10 text-success"
                              : "border-base-300 bg-base-100 hover:border-primary/50"
                        }`}>
                        <div className="font-anodina-bold text-lg mb-1">
                           Sí, asistiré
                        </div>
                        <div className="font-avenir-light text-sm">
                           Confirmar presencia
                        </div>
                     </div>
                  </label>

                  <label className="flex-1 cursor-pointer">
                     <input
                        type="radio"
                        name="attendance"
                        value="declined"
                        checked={formData.attendance === "declined"}
                        onChange={() =>
                           handleRadioChange("attendance", "declined")
                        }
                        className="hidden"
                     />
                     <div
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                           formData.attendance === "declined"
                              ? "border-error bg-error/10 text-error"
                              : "border-base-300 bg-base-100 hover:border-primary/50"
                        }`}>
                        <div className="font-anodina-bold text-lg mb-1">
                           No podré asistir
                        </div>
                        <div className="font-avenir-light text-sm">
                           Lamentablemente declino
                        </div>
                     </div>
                  </label>
               </div>

               {/* Solo mostrar opciones adicionales si confirma asistencia */}
               {formData.attendance === "confirmed" && (
                  <>
                     <div className="border-t border-base-300 pt-6 mb-6">
                        <h4 className="font-anodina-bold text-lg text-primary mb-4 flex items-center gap-3">
                           <Users className="h-5 w-5" />
                           Tipo de confirmación
                        </h4>

                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                           <label className="flex-1 cursor-pointer">
                              <input
                                 type="radio"
                                 name="confirmationType"
                                 value="titular"
                                 checked={
                                    formData.confirmationType === "titular"
                                 }
                                 onChange={() =>
                                    handleRadioChange(
                                       "confirmationType",
                                       "titular",
                                    )
                                 }
                                 className="hidden"
                              />
                              <div
                                 className={`p-4 rounded-xl border-2 text-center transition-all ${
                                    formData.confirmationType === "titular"
                                       ? "border-primary bg-primary/10 text-primary"
                                       : "border-base-300 bg-base-100 hover:border-primary/50"
                                 }`}>
                                 <User className="h-6 w-6 mx-auto mb-2" />
                                 <div className="font-anodina-bold">
                                    Titular
                                 </div>
                                 <div className="font-avenir-light text-sm">
                                    Confirmo por mí mismo
                                 </div>
                              </div>
                           </label>

                           <label className="flex-1 cursor-pointer">
                              <input
                                 type="radio"
                                 name="confirmationType"
                                 value="asistente"
                                 checked={
                                    formData.confirmationType === "asistente"
                                 }
                                 onChange={() =>
                                    handleRadioChange(
                                       "confirmationType",
                                       "asistente",
                                    )
                                 }
                                 className="hidden"
                              />
                              <div
                                 className={`p-4 rounded-xl border-2 text-center transition-all ${
                                    formData.confirmationType === "asistente"
                                       ? "border-primary bg-primary/10 text-primary"
                                       : "border-base-300 bg-base-100 hover:border-primary/50"
                                 }`}>
                                 <Users className="h-6 w-6 mx-auto mb-2" />
                                 <div className="font-anodina-bold">
                                    Asistente
                                 </div>
                                 <div className="font-avenir-light text-sm">
                                    Confirmo en representación
                                 </div>
                              </div>
                           </label>
                        </div>
                     </div>

                     {/* Número de acompañantes */}
                     {/* <div className="mb-6">
                        <label className="font-avenir-roman text-base-content/75 mb-2 block">
                           Número de personas que asistirán (incluyéndose)
                        </label>
                        <select
                           name="guestCount"
                           value={formData.guestCount}
                           onChange={handleInputChange}
                           className="select select-bordered w-full max-w-xs">
                           {[1, 2, 3, 4, 5, 6].map((num) => (
                              <option key={num} value={num}>
                                 {num} persona{num > 1 ? "s" : ""}
                              </option>
                           ))}
                        </select>
                     </div> */}
                  </>
               )}
            </div>

            {/* Información de contacto */}
            {/* <div className="bg-base-200 rounded-2xl p-6 mb-8">
               <h3 className="font-anodina-bold text-xl text-primary mb-6 flex items-center gap-3">
                  <User className="h-5 w-5" />
                  Información de contacto
               </h3>

               <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="form-control">
                     <label className="label">
                        <span className="font-avenir-roman text-base-content/75">
                           Nombre completo *
                        </span>
                     </label>
                     <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered"
                        placeholder="Ingrese su nombre completo"
                     />
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="font-avenir-roman text-base-content/75">
                           Correo electrónico *
                        </span>
                     </label>
                     <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-base-content/30" />
                        <input
                           type="email"
                           name="email"
                           value={formData.email}
                           onChange={handleInputChange}
                           required
                           className="input input-bordered pl-10 w-full"
                           placeholder="ejemplo@correo.com"
                        />
                     </div>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                     <label className="label">
                        <span className="font-avenir-roman text-base-content/75">
                           Teléfono *
                        </span>
                     </label>
                     <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-base-content/30" />
                        <input
                           type="tel"
                           name="phone"
                           value={formData.phone}
                           onChange={handleInputChange}
                           required
                           className="input input-bordered pl-10 w-full"
                           placeholder="(000) 000-0000"
                        />
                     </div>
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="font-avenir-roman text-base-content/75">
                           Mensaje adicional (opcional)
                        </span>
                     </label>
                     <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-base-content/30" />
                        <input
                           type="text"
                           name="message"
                           value={formData.message}
                           onChange={handleInputChange}
                           className="input input-bordered pl-10 w-full"
                           placeholder="Comentarios o observaciones"
                        />
                     </div>
                  </div>
               </div>
            </div> */}

            {/* Botón de envío */}
            <motion.button
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               type="submit"
               className="btn btn-primary btn-lg w-full max-w-md mx-auto flex items-center gap-2">
               <Check className="h-5 w-5" />
               Confirmar Asistencia
            </motion.button>

            <p className="text-center text-base-content/50 text-sm mt-4">
               Al confirmar, acepta los términos y condiciones del evento.
            </p>
         </motion.form>
      </div>
   );
};

export default ConfirmationForm;
