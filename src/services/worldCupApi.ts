// Servicio para interactuar con la WorldCupAPI (api.worldcupapi.com)

const API_KEY = import.meta.env.WORLDCUP_API_KEY || process.env.WORLDCUP_API_KEY;
const BASE_URL = 'https://api.worldcupapi.com';

/**
 * Función genérica para hacer peticiones a la API
 */
async function fetchAPI(endpoint: string, params: Record<string, any> = {}) {
  if (!API_KEY) {
    console.warn("WorldCupAPI: No se encontró la clave de la API en las variables de entorno.");
    return null;
  }

  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append('key', API_KEY);

  // Agregar los parámetros extra a la URL
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, String(params[key]));
    }
  });

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`WorldCupAPI Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos de WorldCupAPI:", error);
    return null;
  }
}

// -----------------------------------------------------------------------------
// ENDPOINTS
// -----------------------------------------------------------------------------

export async function getLiveScores(lang?: string) {
  return fetchAPI('livescores', { lang });
}

export async function getFixtures(params: { group?: string, team_id?: string | number, date?: string, lang?: string } = {}) {
  return fetchAPI('fixtures', params);
}

export async function getMatchCommentary(match_id: string | number, params: { from?: number, to?: number, lang?: string } = {}) {
  return fetchAPI('commentary', { match_id, ...params });
}

export async function getMatchEvents(match_id: string | number, lang?: string) {
  return fetchAPI('events', { match_id, lang });
}

export async function getMatchStatistics(match_id: string | number) {
  return fetchAPI('statistics', { match_id });
}

export async function getMatchLineups(match_id: string | number, lang?: string) {
  return fetchAPI('lineups', { match_id, lang });
}

export async function getTeamSquads(team_id: string | number, lang?: string) {
  return fetchAPI('squads', { team_id, lang });
}

export async function getMatchHistory(params: { date_from?: string, date_to?: string, team_id?: string | number, lang?: string } = {}) {
  return fetchAPI('history', params);
}

export async function getHead2Head(team1_id: string | number, team2_id: string | number, lang?: string) {
  return fetchAPI('head2head', { team1_id, team2_id, lang });
}
