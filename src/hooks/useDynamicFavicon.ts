// src/hooks/useDynamicFavicon.ts
import { useEffect } from "react";
import images from "../constants/images";

export const useDynamicFavicon = () => {
   useEffect(() => {
      const updateFavicon = (isDark: boolean) => {
         const favicon = document.querySelector(
            "link[rel='icon']",
         ) as HTMLLinkElement;

         if (!favicon) return;

         favicon.href = isDark ? images.faviconDark : images.faviconLight;
      };

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Inicial
      updateFavicon(mediaQuery.matches);

      // Escucha cambios
      const listener = (e: MediaQueryListEvent) => updateFavicon(e.matches);
      mediaQuery.addEventListener("change", listener);

      return () => mediaQuery.removeEventListener("change", listener);
   }, []);
};
