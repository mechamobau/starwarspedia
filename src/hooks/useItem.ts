import { create } from 'zustand';
import { useCallback, useEffect, useLayoutEffect } from 'react';

import pipe from '@bitty/pipe';

import ComparisonEnum from '../models/enum/Comparison.enum';
import OrderEnum from '../models/enum/Order.enum';
import { server } from '../services/axios';
import { useFilter } from './useFilter';
import { usePagination } from './usePagination';
import { useSort } from './useSort';

import type ServerResponse from '../models/ServerResponse';
import type Item from '../models/Item';
import type { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';

/**
 * Função auxiliar resposável por extrair o `data`
 * de dentro da response
 * @param response - Resposta retornada pelo servidor
 */
const extractDataReponse = ({ data }: AxiosResponse<Item>) => data;

type ItemListStore = {
  item: Item | null;
  setItem: (items: Item) => void;
  resetState: () => void;
};

/**
 * Zustand store for managing planets state.
 */
const useItemStore = create<ItemListStore>((set) => ({
  item: null as Item | null,
  setItem: (item: Item) => set({ item }),
  resetState: () =>
    set({
      item: null,
    }),
}));

const useItem = (key: string) => {
  const { item, resetState, setItem } = useItemStore();

  const itemQuery = useQuery({
    queryKey: ['item', key],
    queryFn: () => server.get<Item>(`/${key}/`),
  });

  useLayoutEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  useEffect(() => {
    if (!itemQuery.data) return;
    setItem(extractDataReponse(itemQuery.data));
  }, [itemQuery.data]);

  return { item, clearState: resetState };
};

export { useItem };
