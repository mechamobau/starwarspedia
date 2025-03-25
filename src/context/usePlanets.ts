import { create } from 'zustand';
import { useCallback, useEffect } from 'react';

import pipe from '@bitty/pipe';

import ComparisonEnum from '../models/enum/Comparison.enum';
import OrderEnum from '../models/enum/Order.enum';
import { server } from '../services/axios';
import mapPlanetsResponse from '../utils/mapRawPlanetsResponse';
import { useFilter } from './useFilter';
import { usePagination } from './usePagination';
import { useSort } from './useSort';

import type ServerResponse from '../models/ServerResponse';
import type Planet from '../models/Planet';
import type RawPlanet from '../models/RawPlanet';
import type { AxiosResponse } from 'axios';

/**
 * Função auxiliar resposável por extrair o `data`
 * de dentro da response
 * @param response - Resposta retornada pelo servidor
 */
const extractDataReponse = ({
  data,
}: AxiosResponse<ServerResponse<RawPlanet[]>>) => data;

type PlanetsStore = {
  planets: Planet[] | null;
  filteredPlanets: Planet[] | null;
  count: number;
  setPlanets: (planets: Planet[]) => void;
  setFilteredPlanets: (filteredPlanets: Planet[] | null) => void;
  setCount: (count: number) => void;
};

/**
 * Zustand store for managing planets state.
 */
const usePlanetsStore = create<PlanetsStore>((set) => ({
  planets: null as Planet[] | null,
  filteredPlanets: null as Planet[] | null,
  count: 0,
  setPlanets: (planets: Planet[]) => set({ planets }),
  setFilteredPlanets: (filteredPlanets: Planet[] | null) =>
    set({ filteredPlanets }),
  setCount: (count: number) => set({ count }),
}));

const usePlanets = () => {
  const { pagination } = usePagination();
  const { filter } = useFilter();
  const { sort: sorts } = useSort();

  const {
    planets,
    filteredPlanets,
    count,
    setPlanets,
    setFilteredPlanets,
    setCount,
  } = usePlanetsStore();

  const setCountItemsNumber = useCallback(
    (count: number) => (results: Planet[]) => {
      setCount(count);
      setPlanets(results);
      return results;
    },
    [setCount, setPlanets]
  );

  const sortPlanets = useCallback(
    (planets: Planet[]) => {
      if (sorts === null) return planets;

      return planets.sort((a, b) => {
        const { column, order } = sorts;

        const elementA = a[column];
        const elementB = b[column];

        if (elementA === null || elementB === null) return 0;

        if (elementA > elementB) return order === OrderEnum.ASC ? 1 : -1;

        if (elementA < elementB) return order === OrderEnum.ASC ? -1 : 1;

        return 0;
      });
    },
    [sorts]
  );

  const filterByName = useCallback(
    (items: Planet[]) => {
      if (filter.byName) {
        const filtered = items.filter(({ name }) =>
          name.match(new RegExp(`${filter.byName.name}`, 'i'))
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
              (item) => (Number(item[column]) ?? 0) > value
            ),
            [ComparisonEnum.LOWER_THAN]: appliedFilters.filter(
              (item) => (Number(item[column]) ?? 0) < value
            ),
          }[comparison];

          if (!appliedFilter) {
            throw new Error(
              'Provided value does not exists in `ComparisonEnum`'
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

  const clearFilteredItems = () => setFilteredPlanets(null);

  useEffect(() => {
    const params = pagination.current > 0 ? { page: pagination.current } : null;

    server
      .get<ServerResponse<RawPlanet[]>>('/planets/', {
        params,
      })
      .then(extractDataReponse)
      .then(({ count, results }) =>
        pipe(mapPlanetsResponse, setCountItemsNumber(count))(results)
      )
      .then(filterByName)
      .then(filterByNumericValues)
      .then(sortPlanets)
      .then(setFilteredPlanets)
      .catch(clearFilteredItems);

    // A regra do ESLint pede para que o "filter" seja declarado como deps,
    // ela está desativada nesta linha para que não
    // seja feito um novo request caso o filtro seja alterado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  useEffect(() => {
    if (planets)
      pipe(
        filterByName,
        filterByNumericValues,
        sortPlanets,
        setFilteredPlanets
      )(planets);
  }, [
    planets,
    filter,
    sorts,
    filterByName,
    filterByNumericValues,
    sortPlanets,
  ]);

  return { planets: filteredPlanets, count };
};

export { usePlanets };
