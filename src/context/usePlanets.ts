import React, { useCallback, useEffect, useState } from "react";
import ServerResponse from "../models/ServerResponse";
import constate from "constate";
import { usePagination } from "./usePagination";
import Planet from "../models/Planet";
import { server } from "../services/axios";
import { useFilterTable } from "./useFilterTable";
import ComparisonEnum from "../models/enum/Comparison.enum";
import { AxiosResponse } from "axios";

import response from './response.json'

type _Planet = {
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surface_water: string,
    population: string,
    residents: string[],
    films: string[],
    created: string,
    edited: string,
    url: string
}

const serverGet: Promise<ServerResponse<_Planet[]>> = new Promise((resolve) => {
    resolve({...response})
})  

const mapPlanetsResponse = ({data: {results, ...items}}: AxiosResponse<ServerResponse<_Planet[]>>) : ServerResponse<Planet[]>=> {
    return {
        results: results.map((item) => ({
            ...item,
            rotation_period: Number(item.rotation_period),
            orbital_period: Number(item.orbital_period),
            surface_water: Number(item.surface_water),
            population: Number(item.population),
            diameter: Number(item.diameter),
        })),
        ...items
    }
}

/**
 * Hook e Context Provider responsáveis por prover os dados retornados
 * pela API referentes aos Planetas de Star Wars.
 */
const [PlanetsProvider, usePlanets] = constate(() => {
  const { pagination } = usePagination();
  const { filter } = useFilterTable();

  const [filteredItems, setFilteredItems] = useState<Planet[] | null>(null);

  const filterByName = useCallback(
      ({ results: items }: ServerResponse<Planet[]>) => {
    // ( { results: items }: ServerResponse<Planet[]>) => {
      if (filter.byName) {
        const filtered = items.filter(({ name }) =>
          name.match(new RegExp(`${filter.byName}`, "i"))
        );

        return filtered;
      }

      return items;
    },
    [filter]
  );

  const filterByNumericValues = useCallback(
    (items: Planet[]) => {

      if (filter.byNumericValues.length > 0) {
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

          appliedFilters = appliedFilter
        });

        return appliedFilters;
      }

      return items
    },
    [filter]
  );

  const clearFilteredItems = () => () => setFilteredItems(null);

  useEffect(() => {
    const params = pagination.current > 0 ? { page: pagination.current } : null;

    // serverGet
    server
      .get<ServerResponse<_Planet[]>>("/planets", {
        params,
      })
      .then(mapPlanetsResponse)
      .then(filterByName)
      .then(filterByNumericValues)
      .then((items) => {
        console.log({finally: items})
        setFilteredItems(items);
        return items;
      })
      .catch(clearFilteredItems);
  }, [pagination, filterByName, filterByNumericValues]);


  return { filteredItems };
});

export { usePlanets };

export default PlanetsProvider;
