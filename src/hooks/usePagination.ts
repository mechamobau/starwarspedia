import { create } from 'zustand';

/**
 * Constante que define o limite de itens exibidos por visualização de paginação.
 */
export const LIMIT_PER_VIEW_PAGINATION = 10;

export type Pagination = {
  readonly current: number;
  readonly previous: number | null;
  readonly next: number | null;
  readonly totalItemsCount?: number;
  readonly viewsCount?: number;
};

type PaginationState = {
  next: () => void;
  previous: () => void;
  pagination: Pagination;
  setCountItems: (countItems: number) => void;
  setCurrentItem: (value: number) => void;
  resetPagination: () => void;
};

const usePagination = create<PaginationState>((set) => ({
  pagination: {
    current: 1,
    previous: null,
    next: null,
    totalItemsCount: 0,
    viewsCount: 0,
  },
  totalItemsCount: undefined,
  viewsCount: undefined,

  next: () =>
    set((state) => {
      const current = state.pagination.current + 1;
      const next =
        current === state.pagination.viewsCount || !state.pagination.viewsCount
          ? null
          : current + 1;
      const previous = current - 1;

      return {
        ...state,
        pagination: {
          ...state.pagination,
          current,
          next,
          previous,
        },
      };
    }),

  previous: () =>
    set((state) => {
      const current = state.pagination.current - 1;
      const previous = current <= 1 ? null : current - 1;
      const next = current + 1;

      return {
        ...state,
        pagination: {
          ...state.pagination,
          current,
          next,
          previous,
        },
      };
    }),

  setCountItems: (countItems: number) =>
    set((state) => {
      const viewsCount = Math.round(countItems / LIMIT_PER_VIEW_PAGINATION);
      const next =
        state.pagination.current < viewsCount
          ? state.pagination.current + 1
          : state.pagination.next;
      const previous =
        state.pagination.current > 1
          ? state.pagination.current - 1
          : state.pagination.previous;

      return {
        ...state,
        pagination: {
          ...state.pagination,
          viewsCount,
          previous,
          next,
        },
        totalItemsCount: countItems,
        viewsCount,
      };
    }),

  setCurrentItem: (value: number) =>
    set((state) => {
      const current = value;
      const next =
        current === state.pagination.viewsCount || !state.pagination.viewsCount
          ? null
          : current + 1;
      const previous = current <= 1 ? null : current - 1;

      return {
        ...state,
        pagination: {
          ...state.pagination,
          current,
          next,
          previous,
        },
      };
    }),

  resetPagination: () =>
    set({
      pagination: {
        current: 1,
        previous: null,
        next: null,
        totalItemsCount: 0,
        viewsCount: 0,
      },
    }),
}));

export { usePagination };
