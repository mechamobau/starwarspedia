import OrderEnum from '../models/enum/Order.enum';

import type Planet from '../models/Planet';
import { create } from 'zustand';

/**
 * Tipo que define a coluna a ser ordena e em qual ordem.
 */
export type Sort = {
  column: keyof Planet;
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
