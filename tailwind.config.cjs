/**
 * Configuración de Tailwind CSS
 *
 * Define las rutas donde Tailwind buscara clases utilizadas para generar estilos,
 * extiende el tema con colores personalizados, animaciones y breakpoints adicionales
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff88',
        'blue-400': '#60a5fa',
      },
      animation: {
        spin: 'spin 1.5s linear infinite',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};
