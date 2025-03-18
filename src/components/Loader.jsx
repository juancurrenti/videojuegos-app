/**
 * Componente Loader
 * Muestra un spinner centrado en pantalla para indicar que el contenido se esta cargando
 * @returns {JSX.Element} El elemento spinner
 */
const Loader = () => {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-neon-green"></div>
      </div>
    );
  };
  
  export default Loader;
  