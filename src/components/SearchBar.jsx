/**
 * Componente Searchbar
 * Renderiza un input de busqueda que envia el valor ingresado a través del callback `onSearch`
 * cada vez que el usuario escribe en el
 *
 * @param {Object} props Propiedades del componente
 * @param {Function} props.onSearch Funcion que se ejecuta cuando el usuario ingresa texto
 * @returns {JSX.Element} El componente Searchbar
 */
const Searchbar = ({ onSearch }) => {
    return (
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Busqueda..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-5 py-4 bg-gray-700/50 backdrop-blur-sm text-white rounded-xl border-2 border-gray-600 focus:border-neon-green focus:ring-4 focus:ring-neon-green/20 transition-all outline-none"
          />
        </div>
      </div>
    );
  };
  
  export default Searchbar;
  