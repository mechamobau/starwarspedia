import { useCallback, useEffect, useState } from "react";
import ServerResponse from "../models/ServerResponse";
import constate from "constate";
import { usePagination } from "./usePagination";
import Planet from "../models/Planet";
import { server } from "../services/axios";
import { useFilterTable } from "./useFilterTable";
import ComparisonEnum from "../models/enum/Comparison.enum";
import { AxiosResponse } from "axios";
import pipe from "@bitty/pipe";

import safeParseNumber from "../utils/safeParseNumber";

type RawPlanetResponse = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

const mapPlanetsResponse = ({
  data: { results, ...items },
}: AxiosResponse<ServerResponse<RawPlanetResponse[]>>): ServerResponse<
  Planet[]
> => ({
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

/**
 * Hook e Context Provider responsáveis por prover os dados retornados
 * pela API referentes aos Planetas de Star Wars.
 */
const [PlanetsProvider, usePlanets] = constate(() => {
  const { pagination } = usePagination();
  const { filter } = useFilterTable();

  const [filteredPlanets, setFilteredPlanets] = useState<Planet[] | null>(null);

  const [planets, setPlanets] = useState<Planet[] | null>(null);

  const [count, setCount] = useState(0);

  const setCountItemsNumber = useCallback((items: ServerResponse<Planet[]>) => {
    setCount(items.count);

    setPlanets(items.results);

    return items.results;
  }, []);

  const filterByName = useCallback(
    (items: Planet[]) => {
      if (filter.byName) {
        const filtered = items.filter(({ name }) =>
          name.match(new RegExp(`${filter.byName.name}`, "i"))
        );

        return filtered;
      }

      return items;
    },
    [filter]
  );

  const filterByNumericValues = useCallback(
    (items: Planet[]) => {
      if (filter.byNumericValues.length) {
        let appliedFilters: Planet[] = [];

        filter.byNumericValues.forEach(({ column, comparison, value }) => {
          const appliedFilter = {
            [ComparisonEnum.EQUALS]: items.filter(
              (item) => item ?? item[column] === value
            ),
            [ComparisonEnum.GREATER_THAN]: items.filter(
              (item) => item ?? item[column] > value
            ),
            [ComparisonEnum.LOWER_THAN]: items.filter(
              (item) => item ?? item[column] < value
            ),
          }[comparison];

          if (!appliedFilter) {
            throw new Error(
              "Provided value does not exists in `ComparisonEnum`"
            );
          }

          appliedFilters = appliedFilter;
        });

        return appliedFilters;
      }

      return items;
    },
    [filter]
  );

  const clearFilteredItems = () => () => setFilteredPlanets(null);

  useEffect(() => {
    const params = pagination.current > 0 ? { page: pagination.current } : null;

    server
      .get<ServerResponse<RawPlanetResponse[]>>("/planets", {
        params,
      })
      .then(mapPlanetsResponse)
      .then(setCountItemsNumber)
      .then(filterByName)
      .then(filterByNumericValues)
      .then(setFilteredPlanets)
      .catch(clearFilteredItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  useEffect(() => {
    if (planets)
      pipe(filterByName, filterByNumericValues, setFilteredPlanets)(planets);
  }, [planets, filter, filterByName, filterByNumericValues]);

  return { planets: filteredPlanets, count };
});

export { usePlanets };

export default PlanetsProvider;
