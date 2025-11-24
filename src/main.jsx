import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalContextProvider } from "./contexts/GlobalContext.js";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ValidateQrPage from "./pages/ValidateQrPage.jsx";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <GlobalContextProvider>
         <HashRouter>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/validar" element={<ValidateQrPage />} />
            </Routes>
         </HashRouter>
      </GlobalContextProvider>
   </StrictMode>,
);
