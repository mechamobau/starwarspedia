import type RawPlanet from '../models/RawPlanet';
import safeParseNumber from './safeParseNumber';

import type Item from '../models/Item';

/**
 * Função responsável por mapear os items que vêm com os tipos
 * errados vindos da _API_
 * @param rawValue - Lista de items com os tipos errados
 */
const mapRawPlanetsResponse = (rawValue: RawPlanet[]): Item[] =>
  rawValue.map(
    ({
      rotation_period,
      orbital_period,
      surface_water,
      population,
      diameter,
      ...items
    }) => ({
      ...items,
      rotation_period: safeParseNumber(rotation_period),
      orbital_period: safeParseNumber(orbital_period),
      surface_water: safeParseNumber(surface_water),
      population: safeParseNumber(population),
      diameter: safeParseNumber(diameter),
    })
  );

export default mapRawPlanetsResponse;
