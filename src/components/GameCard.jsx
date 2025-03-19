import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

/**
 * Componente que muestra una tarjeta de juego con imagen, nombre y un boton de detalles.
 */
const GameCard = ({ game }) => {
  return (
    <div className="group relative bg-gray-800/50 hover:bg-gray-800/80 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-neon-green">
      {/* Contenedor de la imagen */}
      <div className="relative overflow-hidden">
        {/* Envoltura de la imagen en un <Link> para redirigir al hacer clic */}
        <Link to={`/game/${game.id}`} className="block">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        
        {/* Badge con el año de lanzamiento o "Classic" */}
        <Badge pill bg="success" className="position-absolute top-2 end-2 fs-6">
          {game.released ? new Date(game.released).getFullYear() : "Classic"}
        </Badge>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <h3 className="text-white fw-bold fs-5 mb-3 truncate">{game.name}</h3>
        <div className="d-flex justify-content-between align-items-center">
          {/* Botón de detalles (se mantiene) */}
          <Link
            to={`/game/${game.id}`}
            className="btn btn-sm btn-outline-light d-flex align-items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
