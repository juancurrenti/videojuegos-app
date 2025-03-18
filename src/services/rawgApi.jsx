import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

/**
 * Obtiene los juegos principales ordenados por Metascore (de mayor a menor)
 *
 * @returns {Promise<Array>} Una promesa que resuelve con un arreglo de juegos
 */
export const getTopGames = async () => {
  const response = await axios.get(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-metacritic`
  );
  return response.data.results;
};

/**
 * Busca juegos basandose en una consulta de texto
 *
 * @param {string} query El texto de busqueda ingresado por el usuario
 * @returns {Promise<Array>} Una promesa que resuelve con un arreglo de juegos encontrados
 */
export const searchGames = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/games?key=${API_KEY}&search=${query}`
  );
  return response.data.results;
};

/**
 * Obtiene juegos aplicando diversos filtros
 *
 * Los filtros disponibles son:
 * year: Año de lanzamiento
 * genre: Genero del juego
 * platform: Plataforma
 * tag: Etiqueta o tag
 * developer: Compañia desarrolladora
 *
 * @param {Object} filter Objeto que contiene los filtros a aplicar
 * @param {string} [filter.year] Año de lanzamiento
 * @param {string} [filter.genre] Genero
 * @param {string} [filter.platform] Plataforma
 * @param {string} [filter.tag] Tag
 * @param {string} [filter.developer] Desarrollador
 * @returns {Promise<Array>} Una promesa que resuelve con un arreglo de juegos filtrados
 */
export const getGamesWithFilters = async (filter) => {
  let query = `${BASE_URL}/games?key=${API_KEY}&ordering=-metacritic`;
  if (filter.year) query += `&dates=${filter.year}-01-01,${filter.year}-12-31`;
  if (filter.genre) query += `&genres=${filter.genre}`;
  if (filter.platform) query += `&platforms=${filter.platform}`;
  if (filter.tag) query += `&tags=${filter.tag}`;
  if (filter.developer) query += `&developers=${filter.developer}`;
  const response = await axios.get(query);
  return response.data.results;
};

/**
 * Obtiene los detalles de un juego especifico
 *
 * @param {string|number} id - El identificador del juego
 * @returns {Promise<Object>} Una promesa que resuelve con los detalles del juego
 */
export const getGameDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/games/${id}?key=${API_KEY}`
  );
  return response.data;
};
