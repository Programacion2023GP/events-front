"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Divider from "./Divider";
import dayjs from "dayjs";
import env from "../constants/env";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvitationPDF from "./InvitationPDF";
import images from "../constants/images";
import { useMobile } from "../hooks/useMobile";
import { useGlobalContext } from "../contexts/GlobalContext";

interface RsvpFormProps {
   weddingInfo: {
      bride: string;
      groom: string;
      date: string;
      time: string;
      fullDate: string;
      theDate: Date;
      place: string;
      location: string;
      calendarUrl: string;
      mapsUrl: string;
      giftTable: string;
   };
   onComplete?: () => void;
}

export default function RsvpForm({ weddingInfo, onComplete }: RsvpFormProps) {
   const { setIsLoading } = useGlobalContext();
   const isMobile = useMobile();

   const [formData, setFormData] = useState({
      name: "",
      // email: "",
      phone: "",
      attendance: "yes",
      guests: 0,
      message: "",
   });
   const [authorized, setAuthorized] = useState<boolean | null>(null);
   const [maxGuests, setMaxGuests] = useState<number | null>(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [errorMsg, setErrorMsg] = useState("");
   const [guestCode, setGuestCode] = useState("");
   const [guests, setGuests] = useState(0);
   const [table, setTable] = useState(0);
   const [showButtonDownload, setShowButtonDownload] = useState(false);

   useEffect(() => {
      // console.log("32 days", dayjs(weddingInfo.theDate).subtract(72, "days"));

      if (formData.phone.length < 10) {
         setFormData({
            name: "",
            phone: formData.phone,
            attendance: "yes",
            guests: 0,
            message: "",
         });
         setAuthorized(false);
      }
      const checkPhone = async () => {
         setShowButtonDownload(false);
         if (formData.phone.length < 10) return;
         try {
            setIsLoading(true);
            setIsSubmitting(true);
            const res = await fetch(
               `${env.API_MACRO}?telefono=${formData.phone}&action=getGuest`,
            );
            const data = await res.json();
            console.log("🚀 ~ checkPhone ~ data:", data);
            setAuthorized(data.autorizado);
            if (data.autorizado) {
               setMaxGuests(data.max);
               setTable(data.table);
               setFormData({ ...formData, name: data.name });
               setErrorMsg("");
               if (data.guestCode) {
                  setShowButtonDownload(true);
                  setGuestCode(data.guestCode);
                  setGuests(data.max);
               }
            } else {
               setErrorMsg("Este número no está autorizado.");
               setMaxGuests(null);
            }
            setIsSubmitting(false);
            setIsLoading(false);
         } catch {
            setErrorMsg("Error validando el teléfono.");
         } finally {
            setIsSubmitting(false);
            setIsLoading(false);
         }
      };
      checkPhone();
   }, [formData.phone]);

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setIsSubmitting(true);
      setErrorMsg("");

      // if (formData.attendance == "yes" && formData.guests < 1) {
      //    setIsSubmitting(false);
      //    return setErrorMsg("No has elejido la cantidad de invitados");
      // }

      const body = {
         action: "registerRequest",
         name: formData.name,
         phone: formData.phone,
         attendance: formData.attendance,
         guests: formData.attendance == "no" ? 0 : formData.guests,
         message: formData.message,
      };

      try {
         // await fetch(formUrl, {
         //    method: "POST",
         //    body: formDataEncoded,
         //    mode: "no-cors", // obligatorio para evitar CORS
         // });
         const res = await fetch(
            `${env.API_MACRO}?telefono=${body.phone}&action=${
               body.action
            }&name=${encodeURIComponent(body.name)}&phone=${encodeURIComponent(
               body.phone,
            )}&attendance=${encodeURIComponent(
               body.attendance,
            )}&guests=${encodeURIComponent(
               body.guests,
            )}&table=${encodeURIComponent(table)}&message=${encodeURIComponent(
               body.message,
            )}`,
         );
         // console.log("🚀 ~ handleSubmit ~ res:", res);
         const data = await res.json();
         // console.log("🚀 ~ handleSubmit ~ data:", data);
         if (!data.success) {
            setErrorMsg(data.error);
            setIsLoading(false);
            return;
         }
         setGuestCode(data.guestCode);
         setGuests(data.guests);
         setIsSubmitted(true);
         setIsLoading(false);
         if (onComplete) setTimeout(onComplete, 2000);
      } catch (err) {
         console.error(err);
         setErrorMsg("No se pudo enviar el formulario");
      } finally {
         setIsSubmitting(false);
         setIsLoading(false);
      }
   };

   if (isSubmitted) {
      return (
         <>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-center py-2">
               <div className="mb-6 text-success">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="48"
                     height="48"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="mx-auto">
                     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                     <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
               </div>
               <h3 className="text-xl font-marcellus font-bold mb-2 text-primary">
                  ¡Gracias por confirmar!
               </h3>
               <p className="font-marcellus text-primary/90">
                  {formData.attendance == "yes"
                     ? "Estamos emocionados de contar con tu presencia. No olvides descargar y llevar contigo la invitación digital al evento."
                     : "Lamentamos saber que no podrás acompañarnos, pero agradecemos que nos lo hayas hecho saber."}
               </p>
               <motion.div
                  initial={{ opacity: 0, scale: 0, x: 50 }}
                  className="mx-auto w-[80%]"
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                     delay: 0.5,
                     duration: 0.5,
                     type: "spring",
                  }}>
                  <Divider color="primary" />
               </motion.div>
            </motion.div>
            {formData.attendance == "yes" && guestCode && (
               // <motion.div
               //    initial={{ opacity: 0, scale: 0, y: 50 }}
               //    whileInView={{ opacity: 1, scale: 1 }}
               //    transition={{
               //       duration: 0.3,
               //    }}>
               <div className="text-center animate-pulse">
                  <PDFDownloadLink
                     document={
                        <InvitationPDF
                           name={formData.name}
                           weddingInfo={weddingInfo}
                           qrValue={guestCode}
                           guests={guests}
                           table={formData.attendance == "no" ? 0 : table}
                           backgroundImage={images.fondoInvitacion}
                        />
                     }
                     fileName={`Invitacion_${formData.name.replaceAll(
                        " ",
                        "_",
                     )}.pdf`}
                     className="btn btn-outline btn-primary btn-xl">
                     {({ loading }) =>
                        loading
                           ? "Generando invitación..."
                           : "🎟️ DESCARGAR INVITACIÓN"
                     }
                  </PDFDownloadLink>
               </div>
               // </motion.div>
            )}
         </>
      );
   }

   return (
      <div
         className={`max-w-4xl mx-auto ${
            isSubmitting ? "cursor-wait" : "cursor-auto"
         }`}>
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-2 text-primary">
               Confirma tu Asistencia
            </h2>
            <motion.div
               initial={{ opacity: 0, scale: 0, x: 50 }}
               whileInView={{ opacity: 1, scale: 1, x: 0 }}
               transition={{
                  delay: 0.5,
                  duration: 1,
                  type: "spring",
               }}>
               <Divider color="primary" />
            </motion.div>
            <p className="font-marcellus leading-relaxed max-w-3xl mx-auto">
               Por favor, confirma tu asistencia antes del{" "}
               {dayjs(weddingInfo.theDate)
                  .subtract(32, "days")
                  .format("dddd DD [de] MMMM [de] YYYY")}
               .
            </p>
            <small className="font-marcellus text-xs">
               Si no recibimos tu confirmación, asumiremos que surgió algún
               imprevisto que te impedirá acompañarnos.
            </small>
         </motion.div>
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{
               once: false,
               margin: isMobile ? "0px" : "-25% 0px",
            }}>
            <div className="relative max-w-6xl mx-auto">
               {/* Contenedor principal del boleto horizontal */}
               <div className="ticket-horizontal relative bg-gradient-to-r from-base-100 via-base-50 to-base-100 shadow-2xl overflow-hidden">
                  {/* Perforaciones superiores e inferiores */}
                  <div className="absolute top-0 left-0 w-full h-6 flex justify-around items-center">
                     {[...Array(20)].map((_, i) => (
                        <div
                           key={i}
                           className="w-3 h-3 bg-base-300 rounded-full -mt-1.5"></div>
                     ))}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-6 flex justify-around items-center">
                     {[...Array(20)].map((_, i) => (
                        <div
                           key={i}
                           className="w-3 h-3 bg-base-300 rounded-full -mb-1.5"></div>
                     ))}
                  </div>

                  {/* Línea de separación vertical decorativa */}
                  <div className="absolute left-1/3 top-6 bottom-6 w-px border-l-2 my-2 border-dashed border-primary/30"></div>

                  <div className="flex min-h-[500px]">
                     {/* Sección izquierda - Información del evento */}
                     <div className="w-1/3 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-primary/5 to-secondary/5">
                        <div className="space-y-4">
                           <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-primary-content text-2xl">
                                 ♥
                              </span>
                           </div>

                           <h3 className="text-2xl font-marcellus font-bold text-primary">
                              Invitación del Evento
                           </h3>

                           <div className="space-y-2">
                              <p className="font-marcellus text-md mb-8 text-primary">
                                 {weddingInfo.bride}{" "}
                                 {weddingInfo.groom && `& ${weddingInfo.groom}`}
                              </p>
                              <p className="font-anodina-extrabold text-secondary text-sm">
                                 {weddingInfo.date} <br />
                                 {weddingInfo.time} hrs
                              </p>
                           </div>

                           <div className="divider divider-primary opacity-50"></div>

                           <div className="space-y-1">
                              <p className="text-xs font-marcellus font-medium">
                                 {weddingInfo.place.toUpperCase()}
                              </p>
                              <p className="text-xs font-marcellus opacity-60">
                                 {weddingInfo.location}
                              </p>
                           </div>

                           <div className="mt-6 p-3 bg-base-100 rounded-lg shadow-inner">
                              <p className="text-xs font-mono">
                                 - TICKET -
                                 {/* #WED
                                 {Math.random()
                                    .toString(36)
                                    .substr(2, 4)
                                    .toUpperCase()} */}
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Sección derecha - Formulario */}
                     {/* {dayjs().isAfter(
                        dayjs(weddingInfo.theDate).subtract(32, "days"),
                        "D",
                     ) ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                           <h4 className="text-xl font-marcellus font-bold text-error mb-4">
                              El periodo para confirmar asistencia ha finalizado
                           </h4>
                           <p className="text-base font-marcellus text-base-content/80 max-w-md mx-auto">
                              Si tienes alguna duda o necesitas comunicarte, por
                              favor contáctanos directamente.
                              <br />
                              ¡Gracias por tu interés!
                           </p>
                        </div>
                     ) : ( */}
                     <div className="w-2/3 p-8">
                        <div className="mb-6">
                           <h4 className="text-xl font-marcellus font-bold text-center mb-2">
                              Confirmación de Asistencia
                           </h4>
                           <p className="text-sm font-marcellus text-center opacity-70">
                              Al ingresar el número telefónico podrás llenar el
                              formulario.
                           </p>
                        </div>

                        {/* Error message */}
                        {errorMsg && (
                           <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6 }}
                              exit={{ opacity: 0, scale: 0 }}
                              viewport={{
                                 once: false,
                                 margin: isMobile ? "0px" : "-25% 0px",
                              }}
                              className="alert alert-error alert-sm font-bold py-2 my-3">
                              <span className="mr-2">⚠️ {errorMsg}</span>
                           </motion.div>
                        )}

                        <form
                           onSubmit={handleSubmit}
                           className="space-y-4 font-marcellus">
                           {/* Primera fila - Información básica */}
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="form-control col-span-2">
                                 <label className="label">
                                    <span className="label-text font-bold mr-2 mb-2">
                                       📱 Teléfono
                                    </span>
                                 </label>
                                 <input
                                    name="phone"
                                    type="tel"
                                    maxLength={10}
                                    className={`input input-bordered input-primary focus:input-primary ${
                                       isSubmitting
                                          ? "cursor-wait"
                                          : "cursor-auto"
                                    }`}
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="10 dígitos"
                                 />
                              </div>
                           </div>

                           {/* Segunda fila - Nombre */}
                           <div className="form-control">
                              <label className="label">
                                 <span className="label-text font-bold mr-2 mb-2">
                                    👤 Nombre del invitado
                                 </span>
                              </label>
                              <input
                                 name="name"
                                 className="input input-bordered input-primary w-full focus:input-primary text-center font-bold input-sm"
                                 required
                                 value={formData.name}
                                 onChange={handleChange}
                                 disabled={true}
                                 placeholder="Invitado..."
                              />
                           </div>

                           {showButtonDownload ? (
                              <div className="text-center animate-pulse">
                                 <PDFDownloadLink
                                    document={
                                       <InvitationPDF
                                          name={formData.name}
                                          weddingInfo={weddingInfo}
                                          qrValue={guestCode}
                                          guests={guests}
                                          table={
                                             formData.attendance == "no"
                                                ? 0
                                                : table
                                          }
                                          backgroundImage={
                                             images.fondoInvitacion
                                          }
                                       />
                                    }
                                    fileName={`Invitacion_${formData.name.replaceAll(
                                       " ",
                                       "_",
                                    )}.pdf`}
                                    className="btn btn-outline btn-primary btn-xl">
                                    {({ loading }) =>
                                       loading
                                          ? "Generando invitación..."
                                          : "🎟️ DESCARGAR INVITACIÓN"
                                    }
                                 </PDFDownloadLink>
                              </div>
                           ) : (
                              <>
                                 {/* Tercera fila - Asistencia */}
                                 <div className="form-control">
                                    <label className="label">
                                       <span className="label-text font-bold text-center w-full">
                                          🎉 ¿Nos acompañarás?
                                       </span>
                                    </label>
                                    <div className="flex justify-center gap-6 mt-2">
                                       <label className="cursor-pointer">
                                          <div
                                             className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-300 ${
                                                formData.attendance === "yes"
                                                   ? "border-primary bg-primary/10 shadow-md"
                                                   : "border-base-300 hover:border-primary/50"
                                             }`}>
                                             <input
                                                type="radio"
                                                name="attendance"
                                                value="yes"
                                                checked={
                                                   formData.attendance === "yes"
                                                }
                                                onChange={() =>
                                                   setFormData({
                                                      ...formData,
                                                      attendance: "yes",
                                                   })
                                                }
                                                disabled={!authorized}
                                                className="radio radio-primary radio-sm"
                                             />
                                             <span className="text-lg">✅</span>
                                             <span className="font-bold">
                                                ¡Sí, asistiré!
                                             </span>
                                          </div>
                                       </label>

                                       <label className="cursor-pointer">
                                          <div
                                             className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-300 ${
                                                formData.attendance === "no"
                                                   ? "border-error bg-error/10 shadow-md"
                                                   : "border-base-300 hover:border-error/50"
                                             }`}>
                                             <input
                                                type="radio"
                                                name="attendance"
                                                value="no"
                                                checked={
                                                   formData.attendance === "no"
                                                }
                                                disabled={!authorized}
                                                onChange={() =>
                                                   setFormData({
                                                      ...formData,
                                                      attendance: "no",
                                                   })
                                                }
                                                className="radio radio-error radio-sm"
                                             />
                                             <span className="text-lg">❌</span>
                                             <span className="font-bold">
                                                No podré asistir
                                             </span>
                                          </div>
                                       </label>
                                    </div>
                                 </div>

                                 {/* Cuarta fila - Número de invitados y mensaje */}
                                 <div
                                    className={`grid grid-cols-1 ${
                                       formData.attendance == "yes"
                                          ? "lg:grid-cols-2"
                                          : "lg:grid-cols-1"
                                    } gap-4`}>
                                    {maxGuests !== null &&
                                       formData.attendance === "yes" && (
                                          <div className="form-control">
                                             <label className="label">
                                                <span className="label-text font-bold mr-2 mb-1">
                                                   👥 Número de pases
                                                </span>
                                             </label>
                                             <div className="flex items-center gap-2">
                                                <input
                                                   name="guests"
                                                   type="number"
                                                   className="input input-bordered input-lg input-primary focus:input-primary w-20 text-center font-bold"
                                                   min={
                                                      formData.attendance ===
                                                      "yes"
                                                         ? 1
                                                         : 0
                                                   }
                                                   max={maxGuests}
                                                   value={formData.guests}
                                                   onChange={handleChange}
                                                   disabled={!authorized}
                                                />
                                                <span className="mr-2">
                                                   pases
                                                </span>
                                                <div
                                                   className="tooltip"
                                                   data-tip="Máximo de pases (incluyendote)">
                                                   <div className="badge badge-primary text-primary-content ">
                                                      Max. {maxGuests}
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       )}

                                    {/* <div className="form-control">
                                       <label className="label">
                                          <span className="label-text font-bold mr-2 mb-1">
                                             📨 Mensaje
                                          </span>
                                       </label>
                                       <textarea
                                          name="message"
                                          className="textarea textarea-bordered textarea-primary focus:textarea-primary w-full"
                                          rows={3}
                                          value={formData.message}
                                          onChange={handleChange}
                                          disabled={!authorized}
                                          placeholder="Buenos deseos..."
                                       />
                                    </div> */}
                                 </div>

                                 {/* Botón de envío */}
                                 <div className="text-center pt-4">
                                    <button
                                       className="btn btn-primary btn-wide rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                       disabled={
                                          isSubmitting || maxGuests === null
                                       }>
                                       {isSubmitting &&
                                       formData.attendance == "yes" &&
                                       formData.guests > 0 ? (
                                          <>
                                             <span className="loading loading-spinner loading-sm"></span>
                                             Enviando...
                                          </>
                                       ) : (
                                          <>
                                             <span>🎊</span>
                                             Confirmar Asistencia
                                             <span>🎊</span>
                                          </>
                                       )}
                                    </button>
                                 </div>
                              </>
                           )}
                        </form>

                        {/* Error message */}
                        {isMobile && errorMsg && (
                           <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6 }}
                              exit={{ opacity: 0, scale: 0 }}
                              viewport={{
                                 once: false,
                                 margin: isMobile ? "0px" : "-25% 0px",
                              }}
                              className="alert alert-error alert-sm font-bold py-2 my-3">
                              <span className="mr-2">⚠️ {errorMsg}</span>
                           </motion.div>
                        )}

                        {/* Pie del formulario */}
                        <div className="text-center font-marcellus mt-6 pt-4 border-t border-dashed border-primary/20">
                           <p className="text-xs opacity-60">
                              Gracias por confirmar tu asistencia • Conserva
                              este boleto como recuerdo ♥
                           </p>
                        </div>
                     </div>
                     {/* )} */}
                  </div>
               </div>

               {/* Sombra decorativa */}
               <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl -z-10 blur-xl"></div>
            </div>
         </motion.div>
      </div>
   );
}
