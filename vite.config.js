import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Configuracion de Vite para un proyecto React
 *
 * Se utiliza el plugin oficial de React para Vite y se especifica el archivo
 * de configuracion de PostCSS
 *
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.cjs",
  },
});
