import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import env from "./constants/env";
import { formatDatetime } from "./utils/formats";
import { CheckCircle2Icon, ListIcon, RefreshCwIcon } from "lucide-react";
import { useGlobalContext } from "./contexts/GlobalContext";
import Loading from "./components/Loading";

interface Invitado {
   guestCode: string;
   nombre: string;
   puesto: string;
   telefono: string;
   seccion: number; // número de acompañantes
   asiento: number | string; // mesa
   AsistenciaEscaneada: string;
   asistencia: string;
   timestamp?: string;
}

interface Asistencia {
   confirmados: number;
   scanneados: number;
}

export default function ValidarQR() {
   const { isLoading, setIsLoading } = useGlobalContext();

   const [scannedPhone, setScannedPhone] = useState("");
   const [dataAsistencia, setDataAsistencia] = useState<Asistencia>({
      confirmados: 0,
      scanneados: 0,
   });
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const [cameraError, setCameraError] = useState(false);
   const [scannerActive, setScannerActive] = useState(true);
   const scannerRef = useRef<HTMLDivElement>(null);
   const [disabledButtonRefresh, setDisabledButtonRefresh] = useState(false);
   const [dataInvitados, setDataInvitados] = useState<Invitado[]>([]);
   const [search, setSearch] = useState("");

   /**
    *
    * @param guestCode ODcwMDAwMDAwMDE3NjQzNDc3NTg3MDc=
    * ODcwMDAwMDAwMDE3NjQzNDc2MTkzNjg=
    */

   const validateGuest = async (guestCode: string) => {
      setLoading(true);
      try {
         const res = await fetch(
            `${env.API_MACRO}?guestCode=${guestCode}&action=validateGuest`,
         );
         const data = await res.json();
         // console.log("aqui el json", data);
         if (data.autorizado) {
            await handleGetListaInvitados();
            await handleRefresh();

            Swal.fire({
               title: "",
               html: `
                  <div class="w-full max-w-md mx-auto p-4 sm:p-6">
                     <!-- Header compacto -->
                     <div class="text-center mb-4 sm:mb-6">
                     <div class="w-16 h-16 sm:w-20 sm:h-20 bg-[#9B2242] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                        <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                     </div>
                     <h2 class="text-xl sm:text-2xl font-bold text-[#9B2242] font-zapf-bold mb-1 sm:mb-2">Acceso Autorizado</h2>
                     <p class="text-[#727372] text-sm sm:text-base font-avenir-book">Credencial verificada</p>
                     </div>

                     <!-- Card única principal -->
                     <div class="bg-gradient-to-br from-[#FAF9F8] to-[#F0F0F0] rounded-2xl p-4 sm:p-6 border border-[#B8B6AF] shadow-lg">
                     
                     <!-- Información del invitado -->
                     <div class="flex items-start space-x-3 sm:space-x-4 pb-3 sm:pb-4 border-b border-[#B8B6AF] mb-4 sm:mb-6">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-[#9B2242] rounded-full flex items-center justify-center flex-shrink-0">
                           <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                           </svg>
                        </div>
                        <div class="flex-1 min-w-0">
                           <p class="text-xs sm:text-sm text-[#651D32] font-avenir-heavy uppercase tracking-wider mb-1">INVITADO OFICIAL</p>
                           <p class="text-lg sm:text-xl font-bold text-[#130D0E] font-zapf-semibold leading-tight truncate">${
                              data.nombre
                           }</p>
                           <p class="text-sm sm:text-base text-[#474C55] font-avenir-medium mt-1 truncate">${
                              data.puesto
                           }</p>
                        </div>
                     </div>

                     <!-- Grid responsivo para sección y asiento -->
                     <div class="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <!-- Sección -->
                        <div class="flex items-center space-x-2 sm:space-x-3 p-3 bg-white rounded-xl border border-[#B8B6AF]">
                           <div class="w-8 h-8 sm:w-10 sm:h-10 bg-[#651D32] rounded-full flex items-center justify-center flex-shrink-0">
                           <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                           </svg>
                           </div>
                           <div class="min-w-0 flex-1">
                           <p class="text-xs text-[#727372] font-avenir-heavy uppercase tracking-wide truncate">SECCIÓN</p>
                           <p class="text-base sm:text-lg font-bold text-[#130D0E] font-zapf-roman truncate">${
                              data.seccion
                           }</p>
                           </div>
                        </div>

                        <!-- Asiento -->
                        <div class="flex items-center space-x-2 sm:space-x-3 p-3 bg-white rounded-xl border border-[#B8B6AF]">
                           <div class="w-8 h-8 sm:w-10 sm:h-10 bg-[#474C55] rounded-full flex items-center justify-center flex-shrink-0">
                           <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                           </svg>
                           </div>
                           <div class="min-w-0 flex-1">
                           <p class="text-xs text-[#727372] font-avenir-heavy uppercase tracking-wide truncate">ASIENTO</p>
                           <p class="text-base sm:text-lg font-bold text-[#130D0E] font-zapf-roman truncate">${
                              data.asiento ?? "Por asignar"
                           }</p>
                           </div>
                        </div>
                     </div>

                     <!-- Panel de estado integrado -->
                     <div class="bg-gradient-to-r from-[#651D32] to-[#9B2242] rounded-xl p-4 text-white mb-4 sm:mb-6">
                        <div class="flex items-center justify-between mb-3">
                           <div>
                           <p class="text-xs sm:text-sm font-avenir-heavy uppercase tracking-wide opacity-90">ESTADO</p>
                           <p class="text-sm sm:text-base font-bold font-zapf-semibold">
                              ${
                                 data.llegada
                                    ? "INGRESO REGISTRADO"
                                    : "PENDIENTE DE INGRESO"
                              }
                           </p>
                           </div>
                           <div class="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                           <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                           </svg>
                           </div>
                        </div>
                        
                        ${
                           data.llegada
                              ? `
                           <div class="bg-white/10 rounded-lg p-2 sm:p-3 text-center">
                           <p class="text-xs font-avenir-heavy uppercase tracking-wide opacity-90">HORA DE INGRESO</p>
                           <p class="text-lg sm:text-xl font-bold font-zapf-semibold">${formatDatetime(
                              data.llegada,
                              true,
                              "hh:mm a",
                           )}</p>
                           </div>
                        `
                              : `
                           <div class="bg-white/10 rounded-lg p-2 sm:p-3 text-center">
                           <p class="text-xs font-avenir-light opacity-80">Esperando llegada del invitado</p>
                           </div>
                        `
                        }
                     </div>

                     <!-- Información adicional compacta -->
                     <div class="flex justify-between items-center text-xs sm:text-sm">
                        <div class="text-[#727372] font-avenir-book">
                           Código: <span class="font-avenir-medium text-[#474C55]">${
                              data.guestCode || "N/A"
                           }</span>
                        </div>
                        <div class="text-[#9B2242] font-avenir-heavy uppercase tracking-wide">
                           VERIFICADO ✓
                        </div>
                     </div>
                     </div>

                     <!-- Mensaje final compacto -->
                     <div class="text-center mt-3 sm:mt-4">
                     <p class="text-[#474C55] font-avenir-book italic text-sm sm:text-base">
                        ¡Bienvenido al evento!
                     </p>
                     </div>
                  </div>
               `,
               icon: "",
               showConfirmButton: true,
               showCancelButton: false,
               confirmButtonText: "Continuar Escaneando",
               customClass: {
                  confirmButton:
                     "btn bg-[#9B2242] hover:bg-[#651D32] border-none text-white font-zapf-bold text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
                  popup: "rounded-2xl sm:rounded-3xl shadow-2xl border border-[#B8B6AF] font-avenir-book bg-white mx-2",
                  title: "hidden",
               },
               buttonsStyling: false,
               allowOutsideClick: false,
               allowEscapeKey: false,
               background: "#FFFFFF",
               width: "auto",
               padding: "1rem",
            });

            // Swal.fire({
            //    title: "Acceso permitido",
            //    html: `
            //          <div style="text-align:left;">
            //             <p class='text-lg font-marcellus mb-2'>Invitado: <b>${
            //                data.nombre
            //             } - ${data.puesto}</b><p/>

            //             <p class='text-lg font-marcellus mb-2'>Sección: <b>${
            //                data.seccion
            //             }</b><p/>
            //              <p class='text-lg font-marcellus mb-2'>Asiento: <b>${
            //                 data.asiento ?? "-"
            //              }</b><p/>
            //             ${
            //                data.llegada
            //                   ? `<p class='text-lg font-marcellus mb-2'>Hora de llegada: <b>${formatDatetime(
            //                        data.llegada,
            //                        true,
            //                        "hh:mm a",
            //                     )}</b><p/>`
            //                   : ""
            //             }
            //          </div>
            //       `,
            //    icon: "success",
            //    confirmButtonText: "ACEPTAR",
            //    customClass: {
            //       confirmButton: "btn btn-success font-black mx-5",
            //       cancelButton: "btn btn-error font-black ml-2",
            //       popup: "font-marcellus",
            //       title: "font-marcellus text-green-700",
            //    },
            //    buttonsStyling: false,
            //    allowOutsideClick: false,
            //    allowEscapeKey: false,
            // });
         } else {
            setError(data.msg);
            setTimeout(() => {
               setError("");
            }, 10000);
         }
      } catch (err) {
         setError("Error al consultar invitado");
         setTimeout(() => {
            setError("");
         }, 10000);
      } finally {
         setLoading(false);
      }
   };

   const handleScan = async (text: string) => {
      if (text && text !== scannedPhone) {
         setScannerActive(false);
         const guestCode = text;
         setScannedPhone(guestCode);
         await validateGuest(guestCode);
      }
   };

   const handleCameraError = () => {
      setCameraError(true);
   };

   useEffect(() => {
      handleRefresh();
   }, []);

   const handleRefresh = async () => {
      setDisabledButtonRefresh(true);
      const res = await fetch(`${env.API_MACRO}?action=getConfirmCount`);
      const data = await res.json();
      setDataAsistencia(data);
      setDisabledButtonRefresh(false);
   };

   const handleGetListaInvitados = async () => {
      setDataInvitados([]);
      const res = await fetch(`${env.API_MACRO}?action=getList`);
      const data = await res.json();
      // Asumimos que data.list es un array de objetos con la estructura de Invitado
      setDataInvitados(data.list);
   };

   const handleRetry = () => {
      setCameraError(false);
      setError("");
      setScannedPhone("");
      setScannerActive(true);
      if (scannerRef.current) {
         scannerRef.current.innerHTML = "";
      }
      startScanner();
   };

   const startScanner = () => {
      if (scannerRef.current && scannerActive) {
         const scanner = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 15, qrbox: { width: 720, height: 720 } },
            false,
         );
         scanner.render(
            (decodedText: string) => {
               handleScan(decodedText);
            },
            (error: any) => {
               // No bloquea por error de escaneo, solo por error de cámara
            },
         );
      }
   };

   const handleClickConfirm = async (invitado: Invitado) => {
      const result = await Swal.fire({
         title: "Confirmar asistencia",
         text: `Has seleccionado a ${invitado.nombre}`,
         icon: "question",
         showCancelButton: true,
         confirmButtonText: "CONFIRMAR ASISTENCIA",
         cancelButtonText: "CANCELAR",
         reverseButtons: true,
         customClass: {
            confirmButton: "btn btn-success font-black mx-5",
            cancelButton: "btn btn-error font-black ml-2",
         },
         buttonsStyling: false,
      });

      if (result.isConfirmed) {
         setIsLoading(true);
         await validateGuest(invitado.guestCode);
         await handleRefresh();
         setIsLoading(false);
      }
   };

   useEffect(() => {
      if (!cameraError && scannerActive && scannerRef.current) {
         scannerRef.current.innerHTML =
            '<div id="qr-reader" style="width:100%; min-height:340px;"></div>';
         startScanner();
      }
      // eslint-disable-next-line
   }, [cameraError, scannerActive]);

   return (
      <>
         <Loading open={isLoading} animation="bounce" />

         <div className="p-2 text-center max-w-xl mx-auto">
            {/* BOTON PARA ABRIR LISTA DE INVITADOS */}
            <label
               htmlFor="modal_invitados"
               className="btn btn-outline btn-primary btn-xl mb-2"
               onClick={async () => {
                  setSearch("");
                  await handleGetListaInvitados();
               }}>
               <ListIcon /> Mostrar lista de invitados
            </label>
            {/* LISTA DE INVITADOS */}
            <input
               type="checkbox"
               id="modal_invitados"
               className="modal-toggle"
            />
            <div className="modal" role="dialog">
               <div className="modal-box p-0">
                  {/* HEADER FIJO */}
                  <div className="sticky top-0 z-10 bg-base-200 px-4 py-3 border-b border-base-300">
                     <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-xl opacity-70 tracking-wide">
                           Lista de invitados
                        </h2>
                        <div className="">
                           <label htmlFor="modal_invitados" className="btn">
                              Cerrar
                           </label>
                        </div>
                     </div>
                     {/* Buscador */}
                     <div className="my-2">
                        <input
                           type="text"
                           placeholder="Buscar por nombre o teléfono..."
                           className="input input-bordered input-md w-full"
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                        />
                     </div>
                  </div>
                  <div className="max-h-[76vh] overflow-y-auto">
                     <ul className="list bg-base-100 rounded-box shadow-md">
                        {dataInvitados
                           .filter((invitado) => {
                              if (!search) return true;
                              return (
                                 invitado.nombre
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                 invitado.telefono.toString().includes(search)
                              );
                           })
                           .map((invitado, index) => (
                              <li
                                 key={`key-invitado-${index}`}
                                 className={`list-row items-center ${
                                    invitado.AsistenciaEscaneada === "✔️"
                                       ? "bg-success/25"
                                       : ""
                                 }`}>
                                 <div className="text-4xl font-thin opacity-40 tabular-nums">
                                    {index + 1}
                                 </div>
                                 <div className="list-col-grow">
                                    <div className="font-semibold">
                                       {invitado.nombre}
                                    </div>
                                    <div className="text-xs uppercase opacity-60">
                                       {invitado.puesto}
                                    </div>
                                    <div className="text-xs uppercase opacity-60">
                                       {invitado.telefono}
                                    </div>
                                    <div className="flex w-full justify-between my-1">
                                       <div className="w-full text-center border-r-2">
                                          Sección: <b>{invitado.seccion}</b>
                                       </div>
                                       <div className="w-full text-center">
                                          Asiento: <b>{invitado.asiento}</b>
                                       </div>
                                    </div>
                                 </div>
                                 {!invitado.AsistenciaEscaneada && (
                                    <button
                                       className="btn btn-square btn-ghost btn-lg"
                                       onClick={() =>
                                          handleClickConfirm(invitado)
                                       }>
                                       <CheckCircle2Icon size={30} />
                                    </button>
                                 )}
                              </li>
                           ))}
                     </ul>
                  </div>
               </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">
               📷 Escanea un código QR <br />
               <small className="text-sm">
                  para registrar la asistencia en la recepción.
               </small>
            </h1>

            <div className="w-full max-w-xl mx-auto bg-base-300 rounded-lg shadow-lg p-4 mb-2 relative min-h-[360px] flex items-center justify-center">
               {!cameraError ? (
                  <>
                     <div ref={scannerRef} className="w-full h-full" />
                     {loading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-base-300/80 z-20 rounded-lg">
                           <span className="loading loading-spinner loading-lg text-primary mb-2"></span>
                           <span className="font-marcellus text-lg text-primary font-bold animate-pulse">
                              Buscando invitado...
                           </span>
                        </div>
                     )}
                  </>
               ) : (
                  <div className="text-center py-8">
                     <p className="text-red-700 font-bold mb-2">
                        No se pudo acceder a la cámara.
                        <br />
                        Verifica los permisos del navegador, que el sitio esté
                        en HTTPS y que la cámara no esté siendo usada por otra
                        app.
                     </p>
                     <button
                        className="btn btn-primary btn-sm mt-2"
                        onClick={handleRetry}>
                        Reintentar
                     </button>
                  </div>
               )}
            </div>

            {/* Indicadores y mensajes debajo de la cámara */}
            <div className="w-full max-w-md mx-auto flex flex-col gap-2 mb-4">
               <div className="flex flex-row justify-center items-center gap-6 mb-2 animate-fade-in">
                  <div className="flex flex-col items-center bg-neutral-300 rounded-lg px-4 py-2 shadow">
                     <span className="text-lg font-bold text-primary">
                        Invitados confirmados
                     </span>
                     <span className="text-5xl font-extrabold text-primary">
                        {dataAsistencia.confirmados ?? "-"}
                     </span>
                  </div>
                  <div className="flex flex-col items-center bg-neutral-300 rounded-lg px-4 py-2 shadow">
                     <span className="text-lg font-bold text-primary">
                        Pases escaneados
                     </span>
                     <span className="text-5xl font-extrabold text-primary">
                        {dataAsistencia.scanneados ?? "-"}
                     </span>
                  </div>
                  <button
                     className="btn btn-lg bg-neutral-300"
                     onClick={handleRefresh}
                     disabled={disabledButtonRefresh}>
                     <RefreshCwIcon
                        size={25}
                        className={`active:animate-spin text-primary ${
                           disabledButtonRefresh ? "animate-spin" : ""
                        }`}
                     />
                  </button>
               </div>
               {error && (
                  <div className="bg-gradient-to-br from-red-100 to-red-200 border border-red-400 shadow-lg rounded-xl p-4 text-red-800 animate-fade-in">
                     <span className="text-2xl mr-2"></span> {error}
                  </div>
               )}
            </div>
         </div>
      </>
   );
}
