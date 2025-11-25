import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
   plugins: [react(), tailwindcss()],
   server: {
      host: true, // permite acceso desde la red local
      port: 5173, // opcional, puedes cambiarlo
   },
});
