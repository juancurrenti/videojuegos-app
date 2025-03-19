import { useEffect, useState } from "react";
import { getTopGames, getGamesWithFilters, searchGames } from "../services/rawgApi";
import GameCard from "../components/GameCard";
import Filters from "../components/Filters";
import Searchbar from "../components/SearchBar";
import { Container, Row, Col, Card, Badge, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * Componente Home
 * Pagina principal que muestra un listado de videojuegos. Permite buscar y filtrar juegos
 * usando los componentes Searchbar y Filters, y utiliza la API RAWG para obtener los datos
 *
 * @returns {JSX.Element} La pagina principal de videojuegos
 */
const Home = () => {
  const [games, setGames] = useState([]);

  /**
   * Maneja la busqueda de juegos basandose en la consulta ingresada
   *
   * @param {string} query - Texto de busqueda ingresado por el usuario
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
   * Maneja el cambio de filtros y actualiza el listado de juegos
   *
   * @param {Object} filter - Objeto que contiene los filtros seleccionados (año, plataforma, tag, developer)
   */
  const handleFilterChange = async (filter) => {
    try {
      const filteredGames = await getGamesWithFilters(filter);
      setGames(filteredGames);
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    }
  };

  /**
   * Limpia los filtros y recarga la página
   */
  const handleClearFilters = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getTopGames();
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
        <div className="bg-gray-800 p-4 rounded-xl mb-8 shadow-lg">
          <Row className="align-items-center">
            <Col md={8} className="mb-3 mb-md-0">
              <h1 className="display-5 fw-bold mb-1">Video Juegos</h1>
              <Searchbar onSearch={handleSearch} />
            </Col>
            <Col md={4}>
              {/* Menú desplegable para los filtros */}
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-filters">
                  Filtros
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-dark text-light p-3 border-0">
                  <Filters onFilter={handleFilterChange} />
                  <hr />
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={handleClearFilters}
                  >
                    Limpiar Filtros
                  </button>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </div>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {games.map((game) => (
            <Col key={game.id}>
              <Card className="h-100 bg-dark border-secondary hover-shadow">
                <Link to={`/game/${game.id}`}>
                  <Card.Img
                    variant="top"
                    src={game.background_image}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Card.Title className="text-light fs-5">
                      <Link to={`/game/${game.id}`} className="text-light text-decoration-none">
                        {game.name}
                      </Link>
                    </Card.Title>
                    <div className="d-flex flex-column align-items-center">
                      <Badge
                        pill
                        className={`fs-5 ${
                          game.metacritic >= 75
                            ? "bg-success"
                            : game.metacritic >= 50
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {game.metacritic || "NR"}
                      </Badge>
                      <span className="text-muted small mt-1">Metascore</span>
                    </div>
                  </div>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Link
                      to={`/game/${game.id}`}
                      className="btn btn-sm btn-outline-indigo"
                    >
                      Detalles
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
