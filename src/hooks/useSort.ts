import OrderEnum from '../models/enum/Order.enum';

import type Item from '../models/Item';
import { create } from 'zustand';

/**
 * Tipo que define a coluna a ser ordena e em qual ordem.
 */
export type Sort = {
  column: keyof Item;
  order: OrderEnum;
};

export const initialValues: Sort = {
  column: 'name',
  order: OrderEnum.ASC,
};

type SortStore = {
  sort: Sort;
  setSort: (sort: Sort) => void;
};

export const useSort = create<SortStore>((set) => ({
  sort: initialValues,
  setSort: (sort: Sort) => set({ sort }),
}));
