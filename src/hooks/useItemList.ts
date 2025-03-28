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
import type Item from '../models/Item';
import type RawPlanet from '../models/RawPlanet';
import type { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';

/**
 * Função auxiliar resposável por extrair o `data`
 * de dentro da response
 * @param response - Resposta retornada pelo servidor
 */
const extractDataReponse = ({ data }: AxiosResponse<ServerResponse<Item[]>>) =>
  data;

type ItemListStore = {
  items: Item[] | null;
  filteredItems: Item[] | null;
  count: number;
  setItems: (planets: Item[]) => void;
  setFilteredItems: (filteredItems: Item[] | null) => void;
  setCount: (count: number) => void;
  resetState: () => void;
};

/**
 * Zustand store for managing planets state.
 */
const useItemListStore = create<ItemListStore>((set) => ({
  items: null as Item[] | null,
  filteredItems: null as Item[] | null,
  count: 0,
  setItems: (items: Item[]) => set({ items }),
  setFilteredItems: (filteredItems: Item[] | null) => set({ filteredItems }),
  setCount: (count: number) => set({ count }),
  resetState: () =>
    set({
      items: null,
      filteredItems: null,
      count: 0,
    }),
}));

const useItemList = (key: string) => {
  const { pagination, resetPagination } = usePagination();
  const { filter, resetFilter } = useFilter();
  const { sort: sorts } = useSort();

  const {
    items,
    filteredItems,
    count,
    setItems,
    setFilteredItems,
    setCount,
    resetState,
  } = useItemListStore();

  const params = pagination.current > 0 ? { page: pagination.current } : null;

  const itemListQuery = useQuery({
    queryKey: ['item-list', pagination.current, key],
    queryFn: () =>
      server.get<ServerResponse<Item[]>>(`/${key}/`, {
        params,
      }),
  });

  const clearState = pipe(resetState, resetPagination, resetFilter);

  const setCountItemsNumber = useCallback(
    (count: number) => (results: Item[]) => {
      setCount(count);
      setItems(results);
      return results;
    },
    [setCount, setItems]
  );

  const sortPlanets = useCallback(
    (planets: Item[]) => {
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

  const filterByNumericValues = useCallback(
    (items: Item[]) => {
      if (filter.byNumericValues.length) {
        let appliedFilters: Item[] = items;

        filter.byNumericValues.forEach(({ column, comparison, value }) => {
          const appliedFilter = {
            [ComparisonEnum.EQUALS]: appliedFilters.filter(
              (item) => String(item[column]) === String(value)
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

  const clearFilteredItems = () => setFilteredItems(null);

  useEffect(() => {
    if (!itemListQuery.data) return;

    const filterItems = pipe(
      extractDataReponse,
      ({ count, results }) => setCountItemsNumber(count)(results),
      filterByNumericValues,
      sortPlanets,
      setFilteredItems
    );

    try {
      filterItems(itemListQuery.data);
    } catch (error) {
      console.log({ error });
      clearFilteredItems;
    }

    // A regra do ESLint pede para que o "filter" seja declarado como deps,
    // ela está desativada nesta linha para que não
    // seja feito um novo request caso o filtro seja alterado.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemListQuery.data, pagination, key]);

  useEffect(() => {
    if (items)
      pipe(filterByNumericValues, sortPlanets, setFilteredItems)(items);
  }, [items, filter, sorts, filterByNumericValues, sortPlanets]);

  return { items: filteredItems, count, clearState };
};

export { useItemList };
