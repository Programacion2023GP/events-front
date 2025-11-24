import React from "react";
import {
   Document,
   Page,
   Text,
   View,
   StyleSheet,
   Font,
   pdf,
   Image,
   Svg,
   Rect,
   Link,
} from "@react-pdf/renderer";
import { formatDatetime } from "../utils/formats";
// import { QRCode } from "react-qrcode";
// import QRCode from "qrcode";
import QRCode from "qrcode-generator";
import images from "../constants/images";
import TTDrugsTrialBold from "../assets/fonts/TT-Drugs-Trial-Bold.otf";
import TTDrugsTrialRegular from "../assets/fonts/TT-Drugs-Trial-Regular.otf";

// Registrar fuentes
Font.register({
   family: "TTDrugsTrialBold",
   src: TTDrugsTrialBold,
});
Font.register({
   family: "TTDrugsTrialRegular",
   src: TTDrugsTrialRegular,
});

// Estilos para el PDF
const styles = StyleSheet.create({
   page: {
      backgroundColor: "transparent", //"#fff0f5",
      padding: 30,
      position: "relative",
      fontFamily: "TTDrugsTrialRegular", // Fuente por defecto
   },
   bold: {
      fontFamily: "TTDrugsTrialBold", // Fuente por defecto
   },
   backgroundImage: {
      position: "absolute",
      minWidth: "100%",
      minHeight: "100%",
      top: 0,
      left: 0,
      opacity: 1, // Ajusta la opacidad según necesites
   },
   content: {
      position: "relative", // Para que aparezca sobre el fondo
   },
   section: {
      margin: 10,
      padding: 10,
   },
   title: {
      fontSize: 24,
      marginBottom: 10,
      textAlign: "center",
      color: "#e11d48",
   },
   text: {
      fontSize: 14,
      margin: 2,
      color: "#fff",
      fontFamily: "TTDrugsTrialBold", // Fuente por defecto
   },
   textBold: {
      fontSize: 14,
      margin: 2,
      color: "#fff",
   },
   textMuted: {
      fontSize: 10,
      margin: 1,
      color: "#fff",
   },
   textContainer: {
      display: "flex",
      justifyContent: "center", // Centrado horizontal
      // position: "absolute", // Necesario para el hijo absoluto
      alignItems: "center", // Opcional: si usas flexbox dentro
      top: 370 + 100,
      // left: "50%", // Punto de partida al 50% del padre
      // transform: "translateX(-50%)", // Retrocede el 50% de su propio ancho
   },
   qrContainer: {
      display: "flex",
      justifyContent: "center", // Centrado horizontal
      position: "absolute",
      top: 370,
      left: "50%", // Punto de partida al 50% del padre
      transform: "translateX(-50%)", // Retrocede el 50% de su propio ancho
      // alignItems: "center", // Opcional: si usas flexbox dentro
      // // width: "auto" // Opcional: si necesitas límite de ancho
   },
   qr: {
      width: 128,
      height: 128,
      marginTop: 20,
      alignSelf: "center",
   },
});

// Componente QRCode con SVG nativo
const PDFQRCode = ({ value, size = 110 }: { value: string; size?: number }) => {
   // Esta es una implementación simplificada. En producción, usa una librería para generar el patrón QR real
   const qrData = generateQRMatrix(value); // Función que convierte el texto en matriz QR

   const cellSize = size / qrData.length;

   return (
      <Svg
         width={size}
         height={size}
         viewBox={`0 0 ${size} ${size}`}
         opacity={0.8}>
         {qrData.map((row, y) =>
            row.map((cell, x) => (
               <Rect
                  key={`${x}-${y}`}
                  x={x * cellSize}
                  y={y * cellSize}
                  width={cellSize}
                  height={cellSize}
                  fill={cell ? "#000" : "#FFF"} //#b28121 | #9C7014
               />
            )),
         )}
      </Svg>
   );
};

// Función simplificada para generar matriz QR (debes reemplazarla con un generador real)
function generateQRMatrix(text: string): number[][] {
   const qr = QRCode(0, "L"); // Tipo L (Low error correction)
   qr.addData(text);
   qr.make();

   const size = qr.getModuleCount();
   const matrix: number[][] = [];

   for (let y = 0; y < size; y++) {
      matrix[y] = [];
      for (let x = 0; x < size; x++) {
         matrix[y][x] = qr.isDark(y, x) ? 1 : 0;
      }
   }

   return matrix;
}

const InvitationPDF = ({
   backgroundImage,
   name,
   weddingInfo,
   qrValue,
   guests = 0,
   table = 0,
}) => (
   <Document>
      <Page size="A5" style={styles.page}>
         {/* Imagen de fondo */}
         {backgroundImage && (
            <Image
               src={backgroundImage}
               style={styles.backgroundImage}
               fixed // Evita que se repita
            />
         )}

         {/* Contenido principal */}
         <View style={styles.content}>
            <View style={styles.section}>
               {/* <Text style={styles.title}>Invitación a Nuestra Boda</Text>
               <Text style={styles.text}>¡Hola {name}!,</Text>
               <Text style={styles.text}>
                  Nos complace invitarte a nuestra boda.
               </Text>
               <Text style={styles.text}>
                  Este es tu boleto de acceso para nuestra boda. Por favor,
                  preséntalo el día del evento.
               </Text>*/}
               <View style={styles.qrContainer}>
                  {/* <Link href={weddingInfo.mapsUrl}>
                     ${weddingInfo.weddingPlace}, ${weddingInfo.location}
                  </Link> */}
                  {/* Mostrar el QR como imagen */}
                  <PDFQRCode value={qrValue} />
               </View>
               <View style={styles.textContainer}>
                  <Text style={styles.textMuted}>
                     <Text style={styles.bold}>{name}</Text>
                  </Text>
                  <Text style={styles.textMuted}>
                     Pase para: <Text style={styles.bold}>{guests}</Text>{" "}
                     {guests > 1 ? "personas" : "persona"}
                  </Text>
                  {table > 0 && (
                     <Text style={styles.textMuted}>
                        N° Mesa: <Text style={styles.bold}>{table}</Text>
                     </Text>
                  )}
               </View>
            </View>
         </View>
      </Page>
   </Document>
);

export default InvitationPDF;
