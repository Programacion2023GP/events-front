import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalContextProvider } from "./contexts/GlobalContext.js";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ValidateQrPage from "./pages/ValidateQrPage.jsx";
import { invitationData_100Dias } from "./data/100-dias";
import { invitationData_cadi } from "./data/cadi.js";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <GlobalContextProvider>
         <HashRouter>
            <Routes>
               {/* <Route
                  path="/plan-municipal-de-desarrollo-2025-2028/:tel"
                  element={<HomePage />}
               /> */}
               <Route
                  path="/100-dias/:tel?"
                  element={<HomePage invitationData={invitationData_100Dias} />}
               />
               <Route path="/100-dias/validar" element={<ValidateQrPage  />} />
               
               <Route
                  path="/cadi/:tel?"
                  element={<HomePage invitationData={invitationData_cadi} />}
               />
            </Routes>
         </HashRouter>
      </GlobalContextProvider>
   </StrictMode>,
);
