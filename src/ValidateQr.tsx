import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import env from "./constants/env";
import { formatDatetime } from "./utils/formats";
import {
   CheckCircle2Icon,
   ListCheckIcon,
   ListIcon,
   RefreshCwIcon,
} from "lucide-react";
import { useGlobalContext } from "./contexts/GlobalContext";
import Loading from "./components/Loading";

interface Invitado {
   codigo: string;
   nombre: string;
   telefono: string;
   personas: number;
   mesa: number;
   AsistenciaEscaneada: string;
}
interface Asistencia {
   invitaciones: number;
   pases: number;
}

export default function ValidarQR() {
   const { isLoading, setIsLoading } = useGlobalContext();

   const [scannedPhone, setScannedPhone] = useState("");
   const [dataAsistencia, setDataAsistencia] = useState<Asistencia>({
      invitaciones: 0,
      pases: 0,
   });
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const [cameraError, setCameraError] = useState(false);
   const [scannerActive, setScannerActive] = useState(true);
   const scannerRef = useRef<HTMLDivElement>(null);
   const [disabledButtonRefresh, setDisabledButtonRefresh] = useState(false);
   const [dataInvitados, setDataInvitados] = useState<Invitado[]>([]);
   const [search, setSearch] = useState("");
   const [classesDialog, setClassesDialog] = useState("");

   const validateGuest = async (guestCode: string) => {
      setLoading(true);
      try {
         const res = await fetch(
            `https://script.google.com/macros/s/${env.ID_MACRO_SCRIPT}/exec?guestCode=${guestCode}&action=validateGuest`,
         );
         const data = await res.json();

         if (data.autorizado) {
            await handleGetListaInvitados();
            await handleRefresh();

            Swal.fire({
               title: "Acceso permitido",
               html: `
                     <div style="text-align:left;">
                        <p class='text-lg font-marcellus mb-2'>Invitado: <b>${
                           data.nombre
                        }</b><p/>
                        <p class='text-lg font-marcellus mb-2'>Confirmado: <b>${
                           data.confirmado ? "Sí" : "No"
                        }</b><p/>
                        <p class='text-lg font-marcellus mb-2'>Pases: <b>${
                           data.max
                        }</b><p/>
                         <p class='text-lg font-marcellus mb-2'>Mesa: <b>${
                            data.mesa ?? "-"
                         }</b><p/>
                        ${
                           data.llegada
                              ? `<p class='text-lg font-marcellus mb-2'>Hora de llegada: <b>${formatDatetime(
                                   data.llegada,
                                   true,
                                   "hh:mm a",
                                )}</b><p/>`
                              : ""
                        }
                     </div>
                  `,
               icon: "success",
               confirmButtonText: "ACEPTAR",
               customClass: {
                  confirmButton: "btn btn-success font-black mx-5", // daisyUI
                  cancelButton: "btn btn-error font-black ml-2",
                  popup: "font-marcellus",
                  title: "font-marcellus text-green-700",
               },
               buttonsStyling: false, // importante para que DaisyUI maneje estilos
               allowOutsideClick: false,
               allowEscapeKey: false,
            });
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
         setScannerActive(false); // Bloquea la cámara tras escanear
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
      const res = await fetch(
         `https://script.google.com/macros/s/${env.ID_MACRO_SCRIPT}/exec?action=getConfirmCount`,
      );
      const data = await res.json();
      setDataAsistencia(data);
      setDisabledButtonRefresh(false);
   };

   const handleGetListaInvitados = async () => {
      setDataInvitados([]);
      const res = await fetch(
         `https://script.google.com/macros/s/${env.ID_MACRO_SCRIPT}/exec?action=getList`,
      );
      const data = await res.json();
      // console.log("🚀 ~ handleRefresh ~ data:", data);
      const headers = data.list[0]; // primera fila
      const rows = data.list.slice(1); // resto de filas

      // transformar en clave:valor
      const formatted = rows.map((row: any[]) =>
         Object.fromEntries(row.map((val, i) => [headers[i], val])),
      );
      // console.log("🚀 ~ handleGetListaInvitados ~ formatted:", formatted);

      setDataInvitados(formatted);
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
      // if (!guestCode)
      const result = await Swal.fire({
         title: "Confirmar asistencia",
         text: `Has seleccionado a ${invitado.nombre}`,
         icon: "question",
         showCancelButton: true,
         confirmButtonText: "CONFIRMAR ASISTENCIA",
         cancelButtonText: "CANCELAR",
         reverseButtons: true,
         customClass: {
            confirmButton: "btn btn-success font-black mx-5", // daisyUI
            cancelButton: "btn btn-error font-black ml-2",
         },
         buttonsStyling: false, // importante para que DaisyUI maneje estilos
      });

      if (result.isConfirmed) {
         setIsLoading(true);
         await validateGuest(invitado.codigo);
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
                              if (!search) return true; // si está vacío, no filtra
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
                                 {/* <div>
                                 <img
                                    className="size-10 rounded-box"
                                    src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                                 />
                              </div> */}
                                 <div className="list-col-grow">
                                    <div className="font-semibold">
                                       {invitado.nombre}
                                    </div>
                                    <div className="text-xs uppercase opacity-60">
                                       {invitado.telefono}
                                    </div>
                                    <div className="flex w-full justify-between my-1">
                                       <div className="w-full text-center border-r-2">
                                          Invitados: <b>{invitado.personas}</b>
                                       </div>
                                       <div className="w-full text-center">
                                          Mesa: <b>{invitado.mesa}</b>
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
               {/* {dataAsistencia && ( */}
               <div className="flex flex-row justify-center items-center gap-6 mb-2 animate-fade-in">
                  <div className="flex flex-col items-center bg-base-200 rounded-lg px-4 py-2 shadow">
                     <span className="text-lg font-bold text-primary">
                        Invitaciones escaneadas
                     </span>
                     <span className="text-5xl font-extrabold text-primary">
                        {dataAsistencia.invitaciones ?? "-"}
                     </span>
                  </div>
                  <div className="flex flex-col items-center bg-base-200 rounded-lg px-4 py-2 shadow">
                     <span className="text-lg font-bold text-primary">
                        Pases acumulados
                     </span>
                     <span className="text-5xl font-extrabold text-primary">
                        {dataAsistencia.pases ?? "-"}
                     </span>
                  </div>
                  <button
                     className="btn btn-lg"
                     onClick={handleRefresh}
                     disabled={disabledButtonRefresh}>
                     <RefreshCwIcon
                        size={25}
                        className={`active:animate-spin ${
                           disabledButtonRefresh ? "animate-spin" : ""
                        }`}
                     />
                  </button>
               </div>
               {/* )} */}
               {error && (
                  <div className="bg-gradient-to-br from-red-100 to-red-200 border border-red-400 shadow-lg rounded-xl p-4 text-red-800 animate-fade-in">
                     <span className="text-2xl mr-2">{/* ❌⚠️ */}</span> {error}
                  </div>
               )}
            </div>
         </div>
      </>
   );
}
