import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetail from './pages/GameDetail';

/**
 * Componente principal de la aplicacion
 *
 * Define las rutas de la aplicacion utilizando react-router-dom
 * Ruta "/" muestra la página principal (Home)
 * Ruta "/game/:id" muestra los detalles de un juego especifico (GameDetail)
 *
 * @returns {JSX.Element} El componente de la aplicacion
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
