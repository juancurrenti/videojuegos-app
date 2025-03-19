import { useEffect, useState } from "react";
import { getTopGames, getGamesWithFilters, searchGames } from "../services/rawgApi";
import GameCard from "../components/GameCard";
import Filters from "../components/Filters";
import Searchbar from "../components/SearchBar";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * Componente Home.
 * Página principal que muestra un listado de videojuegos. Permite buscar y filtrar juegos
 * usando los componentes Searchbar y Filters, y utiliza la API RAWG para obtener los datos.
 *
 * @returns {JSX.Element} La página principal de videojuegos.
 */
const Home = () => {
  const [games, setGames] = useState([]);
  // Estado para mostrar/ocultar filtros
  const [showFilters, setShowFilters] = useState(true);

  /**
   * Maneja la búsqueda de juegos basada en la consulta ingresada.
   *
   * @param {string} query - Texto de búsqueda ingresado por el usuario.
   */
  const handleSearch = async (query) => {
    try {
      const data = await searchGames(query);
      setGames(data);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  /**
   * Maneja el cambio de filtros y actualiza el listado de juegos.
   *
   * @param {Object} filter - Objeto que contiene los filtros seleccionados (año, plataforma, tag, developer).
   */
  const handleFilterChange = async (filter) => {
    try {
      const filteredGames = await getGamesWithFilters(filter);
      setGames(filteredGames);
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    }
  };

  // Carga inicial de juegos
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getTopGames();
        // Filtra juegos duplicados
        const uniqueGames = data.filter(
          (game, index, self) => self.findIndex(g => g.id === game.id) === index
        );
        setGames(uniqueGames);
      } catch (error) {
        console.error("Error al cargar los juegos:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Container className="py-5 text-light">
        {/* Encabezado con búsqueda y filtros */}
        <div className="bg-gray-800 p-4 rounded-xl mb-8 shadow-lg">
          <Row className="align-items-center">
            <Col md={8} className="mb-3 mb-md-0">
              <h1 className="display-5 fw-bold mb-1">Video Juegos</h1>
              <Searchbar onSearch={handleSearch} />
            </Col>

            {/* Botón para mostrar/ocultar los filtros */}
            <Col md={4}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-sm btn-outline-light mb-2"
              >
                {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
              </button>

              {/* Si showFilters es true, renderizamos el componente de filtros */}
              {showFilters && (
                <Filters onFilter={handleFilterChange} />
              )}
            </Col>
          </Row>
        </div>

        {/* Listado de juegos */}
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {games.map((game) => (
            <Col key={game.id}>
              <GameCard game={game} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
