import React, { createContext, useContext, useState } from "react";
import env from "../constants/env";
// import Toast from "../utils/Toast";
//mis colores
export const gpcLight = "#E9ECEF";
export const gpcDark = "#1E2126";
export const gpcDark100 = "#566173";
export const gpcDarkContrast = "#E9ECEF";
export const gpcBlue = "#1455CB";
export const gpcText = "#1455CB";
export const colorPrimaryMain = "#debb9a";
export const colorPrimaryDark = "#a46c38";
export const colorSecondaryMain = "#ad4432";
export const colorSecondaryDark = "#923929";
export const colorSecondaryLight = "#fdf3f1";

export const ROLE_SUPER_ADMIN = 1;
export const ROLE_ADMIN = 2;
// export const ROLE_CIUDADANO = 3;

export const GlobalContext = createContext();

const initialStateCounters = {
   requestAll: 0,
   requestByUser: 0,
   requestFinished: 0,
   requestInReview: 0,
   requestInEvaluate: 0,
   requestApproved: 0,
   requestPayed1: 0,
   requestPayed2: 0,
   requestPayed3: 0,
   requestPayed: 0,
   requestDelivered: 0,
   requestRejected: 0,
   requestCanceled: 0,
};
// export const API_EVENTS = `${env.API_URL}/events`;
// window.matchMedia("(prefers-color-scheme: dark)").matches
//    ? "dark"
//    : "light";
const theme = localStorage.getItem("theme");

export const GlobalContextProvider = ({ children }) => {
   const [themeActive, setThemeActive] = useState(theme);
   const [colorTableHeader, setColorTableHeader] = useState(false);

   const [isLoading, setIsLoading] = useState(false);
   const [cursorLoading, setCursorLoading] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);

   const [counters, setCounters] = useState(initialStateCounters);
   const resetCounters = () => {
      setCounters(initialStateCounters);
   };

   return (
      <GlobalContext.Provider
         value={{
            themeActive,
            setThemeActive,
            colorTableHeader,
            setColorTableHeader,
            isLoading,
            setIsLoading,
            cursorLoading,
            setCursorLoading,
            openDialog,
            setOpenDialog,
            counters,
            setCounters,
            resetCounters,
         }}>
         {children}
      </GlobalContext.Provider>
   );
};
export const useGlobalContext = () => useContext(GlobalContext);
