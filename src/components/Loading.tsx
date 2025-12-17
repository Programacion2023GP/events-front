import React, { JSX } from "react";
import images from "../constants/images";
import { useGlobalContext } from "../contexts/GlobalContext";

interface LoadingProps {
  /** Indica si el componente debe estar visible o no. */
  open: boolean;
  animation: "spin" | "bounce" | "typing" | "default";
}

/**
 * Componente de carga con fondo de Backdrop.
 * Muestra un texto de "CARGANDO" con una animación de puntos de carga.
 *
 * @param {boolean} open - Indica si el componente debe estar visible o no.
 *
 * @returns {JSX.Element} - El componente de carga.
 */
const Loading: React.FC<LoadingProps> = ({
  open,
  animation = "default",
}): JSX.Element => {
  const { themeActive } = useGlobalContext();
  // console.log("🚀 ~ themeActive:", themeActive);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center cursor-wait bg-black/75">
          {animation === "spin" ? (
            <div className="loader-circle-spinner">
              <img
                src={themeActive == "dark" ? images.logo : images.logo}
                alt="logo"
                className="loader-image"
              />
            </div>
          ) : animation === "bounce" ? (
            <span className="relative flex  items-center justify-center text-center">
              <div className="icon-loader inline-flex animate-[pulse_1.6s_infinite] opacity-5">
                <img
                  src={themeActive == "dark" ? images.logo : images.logo}
                  alt="logo"
                  className="loader-image"
                />
              </div>
              <img
                src={themeActive == "dark" ? images.logo : images.logo}
                alt="logo"
                className="relative inline-flex loader-image animate-[ping_1.5s_infinite]"
              />
            </span>
          ) : animation === "typing" ? (
            <div className="font-black text-primary-content text-6xl text-center animate-typing">
              <span className="loading loading-infinity loading-lg"></span>
              CARGANDO
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          ) : (
            <>
              <div className="loader-circle-spinner">
                <img
                  src={themeActive == "dark" ? images.logo : images.logo}
                  alt="logo"
                  className="loader-image"
                />
              </div>
              <br />
              <div className="font-black text-inherit text-center animate-typing">
                <span className="loading loading-infinity loading-lg"></span>
                CARGANDO
                <span className="loading loading-infinity loading-lg"></span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Loading;
