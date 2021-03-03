import { useCallback, useEffect, useState } from "react";
import ServerResponse from "../models/ServerResponse";
import constate from "constate";
import { usePagination } from "./usePagination";
import Planet from "../models/Planet";
import { server } from "../services/axios";
import { useFilter } from "./useFilter";
import ComparisonEnum from "../models/enum/Comparison.enum";
import pipe from "@bitty/pipe";
import RawPlanet from "../models/RawPlanet";
import mapPlanetsResponse from "../utils/mapPlanetsResponse";

/**
 * Hook e Context Provider responsáveis por prover os dados retornados
 * pela API referentes aos Planetas de Star Wars.
 */
const [PlanetsProvider, usePlanets] = constate(() => {
  const { pagination } = usePagination();
  const { filter } = useFilter();

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
        let appliedFilters: Planet[] = items;

        filter.byNumericValues.forEach(({ column, comparison, value }) => {
          const appliedFilter = {
            [ComparisonEnum.EQUALS]: appliedFilters.filter(
              (item) => item[column] === value
            ),
            [ComparisonEnum.GREATER_THAN]: appliedFilters.filter(
              (item) => (item[column] ?? 0) > value
            ),
            [ComparisonEnum.LOWER_THAN]: appliedFilters.filter(
              (item) => (item[column] ?? 0) < value
            ),
          }[comparison];

          if (!appliedFilter) {
            throw new Error(
              "Provided value does not exists in `ComparisonEnum`"
            );
          }

          appliedFilters = appliedFilter;
        });

        console.log({ appliedFilters });

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
      .get<ServerResponse<RawPlanet[]>>("/planets/", {
        params,
      })
      .then(mapPlanetsResponse)
      .then(setCountItemsNumber)
      .then(filterByName)
      .then(filterByNumericValues)
      .then(setFilteredPlanets)
      .catch(clearFilteredItems);

    // A regra do ESLint pede para que o "filter" seja declarado como deps,
    // ela está desativada nesta linha para que não
    // seja feito um novo request caso o filtro seja alterado.
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
