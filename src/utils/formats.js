// import Toast from "./Toast";
import dayjs from "dayjs";
import "dayjs/locale/es"; // importa el locale español
dayjs.locale("es"); // establece el locale global a español

//#region /** FECHAS - FORMATEADO */
function validateRangeDates(action, input_initial_date, input_final_date) {
   let current_date = new Date();
   let yesterday = new Date(current_date.setDate(current_date.getDate() - 1));
   yesterday = new Date(yesterday.setHours(23, 59, 59));
   yesterday = yesterday.getTime();

   let date1 = new Date(input_initial_date.val());
   date1 = new Date(date1.setDate(date1.getDate() + 1));
   date1 = new Date(date1.setHours(0, 0, 0));
   let data_date1 = new Date(date1).getTime();

   let date2 = new Date(input_final_date.val());
   date2 = new Date(date2.setDate(date2.getDate() + 1));
   date2 = new Date(date2.setHours(11, 59, 59));
   let data_date2 = new Date(date2).getTime();

   if (action == "create") {
      if (data_date1 <= yesterday) {
         // showToast("warning", "No puedes publicar con fecha anterior a hoy.");
         input_initial_date.focus();
         return false;
      }
   }
   if (data_date1 > data_date2) {
      // showToast("warning", "Rango de fechas inválido.");
      input_final_date.focus();
      return false;
   }
   return true;
}

function binaryDateTimeFormat(the_date) {
   let date = new Date(parseInt(the_date.substr(6)));
   let datetime = dayjs(date).format("MM-DD-YYYY h:mm:ss a");
   // let datetime = new Intl.DateTimeFormat("es-MX", { day: '2-digit', month: '2-digit', year: 'numeric', hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(date);

   return datetime;
}

export function formatDatetime(the_date, long_format = true, format = null) {
   if (the_date == null) return "Sin Fecha";
   //#region OPCION DayJS
   dayjs.locale("es");
   let date = new Date(the_date);
   let datetime;

   // if (the_date.length <= 10) {
   //    date = new Date(date.setDate(date.getDate() + 1));
   //    return (datetime = dayjs(date).format("DD-MM-YYYY"));
   // }

   date = new Date(the_date);
   const formato = !format
      ? long_format
         ? "DD-MM-YYYY h:mm:ss a"
         : "DD-MM-YYYY"
      : format;
   return (datetime = dayjs(date).format(formato));
   //#endregion OPCION DayJS

   //#region OPCION Intl
   // return datetime = new Intl.DateTimeFormat("es-MX", { day: '2-digit', month: '2-digit', year: 'numeric', hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(date);
   //#endregion OPCION Intl
}

/**
 * Obtener la edad por su fecha de nacimiento.
 *
 * @param {string | date | datetime} birthdate Año de nacimiento de la persona
 * @returns {int} age La edad
 */
export function getAge(birthdate, reference = new Date()) {
   if (birthdate == null) return "Sin Fecha";
   dayjs.locale("es");
   const date = new Date(birthdate);
   // const today = new Date();
   // const formato = !format ? (long_format ? "DD-MM-YYYY h:mm:ss a" : "DD-MM-YYYY") : format;

   const age = dayjs(reference).diff(date, "years");
   return age;
}

export function formatDatetimeToSQL(the_date) {
   let datetime = dayjs(the_date).format("YYYY-MM-DDTh:mm:ss");
   return datetime;
}
//#endregion /** FECHAS - FORMATEADO */

export function formatCurrency(amount, MX = true, show_currency = true) {
   let divisa = "MXN";
   let total = new Intl.NumberFormat("es-MX").format(amount);
   if (!MX) {
      divisa = "USD";
      total = new Intl.NumberFormat("en-US").format(amount);
   }

   if (!total.includes(".")) total += ".00";
   let decimales = total.split(".").reverse();
   if (decimales[0].length == 1) total += "0";
   if (amount == 0) total == "0.00";
   show_currency ? (total = `$${total} ${divisa}`) : (total = `$${total}`);

   return total;
}
// export function formatearCantidadDeRenglones(tds) {
//    $.each(tds, function (i, elemento) {
//       let td = $(elemento);
//       let cantidad = td.text();
//       let cantidad_formateada = formatCurrency(cantidad);
//       td.html(`${cantidad_formateada}`);
//    });
// }

export function formatPhone(phone) {
   if (!phone) return "Sin numero";
   return `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(
      6,
      8,
   )}${phone.slice(-2)}`;
}
export function formatCardNumber(cardNumber) {
   if (!cardNumber) return "0000 0000 0000 0000";
   return `${cardNumber.slice(0, 4)} ${cardNumber.slice(
      4,
      8,
   )} ${cardNumber.slice(8, 12)} ${cardNumber.slice(-4)}`;
}
export const handlePhoneChange = (e, setFieldValue, input) => {
   // console.log("🚀 ~ handlePhoneChange ~ e:", e.target.value.replace(/[^\d]/g, ""));
   // Reemplaza los caracteres no numéricos en el input
   const cleanedValue = e.target.value.replace(/[^\d]/g, "");
   setFieldValue(input, cleanedValue);
};

export function formatToLowerCase(event) {
   const newText = event.target.value.toLowerCase();
   return newText;
}
export function formatToUpperCase(event) {
   const newText = event.target.value.toUpperCase();
   return newText;
}

export const handleInputFormik = async (
   e,
   setFieldValue,
   input,
   toUpper = true,
) => {
   try {
      const newText = toUpper
         ? await formatToUpperCase(e)
         : await formatToLowerCase(e);
      setFieldValue(input, newText);
   } catch (error) {
      console.log(error);
      // Toast.Error(error);
   }
};
export const handleInputStringCase = async (e, setState, toUpper = true) => {
   try {
      const newText = toUpper
         ? await formatToUpperCase(e)
         : await formatToLowerCase(e);
      setState(newText);
   } catch (error) {
      console.log(error);
      // Toast.Error(error);
   }
};

export const splitArroba = (string, returnFirst = true) => {
   try {
      const array = string.split("@");
      const value = returnFirst ? array[0] : array.reverse()[0];
      return value;
   } catch (error) {
      console.log(error);
      // Toast.Error(error);
   }
};

/**
 * const groupedData = groupBy(data, "category");
 *
 * @param {array} data - la data
 * @param {string} key - nombre de la propiedad para filtrar
 * @param {boolean} returnArray - retornar el valor como array o como objeto
 * @param {boolean} consoleLogResult - por si quieres ver el resultaod en consola
 * @returns La data filtrada
 */
export const groupBy = (data, key, returnArray, consoleLogResult = false) => {
   let result = data.reduce((result, currentValue) => {
      const keys = key.includes(".") && key.split(".");

      // Extraer el valor clave
      const keyValue = keys
         ? currentValue[keys[0]][keys[1]]
         : currentValue[key];

      // Si el valor clave no existe en el objeto de resultado, cree datos para él
      if (!result[keyValue]) {
         result[keyValue] = [];
      }

      // Agregue el valor actual a los datos correspondientes.
      result[keyValue].push(currentValue);

      return result;
   }, {});
   if (returnArray) result = Object.entries(result);

   if (consoleLogResult)
      console.log(
         `🚀 ~ groupBy ~ result ${returnArray ? "array" : "object"}:`,
         result,
      );
   return result;
};

/**
 * const groupedData = getKeys(obj, prefix);
 *
 * @param {array} obj - objeto a obtener llavez
 * @param {string} key - nombre de la propiedad para filtrar
 * @param {boolean} returnArray - retornar el valor como array o como objeto
 * @param {boolean} consoleLogResult - por si quieres ver el resultaod en consola
 * @returns La data filtrada
 */
export const getKeys = (obj, prefix = "") => {
   return Object.entries(obj).flatMap(([key, value]) => {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
         value !== null &&
         typeof value === "object" &&
         !Array.isArray(value)
      ) {
         return getKeys(value, newKey);
      }

      return newKey;
   });
};

/**
 *
 * @param {array<objecT>} data - para arreglos de objetos [{}]
 * @param {string} key - nombre de la propiedad por la cual se desea filtrar
 * @returns {array}
 */
export const unifyBy = (data, key) => {
   return Array.from(new Map(data.map((item) => [item[key], item])).values());
};

export const cutLinesPDF = (text, lengthRow = 100) => {
   if (typeof text != "string") return;
   // console.log("🚀 ~ cutLinesPDF ~ text:", text);
   const lines = text.split(/\r\n|\n/);
   const rows = [];
   lines.map((line) => {
      for (let i = 0; i < line.length; i += lengthRow) {
         const fragment = line.slice(i, i + lengthRow);
         rows.push(fragment);
      }
   });
   // console.log("🚀 ~ cutLinesPDF ~ rows:", rows);
   return rows;
};

const unidades = [
   "",
   "uno",
   "dos",
   "tres",
   "cuatro",
   "cinco",
   "seis",
   "siete",
   "ocho",
   "nueve",
];
const especiales = [
   "diez",
   "once",
   "doce",
   "trece",
   "catorce",
   "quince",
   "dieciséis",
   "diecisiete",
   "dieciocho",
   "diecinueve",
];
const decenas = [
   "",
   "diez",
   "veinte",
   "treinta",
   "cuarenta",
   "cincuenta",
   "sesenta",
   "setenta",
   "ochenta",
   "noventa",
];
const centenas = [
   "",
   "cien",
   "doscientos",
   "trescientos",
   "cuatrocientos",
   "quinientos",
   "seiscientos",
   "setecientos",
   "ochocientos",
   "novecientos",
];
/**
 * Transformará la cantidad de un número y la retornará en texto, por el momento limitada hasta el 99,999.99
 * @param {number} number
 */
export const numberToText = (number) => {
   try {
      return convertirNumeroATexto(number);

      function convertirNumeroATexto(numero) {
         let [enteros, decimales] = numero.toString().split(".");

         let textoEnteros = convertirParteEntera(enteros);
         let textoDecimales = convertirParteDecimal(decimales);

         let resultado = `son ${textoEnteros} peso${
            parseInt(enteros) !== 1 ? "s" : ""
         }`;
         if (textoDecimales) {
            resultado += ` con ${textoDecimales} centavo${
               parseInt(decimales) !== 1 ? "s" : ""
            }`;
         }

         return resultado;
      }

      function convertirParteEntera(numero) {
         if (numero === "0") return "cero";

         let partes = [];
         let num = parseInt(numero, 10);
         // console.log("🚀 ~ convertirParteEntera ~ num:", num);

         if (num >= 10000 && num < 20000) {
            partes.push(
               `${especiales[parseInt(num.toString().slice(0, 2)) - 10]} mil`,
            );
            num = num % 1000;
         } else if (num >= 20000 && num <= 100000) {
            const miles = Math.floor(num / 1000);
            if (miles >= 30)
               partes.push(
                  `${
                     decenas[
                        Math.floor(parseInt(num.toString().slice(0, 2)) / 10)
                     ]
                  }`,
               );
            num = num % 10000;

            if (miles === 20) {
               partes.push("veinte mil");
               num = num % 1000;
            } else if (miles === 21) {
               partes.push("veintiún mil");
               num = num % 1000;
            } else if (miles >= 22 && miles < 30) {
               partes.push(`veinti${unidades[Math.floor(num / 1000)]} mil`);
               num = num % 1000;
            } else {
               if (miles % 10 > 0) partes.push("y");
               if (miles % 10 === 1) partes.push("un mil");
               else partes.push(`${unidades[Math.floor(num / 1000)]} mil`);
               num = num % 1000;
            }
         } else if (num >= 1000) {
            partes.push(`${unidades[Math.floor(num / 1000)]} mil`);
            num = num % 1000;
         }

         if (num >= 100) {
            if (num >= 101 && num < 200) {
               partes.push("ciento");
            } else {
               partes.push(centenas[Math.floor(num / 100)]);
            }
            num = num % 100;
         }

         if (num >= 10 && num < 20) {
            partes.push(especiales[num - 10]);
         } else {
            const dec = Math.floor(num / 10);
            if (dec >= 3) partes.push(decenas[Math.floor(num / 10)]);
            if (dec === 2) {
               const uni = num % 10;
               num = num % 10;

               if (uni === 0) partes.push("veinte");
               else if (uni === 1) partes.push("veintiún");
               else partes.push(`veinti${unidades[num]}`);
            } else {
               num = num % 10;
               if (dec >= 3 && num > 0) partes.push("y");
               if (
                  includesInArray(partes, ["cien", "ciento", "mil"]) &&
                  num === 1
               )
                  partes.push("un");
               else partes.push(unidades[num]);
            }
         }

         return partes
            .filter((p) => p !== "")
            .join(" ")
            .trim();
      }

      function convertirParteDecimal(numero) {
         if (!numero) return "";

         if (numero.length === 1) {
            numero += "0";
         }

         return convertirParteEntera(numero);
      }
   } catch (error) {
      console.log("🚀 ~ includesInArray ~ error:", error);
      // Toast.Error(error);
   }
};

/**
 * Esta función nos ayuda a saber si almenos un valor de un array se encuentra en otro array o todos los valores, segun se indique en allValues
 * @param {[*]} array1 - Array que se desea inspeccionar
 * @param {[*]} array2 - Array de valores a buscar
 * @param {boolean} allValues - Indicar si deseas que coinsidan todos los valores del array2 (true) o almenos uno (false)
 * @returns {boolean}
 */
export const includesInArray = (array1, array2, allValues = false) => {
   try {
      let res = false;
      if (allValues) {
         res = array2.every((element) => array1.includes(element));
         // console.log("🚀 ~ includesInArray ~ allValues ~ res:", res);
      } else {
         const results = array2.map((element) => array1.includes(element));
         res = results.some((result) => result === true);
         // console.log("🚀 ~ includesInArray ~ res:", res);
      }
      return res;
   } catch (error) {
      console.log("🚀 ~ includesInArray ~ error:", error);
      // Toast.Error(error);
   }
};

/**
 * Función para convertir la imagen en un tipo "File-like"
 * @param {string} uri  Url para obtenrer el contenido de la imagen
 * @param {string} fileName   Nombre que se le asignara al File
 * @param {string} mimeType   Tipo de mime de la imagen a exportar
 * @returns
 */
export const convertImageToFile = async (uri, fileName, mimeType) => {
   // Crear un "File-like" object (Blob) para usarlo en FormData
   const file = {
      uri, // El uri de la imagen para React Native
      name: fileName, // Nombre del archivo
      type: mimeType, // Tipo MIME (image/jpeg, image/png, etc.)

      originalName: uri,
      fileName: fileName,
      mimeType: mimeType,
   };

   // const response = await fetch(uri); // Obtener el contenido del archivo
   // const blob = await response.blob(); // Convertir la respuesta en un Blob (similar a File en web)
   // const file = new File([blob], fileName, {
   //    type: mimeType,
   //    lastModified: new Date().toISOString(),
   // });

   // console.log("🚀 ~ convertImageToFile ~ file:", file);
   return file;
};

export const base64ToFile = async (base64String, fileName) => {
   const response = await fetch(base64String);
   const blob = await response.blob();
   return new File([blob], fileName, { type: blob.type });
};

/**
 * Esta función nos ayuda a convertir un objeto sencillo a un tipo FormData
 * @param {{}} objForm Formulario con una estructura de objeto sencillo
 * @returns
 */
export const convertToFormData = async (objForm) => {
   const formData = new FormData();
   Object.keys(objForm).map((key) => {
      if (typeof objForm[key] === "object" && objForm[key] != null) {
         if (
            includesInArray(
               Object.keys(objForm[key]),
               ["uri", "name", "type"],
               true,
            )
         )
            formData.append(key, {
               uri: objForm[key].uri,
               name: objForm[key].name,
               type: objForm[key].type,
            });
         else formData.append(key, JSON.stringify(objForm[key]));
      } else formData.append(key, objForm[key]);
   });

   return formData;
};

/**
 * Esta función nos ayuda a quitar los datos duplicados de un array
 * @param {Array} array - Lista de elementos a remover
 * @returns
 */
export const removeDuplicates = (array) => {
   return [...new Set(array)];
};

/**
 * Función para filtrar propiedades basadas en el objeto original,
 * si tenes un objeto con más propiedades de las originales,
 * seran ignoradas.
 * @param {object} original objeto original
 * @param {object} newArray objeto con valores nuevos
 * @returns {object}
 */
export function setPropsOriginals(original, newArray) {
   return Object.keys(original).reduce((obj, key) => {
      if (newArray.hasOwnProperty(key)) {
         obj[key] = newArray[key];
      }
      return obj;
   }, {});
}

/**
 *
 * @param {array} data - Arreglo donde buscará la información
 * @param {string} searchKey - Nombre de la propiedad (puede ser anidada con ".")
 * @param {[string]} values - Valores de búsqueda (si isBool es true, se ignora)
 * @param {boolean} isBool - Si es true, verifica si la propiedad es null
 * @returns {array}
 */
export function search(data, searchKey, values = [], isBool = false) {
   const [key, subkey] = searchKey.split(".");

   return data.filter((item) => {
      const value = subkey ? item?.[key]?.[subkey] : item?.[key];

      if (isBool) {
         // Si es booleano, simplemente verifica si la propiedad es null
         return values[0] ? value !== null : value === null;
      }

      // Si no es booleano, sigue con la búsqueda normal
      return values.length > 0
         ? values.some((filtro) =>
              String(value ?? "")
                 .toLowerCase()
                 .includes(String(filtro).toLowerCase()),
           )
         : false;
   });
}

/**
 * Funcion para extrare las propiedes que sean true
 * @param {object} data - Objeto donde se buscara la información
 * @param {any} refValue - Valor de referencia para extraer coincidencias
 * @returns
 */
export const getKeysBy = (data, refValue) => {
   const keysEnTrue = Object.entries(data)
      .filter(([_, refValue]) => refValue) // Filtra solo los que tienen valor `true`
      .map(([key]) => key); // Extrae las claves
   return keysEnTrue;
};

/**
 * Obtener el navegador usado en el dispositivo
 * @returns
 */
export const detectOS = () => {
   const userAgent = navigator.userAgent || navigator.vendor;

   if (/android/i.test(userAgent)) return "Android";
   if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
   if (/Windows NT/.test(userAgent)) return "Windows";
   if (/Macintosh/.test(userAgent)) return "MacOS";
   if (/Linux/.test(userAgent)) return "Linux";
   if (/HarmonyOS/i.test(userAgent)) return "HarmonyOS";

   return "Other";
};

export const getLinkWhatsApp = (phone, message) => {
   const phoneNumber = `521${phone}`;
   const messageEncode = encodeURIComponent(message);
   return `https://wa.me/${phoneNumber}?text=${messageEncode}`;
};

// export const RenderJsonComponent = ({ jsonData }) => {
//    return (
//       <div>
//          <h3>Datos JSON</h3>
//          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
//       </div>
//    );
// };

// export const RenderFileComponent = ({ file }) => {
//    return (
//       <div>
//          <h3>Detalles del Archivo</h3>
//          <p>
//             <strong>Nombre:</strong> {file.name}
//          </p>
//          <p>
//             <strong>Tamaño:</strong> {(file.size / 1024).toFixed(2)} KB
//          </p>
//          <p>
//             <strong>Tipo:</strong> {file.type}
//          </p>
//       </div>
//    );
// };
