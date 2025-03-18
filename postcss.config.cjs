module.exports = {
  plugins: [
    // Permite importar archivos CSS dentro de tus hojas de estilo
    require('postcss-import'),
    // Habilita la anidacion de selectores CSS (sintaxis CSS nesting)
    require('postcss-nesting'),
    // Integra Tailwind CSS en la cadena de procesamiento de PostCSS
    require('@tailwindcss/postcss'),
    // Añade prefijos especificos a las propiedades CSS para mejorar la compatibilidad entre navegadores
    require('autoprefixer')
  ]
};
