import React, { useState } from "react";
import { motion } from "framer-motion";
import {
   Check,
   User,
   Users,
   Mail,
   telefono,
   MessageSquare,
   Download,
   Edit,
} from "lucide-react";
import { useMobile } from "../hooks/useMobile";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvitationPDF from "./InvitationPDF";
import images from "../constants/images";
import { useGlobalContext } from "../contexts/GlobalContext";
import env from "../constants/env";

export interface IFormData {
   autorizado: boolean;
   guestCode: string;
   nombre: string;
   puesto: string;
   telefono: string;
   asistencia: "confirmed" | "declined";
   seccion: string;
   asiento: string;
   ya_confirmo: string;
   timeStamp: string;
   confirmationType?: "titular" | "asistente";
}
interface ConfirmationFormProps {
   eventName: string;
   formData: IFormData;
   setFormData: (updater: (prev: IFormData) => IFormData) => void;
   onSubmit?: (data: IFormData) => void;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = ({
   eventName,
   formData,
   setFormData,
   onSubmit,
}) => {
   const isMobile = useMobile();
   const { setIsLoading } = useGlobalContext();
   const [showButtonDownload, setShowButtonDownload] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleInputChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
   ) => {
      const { name, value } = e.target;
      setFormData((prev: IFormData) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleRadioChange = (name: keyof IFormData, value: string) => {
      setFormData((prev: IFormData) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Aquí puedes enviar los datos a tu API
      // console.log("Datos de confirmación:", formData);
      // return;
      // setShowButtonDownload(false);
      if (formData.telefono.length < 10) return;
      try {
         // setIsLoading(true);
         setIsSubmitting(true);

         const res = await fetch(
            `${env.API_MACRO}?telefono=${
               formData.telefono
            }&action=${"registerRequest"}&nombre=${encodeURIComponent(
               formData.nombre,
            )}&puesto=${encodeURIComponent(
               formData.puesto,
            )}&asistencia=${encodeURIComponent(
               formData.asistencia,
            )}&seccion=${encodeURIComponent(
               formData.seccion,
            )}&asiento=${encodeURIComponent(formData.asiento)}`,
         );

         // const res = await fetch(
         //    `${env.API_MACRO}?telefono=${formData.telefono}

         //    &action=registerRequest`,
         // );
         const data = await res.json();
         // console.log("🚀 ~ checktelefono ~ data:", data);
         if (data.success) {
            setFormData(data.rowData);
            // setErrorMsg("");
         } else {
            // setErrorMsg("Este número no está autorizado.");
         }
         setIsSubmitting(false);
         // setIsLoading(false);
      } catch (e) {
         console.log("error", e);
         // setErrorMsg("Error validando el teléfono.");
      } finally {
         setIsSubmitting(false);
         // setIsLoading(false);
      }

      // console.log("🚀 ~ handleSubmit ~ onSubmit:", onSubmit);
      // if (onSubmit) {
      //    console.log("entro al onSubimit?");
      //    onSubmit(formData);
      // }

      setIsSubmitting(true);
   };

   if (isSubmitting) {
      return (
         <div className="max-w-2xl mx-auto px-4">
            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
               className="text-center">
               <div className="bg-success/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-10 w-10 text-success" />
               </div>
               <h3 className="font-anodina-bold text-2xl md:text-3xl text-success mb-2">
                  ¡Confirmación Recibida!
               </h3>
               <p className="font-avenir-roman text-base-content/75 text-lg mb-4">
                  Gracias por confirmar su asistencia al evento.
                  <br />
                  Nos vemos pronto.
               </p>
               <div className="bg-base-200 rounded-2xl p-6 max-w-md mx-auto">
                  <p className="font-anodina-bold text-primary">
                     {formData.nombre}
                  </p>
                  <p className="font-avenir-roman text-base-content/60">
                     {eventName}
                  </p>
                  <p className="font-avenir-light text-sm text-base-content/50 mt-2">
                     {formData?.asistencia === "confirmed" ? (
                        <>
                           <p>Asistencia confirmada</p>
                           <div className="text-center animate-pulse">
                              <PDFDownloadLink
                                 document={
                                    <InvitationPDF
                                       name={"formData.name"}
                                       weddingInfo={"weddingInfo"}
                                       formData={formData}
                                       // table={"formData?.asistencia == "no" ? 0 : table"}
                                       backgroundImage={images.fondoInvitacion}
                                    />
                                 }
                                 fileName={`Invitacion_${formData.nombre
                                    .toString()
                                    .replaceAll(" ", "_")}.pdf`}
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
               {/* {formData?.asistencia == "confirmed" && guestCode && ( 
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
      <div className="max-w-4xl mx-auto px-4">
         {formData.ya_confirmo ? (
            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6 }}
               className="max-w-2xl mx-auto text-center">
               <div className="bg-success/20 rounded-2xl p-8 mb-6 border border-success/30">
                  <div className="flex justify-center mb-4">
                     <div className="bg-success/20 p-4 rounded-full">
                        <Check className="h-12 w-12 text-success" />
                     </div>
                  </div>

                  <h3 className="font-anodina-bold text-2xl text-success mb-4">
                     ¡Confirmación Recibida!
                  </h3>

                  <div className="space-y-4 mb-6">
                     <p className="font-avenir-roman text-base-content/80 text-lg">
                        Gracias{" "}
                        <span className="font-anodina-bold text-primary">
                           {formData?.nombre}
                        </span>
                        , hemos registrado su confirmación para el evento.
                     </p>

                     <div className="bg-base-100 rounded-xl p-4 border border-base-300/50">
                        <p className="font-avenir-light text-base-content/70">
                           Estamos preparando todo para recibirle el día del
                           evento.
                        </p>
                     </div>
                  </div>

                  {/* Recordatorio importante del pase */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3 }}
                     className="bg-warning/10 rounded-xl p-6 border border-warning/20">
                     <div className="flex items-center gap-3 mb-3">
                        <Download className="h-6 w-6 text-secondary" />
                        <h4 className="font-anodina-bold text-secondary text-lg">
                           Recordatorio Importante
                        </h4>
                     </div>

                     <p className="font-avenir-roman text-base-content/80 mb-3">
                        <strong>
                           No olvide descargar y llevar su pase de acceso
                        </strong>{" "}
                        el día del evento.
                     </p>

                     <p className="font-avenir-light text-base-content/70 text-sm mb-4">
                        El pase será requerido para ingresar al recinto. Puede
                        descargarlo desde el enlace que se le proporcionó.
                     </p>

                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-secondary btn-outline rounded-full">
                        <PDFDownloadLink
                           document={
                              <InvitationPDF
                                 name={"formData.name"}
                                 weddingInfo={"weddingInfo"}
                                 formData={formData}
                                 // table={"formData?.asistencia == "no" ? 0 : table"}
                                 backgroundImage={images.fondoInvitacion}
                              />
                           }
                           className="flex"
                           fileName={`Invitacion_${formData.nombre
                              .toString()
                              .replaceAll(" ", "_")}.pdf`}>
                           {({ loading }) =>
                              loading ? (
                                 "Generando invitación..."
                              ) : (
                                 <>
                                    <Download className="h-4 w-4 mr-2" />
                                    Descargar Mi Pase
                                 </>
                              )
                           }
                        </PDFDownloadLink>
                     </motion.button>
                  </motion.div>
               </div>

               {/* Botón para modificar confirmación */}
               {/* <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  // onClick={() => setIsSubmitted(false)}
                  className="btn btn-outline btn-primary rounded-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Modificar Mi Confirmación
               </motion.button> */}
            </motion.div>
         ) : (
            <>
               <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{
                     once: false,
                     margin: isMobile ? "0px" : "-25% 0px",
                  }}
                  className="text-center mb-12">
                  <div className="flex justify-center mb-2">
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
                     Por favor, confirme su asistencia al evento antes de la
                     fecha indicada.
                  </p>
               </motion.div>
               <motion.form
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  // onSubmit={handleSubmit}
                  className="max-w-2xl mx-auto">
                  {/* Sección: Confirmación de asistencia */}
                  <div className="bg-base-200 rounded-2xl p-6 mb-4">
                     <h3 className="font-anodina-bold text-xl text-primary mb-4 flex items-center gap-3">
                        <Check className="h-5 w-5" />
                        ¿Podrá asistir al evento?
                     </h3>

                     {/* Selector de asistencia */}
                     <div className="mb-6">
                        <select
                           name="asistencia"
                           value={formData?.asistencia}
                           onChange={handleInputChange}
                           className="select select-bordered w-full font-anodina-regular text-lg">
                           <option value="confirmed" selected>
                              Sí, asistiré - Confirmar presencia
                           </option>
                           <option value="declined">
                              No podré asistir - Lamentablemente declino
                           </option>
                        </select>
                     </div>

                     {/* Solo mostrar opciones adicionales si confirma asistencia */}
                     {formData?.asistencia === "confirmed" && (
                        <div className="border-t border-base-300 pt-6 mb-4">
                           <h4 className="font-anodina-bold text-lg text-primary mb-4 flex items-center gap-3">
                              <Users className="h-5 w-5" />
                              Tipo de confirmación
                           </h4>

                           {/* Selector de tipo de confirmación */}
                           <div className="mb-6">
                              <select
                                 name="confirmationType"
                                 value={formData.confirmationType}
                                 onChange={handleInputChange}
                                 className="select select-bordered w-full font-anodina-regular text-lg">
                                 <option value="titular">
                                    Titular - Confirmo por mí mismo
                                 </option>
                                 <option value="asistente">
                                    Asistente - Confirmo en representación
                                 </option>
                              </select>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Botón de envío */}
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     type="button"
                     onClick={handleSubmit}
                     className="btn btn-primary btn-lg w-full max-w-md mx-auto flex items-center gap-2">
                     <Check className="h-5 w-5" />
                     Confirmar Asistencia
                  </motion.button>

                  <p className="text-center text-base-content/50 text-sm mt-4">
                     Al confirmar, acepta los términos y condiciones del evento.
                  </p>
               </motion.form>
            </>
         )}

         {/* ↓ ↓ ↓ ↓ ↓ FORMULARIO NO HABILITADO ↓ ↓ ↓ ↓ ↓ */}
         <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto hidden">
            {/* Sección: Confirmación de asistencia */}
            <div className="bg-base-200 rounded-2xl p-6 mb-4">
               <h3 className="font-anodina-bold text-xl text-primary mb-4 flex items-center gap-3">
                  <Check className="h-5 w-5" />
                  ¿Podrá asistir al evento?
               </h3>

               <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <label className="flex-1 cursor-pointer">
                     <input
                        type="radio"
                        name="asistencia"
                        value="confirmed"
                        checked={formData?.asistencia === "confirmed"}
                        onChange={() =>
                           handleRadioChange("asistencia", "confirmed")
                        }
                        className="hidden"
                     />
                     <div
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                           formData?.asistencia === "confirmed"
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
                        name="asistencia"
                        value="declined"
                        checked={formData?.asistencia === "declined"}
                        onChange={() =>
                           handleRadioChange("asistencia", "declined")
                        }
                        className="hidden"
                     />
                     <div
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                           formData?.asistencia === "declined"
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
               {formData?.asistencia === "confirmed" && (
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
                        <telefono className="absolute left-3 top-3 h-5 w-5 text-base-content/30" />
                        <input
                           type="tel"
                           name="telefono"
                           value={formData.telefono}
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
               type="button"
               // onClick={handleSubmit}
               className="btn btn-primary btn-lg w-full max-w-md mx-auto flex items-center gap-2">
               <Check className="h-5 w-5" />
               {isSubmitting && formData.asistencia == "confirmed" ? (
                  <>
                     <span className="loading loading-spinner loading-sm"></span>
                     Enviando...
                  </>
               ) : (
                  "Confirmar Asistencia"
               )}
            </motion.button>

            <p className="text-center text-base-content/50 text-sm mt-4">
               Al confirmar, acepta los términos y condiciones del evento.
            </p>
         </motion.form>
      </div>
   );
};

export default ConfirmationForm;
