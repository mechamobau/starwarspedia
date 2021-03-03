import { AxiosResponse } from "axios";
import type RawPlanet from "../models/RawPlanet";
import safeParseNumber from "./safeParseNumber";
import type Planet from "../models/Planet";
import type ServerResponse from "../models/ServerResponse";

const mapRawPlanetsResponse = ({
  data: { results, ...items },
}: AxiosResponse<ServerResponse<RawPlanet[]>>): ServerResponse<Planet[]> => ({
  results: results.map(
    ({
      rotation_period,
      orbital_period,
      surface_water,
      population,
      diameter,
      ...item
    }) => ({
      ...item,
      rotation_period: safeParseNumber(rotation_period),
      orbital_period: safeParseNumber(orbital_period),
      surface_water: safeParseNumber(surface_water),
      population: safeParseNumber(population),
      diameter: safeParseNumber(diameter),
    })
  ),
  ...items,
});

export default mapRawPlanetsResponse;
