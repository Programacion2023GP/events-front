import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
   Building2,
   Check,
   Copy,
   CreditCard,
   ExternalLink,
   Gift,
} from "lucide-react";
import Divider from "./Divider";
import { useMobile } from "../hooks/useMobile";
import { formatCardNumber } from "../utils/formats";

const GiftTable = ({ giftRegistryUrls }) => {
   const isMobile = useMobile();
   const [copiedField, setCopiedField] = useState<string | null>(null);

   const copyToClipboard = async (text: string, field: string) => {
      try {
         await navigator.clipboard.writeText(text);
         setCopiedField(field);
         setTimeout(() => setCopiedField(null), 1500);
      } catch (err) {
         console.error("Error al copiar:", err);
      }
   };

   const CopyButton = ({ text, field }: { text: string; field: string }) => (
      <button
         onClick={() => copyToClipboard(text, field)}
         className="flex items-center gap-1 px-2 py-1 bg-base-300/10 hover:bg-base-300/20 rounded-md transition-all duration-200 text-xs backdrop-blur-sm border border-base-content/50 hover:border-base-content/50"
         title="Copiar">
         {copiedField === field ? (
            <>
               <Check className="w-3 h-3 text-green-400" />
               <span className="text-green-400">Copiado</span>
            </>
         ) : (
            <>
               <Copy className="w-3 h-3" />
               <span>Copiar</span>
            </>
         )}
      </button>
   );

   return (
      <div className="max-w-4xl mx-auto">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{
               once: false,
               margin: isMobile ? "0px" : "-25% 0px",
            }}
            className="text-center">
            <div className="flex justify-center mb-4">
               <Gift className="h-12 w-12 text-primary/75" />
            </div>
            <h2 className="font-marcellus font-black text-2xl md:text-4xl mb-2 text-primary">
               Mesa de Regalos
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
            <p className="font-marcellus leading-relaxed max-w-3xl mx-auto mb-8">
               Tu presencia es nuestro mejor regalo. Sin embargo, si deseas
               obsequiarnos algo, hemos creado una mesa de regalos para
               facilitar tu elección o si prefieres apoyarnos con una
               transferencia, aquí te dejamos los datos bancarios. ¡Gracias por
               tu generosidad!, te dejamos nuestras opciones:
            </p>
            <div
               className={isMobile ? "flex flex-col" : "flex justify-between"}>
               {giftRegistryUrls.map(
                  (item: {
                     type: "link" | "transferencia";
                     site: string;
                     link: string | undefined;
                     image: string;
                     color: string;
                     bankData: {
                        banco: string;
                        nombre: string;
                        numeroTarjeta: string;
                        clabe: string;
                        concepto: string;
                        linkCobro: string;
                     };
                  }) => (
                     <>
                        {item.type === "link" ? (
                           <motion.div
                              key={`key-link-${item.site}`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}>
                              <a
                                 className={`btn btn-outline bg-${item.color} rounded-full m-5 p-10`}
                                 href={item.link}
                                 target="_blank"
                                 rel="noopener noreferrer">
                                 <img
                                    src={item.image}
                                    alt={item.site}
                                    className="object-cover w-50"
                                 />
                                 {/* {item.site} */}
                              </a>
                           </motion.div>
                        ) : (
                           <motion.div
                              key={`key-${item.type}-${item.site}`}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, delay: 0.1 }}
                              className="relative">
                              {/* Tarjeta de Crédito Compacta */}
                              <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-xl p-6 shadow-2xl overflow-hidden">
                                 {/* Efectos de fondo */}
                                 <div className="absolute top-0 right-0 w-20 h-20 bg-base-300/10 rounded-full -translate-y-10 translate-x-10"></div>
                                 <div className="absolute bottom-0 left-0 w-16 h-16 bg-base-300/5 rounded-full translate-y-8 -translate-x-8"></div>

                                 {/* Contenido de la tarjeta */}
                                 <div className="relative z-10">
                                    {/* Header compacto */}
                                    <div className="flex justify-between items-center mb-4">
                                       <div className="flex items-center gap-2">
                                          <Building2 className="w-6 h-6 text-white" />
                                          <span className="text-2xl font-bold text-white">
                                             {item.bankData.banco}
                                          </span>
                                       </div>
                                       <CreditCard className="w-8 h-8 text-white/60" />
                                    </div>

                                    {/* Número de tarjeta */}
                                    <div className="mb-4">
                                       <div className="flex items-center justify-between mb-1">
                                          <span className="text-white/70 text-xs uppercase tracking-wider">
                                             Número de Tarjeta
                                          </span>
                                          <CopyButton
                                             text={item.bankData.numeroTarjeta.replace(
                                                /\s/g,
                                                "",
                                             )}
                                             field="tarjeta"
                                          />
                                       </div>
                                       <div className="text-xl md:text-2xl font-mono text-white tracking-wider">
                                          {item.bankData.numeroTarjeta}
                                       </div>
                                    </div>

                                    {/* Titular */}
                                    <div className="mb-4">
                                       <div className="flex items-center justify-between mb-1">
                                          <span className="text-white/70 text-xs uppercase tracking-wider">
                                             Titular
                                          </span>
                                          <CopyButton
                                             text={item.bankData.nombre}
                                             field="nombre"
                                          />
                                       </div>
                                       <div className="text-lg font-semibold text-white uppercase tracking-wide">
                                          {item.bankData.nombre}
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              {/* Información adicional compacta */}
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                 {/* CLABE */}
                                 <div className="bg-base-300/10 backdrop-blur-sm rounded-lg p-4 border border-base-content/50">
                                    <div className="flex items-center justify-between mb-2">
                                       <h3 className="text-base-content font-medium text-sm">
                                          CLABE
                                       </h3>
                                       <CopyButton
                                          text={item.bankData.clabe.replace(
                                             /\s/g,
                                             "",
                                          )}
                                          field="clabe"
                                       />
                                    </div>
                                    <p className="text-base-content/90 font-mono text-sm">
                                       {item.bankData.clabe}
                                    </p>
                                 </div>

                                 {/* Concepto */}
                                 <div className="bg-base-300/10 backdrop-blur-sm rounded-lg p-4 border border-base-content/50">
                                    <div className="flex items-center justify-between mb-2">
                                       <h3 className="text-base-content font-medium text-sm">
                                          Concepto
                                       </h3>
                                       <CopyButton
                                          text={item.bankData.concepto || ""}
                                          field="concepto"
                                       />
                                    </div>
                                    <p className="text-base-content/90 text-sm">
                                       {item.bankData.concepto}
                                    </p>
                                 </div>
                              </div>

                              {/* Botón de enlace de cobro */}
                              {item.bankData.linkCobro && (
                                 <motion.div
                                    className="mt-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}>
                                    <a
                                       href={item.bankData.linkCobro}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                                       <span>Hacer depósito con un clic</span>
                                       <ExternalLink className="w-4 h-4" />
                                       <span>💙</span>
                                    </a>
                                 </motion.div>
                              )}

                              {/* Mensaje de agradecimiento */}
                              <motion.div
                                 className="mt-4 text-center"
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 transition={{ duration: 0.6, delay: 0.4 }}>
                                 <p className="font-marcellus text-base-content/60 text-xs">
                                    ¡Gracias por ser parte de nuestro día
                                    especial! ✨
                                 </p>
                              </motion.div>
                           </motion.div>
                        )}
                     </>
                  ),
               )}
            </div>
         </motion.div>
      </div>
   );
};

export default GiftTable;
