import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameDetails } from "../services/rawgApi";
import Loader from "../components/Loader";

/**
 * Componente GameDetail
 *
 * Obtiene y muestra los detalles de un juego utilizando el parametro `id` de la URL
 * 
 * Muestra la imagen principal, el video (si existe), los detalles del juego (puntuacion, año,
 * generos, plataformas) y la descripcion, tambien incluye una barra superior con un enlace
 * para volver a la pagina principal
 *
 * @returns {JSX.Element} El componente de detalles del juego
 */
const GameDetail = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGameDetails(id);
        setGame(data);
      } catch (err) {
        setError("Error al cargar los detalles del videojuego");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (error)
    return <p className="text-red-500 text-center mt-8 text-xl">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gradient-to-r from-green-400 to-blue-500 w-full px-4 py-2">
        <Link to="/" className="text-white font-semibold hover:underline">
          Home
        </Link>
      </header>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="wrapper mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl font-bold text-neon-green mb-4">
              {game.name}
            </h1>
            <img
              src={game.background_image}
              alt={game.name}
              className="w-full h-96 object-cover rounded-xl shadow-xl"
            />
            {game.clip && (
              <div className="rounded-xl overflow-hidden shadow-xl">
                <video controls className="w-full">
                  <source src={game.clip.clip} type="video/mp4" />
                  Tu navegador no soporta videos.
                </video>
              </div>
            )}
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl shadow-xl h-fit">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-700/30 p-4 rounded-lg">
                <h2 className="text-2xl font-bold text-neon-green mb-4">
                  Detalles del Juego
                </h2>
                <div className="space-y-3">
                  <DetailItem label="Puntuación" value={game.metacritic} />
                  <DetailItem label="Año de lanzamiento" value={game.released} />
                  <DetailItem label="Géneros">
                    {game.genres.map((g) => (
                      <span key={g.id} className="genre-badge">
                        {g.name}
                      </span>
                    ))}
                  </DetailItem>
                  <DetailItem label="Plataformas">
                    {game.platforms.map((p) => (
                      <span key={p.platform.id} className="platform-badge">
                        {p.platform.name}
                      </span>
                    ))}
                  </DetailItem>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-neon-green mb-3">
                  Descripcion
                </h3>
                <div
                  className="prose prose-invert text-gray-300"
                  dangerouslySetInnerHTML={{ __html: game.description }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Componente DetailItem
 * Muestra un detalle del juego con una etiqueta y su correspondiente valor o elementos hijos.
 *
 * @param {Object} props Props del componente
 * @param {string} props.label La etiqueta del detalle
 * @param {string|number} [props.value] El valor del detalle (opcional)
 * @param {React.ReactNode} [props.children] Elementos adicionales (por ejemplo, badges de generos o plataformas)
 * @returns {JSX.Element} El item de detalle renderizado
 */
const DetailItem = ({ label, value, children }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-sm font-semibold text-gray-400">{label}</span>
    {value && <span className="text-lg text-gray-100">{value}</span>}
    {children && (
      <div className="flex flex-wrap gap-2 mt-1">
        {children}
      </div>
    )}
  </div>
);

export default GameDetail;
