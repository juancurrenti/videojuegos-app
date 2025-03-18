import { useState } from "react";

/**
 * Componente de filtros para juegos
 * Permite filtrar por año, plataforma, tag y compañia (developer)
 * Al hacer clic en el boton "Filtrar", se envian los filtros seleccionados al
 * componente padre a traves de la funcion `onFilter`
 * @param {Object} props Props del componente
 * @param {Function} props.onFilter Funcion para manejar la aplicacion de filtros
 * @returns {JSX.Element} El componente de filtros*/
const Filters = ({ onFilter }) => {

    const [year, setYear] = useState('');
    const [platform, setPlatform] = useState('');
    const [tag, setTag] = useState('');
    const [developer, setDeveloper] = useState('');

    /**
     * Maneja la accion de filtrar
     * Llama a la funcion onFilter pasando los filtros actuales
     */
    const handleFilter = () => {
        onFilter({ year, platform, tag, developer });
    };

    return (
        <div className="d-flex gap-2 flex-wrap">

            <input
                type="number"
                placeholder="Filtrar por Año"
                className="form-control bg-dark text-light border-secondary"
                onChange={(e) => setYear(e.target.value)}
            />

            <select
                className="form-select bg-dark text-light border-secondary"
                onChange={(e) => setPlatform(e.target.value)}
            >
                <option value="">Todas las plataformas</option>
                <option value="4">PC</option>
                <option value="1">Xbox</option>
                <option value="18">PlayStation</option>
            </select>


            <input
                type="text"
                placeholder="Filtrar por Tag"
                className="form-control bg-dark text-light border-secondary"
                onChange={(e) => setTag(e.target.value)}
            />

            <input
                type="text"
                placeholder="Filtrar por Compañía"
                className="form-control bg-dark text-light border-secondary"
                onChange={(e) => setDeveloper(e.target.value)}
            />

            <button
                onClick={handleFilter}
                className="btn btn-outline-light"
            >
                Filtrar
            </button>
        </div>
    );
};

export default Filters;
