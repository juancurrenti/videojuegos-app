// Importacion de estilos globales y de Bootstrap
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importacion de dependencias de React y ReactDOM
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Importacion del componente principal de la aplicacion
import App from './App.jsx';

/**
 * Punto de entrada de la aplicacion
 *
 * Se utiliza createRoot para inicializar y renderizar el componente <App />
 * dentro del elemento HTML con id "root". El componente se renderiza en
 * <StrictMode> para ayudar a identificar posibles problemas en la aplicacion
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
