import React from "react";
// import Grid from "@mui/material/Grid2";

interface DividerProps {
   /** Texto que se mostrará en el divisor */
   text?: string;
   /** Posición del texto en el divisor: `start`, `center`, o `end` */
   position?: "start" | "center" | "end";
   /** Dirección del divisor: `horizontal` o `vertical` */
   direction?: "horizontal" | "vertical";
   /** Color del divisor basado en los colores de DaisyUI */
   color?:
      | "primary"
      | "secondary"
      | "accent"
      | "neutral"
      | "info"
      | "success"
      | "warning"
      | "error";
   /** margen superior */
   mt?: number;
   /** margen inferior */
   mb?: number;
   classNamme?: string;
}

/**
 * Componente Divider que separa contenido con un texto opcional en el centro
 * y personalizable en color y dirección.
 *
 * @component
 * @param {DividerProps} props - Propiedades del componente.
 * @returns {JSX.Element} Un elemento divisor estilizado.
 */
const Divider: React.FC<DividerProps> = ({
   text = "",
   position = "center",
   direction = "horizontal",
   className,
   color = "",
   mt,
   mb,
}) => {
   // Clases de TailwindCSS y DaisyUI para personalizar el divisor
   const dividerClasses = `
    divider ${direction === "vertical" ? "divider-vertical" : ""} ${
      color ? `divider-${color}` : ""
   } ${
      position === "start"
         ? "divider-start"
         : position === "end"
         ? "divider-end"
         : ""
   }
  `;

   return (
      <div className="flex w-full flex-col">
         <div
            className={`divider ${dividerClasses} mt-${mt} mb-${mb} ${className}`}>
            {text}
         </div>
      </div>
      // <Grid container width={"100%"}>
      //    <div
      //       className={`flex w-full ${
      //          direction === "horizontal" ? "flex-col" : ""
      //       }`}>
      //       <div className={`${dividerClasses} mt-${mt} mb-${mb}`}>
      //          {text}
      //       </div>
      //    </div>
      // </Grid>
   );
};

export default Divider;
