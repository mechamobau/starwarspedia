/**
 * Tipo do formato de retorno dos valores da API.
 */
type ServerReponse<T extends any[]> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
};

export default ServerReponse;
