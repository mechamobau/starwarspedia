import constate from "constate";
import { useCallback, useReducer } from "react";

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

enum ActionTypeEnum {
  FORWARD_PAGINATION = "FOWARD_PAGINATION",
  BACKWARD_PAGINATION = "BACKWARD_PAGINATION",
  SET_CURRENT_ITEM = "SET_CURRENT_ITEM",
  SET_COUNT_ITEMS = "SET_COUNT_ITEMS",
}

type Action =
  | {
      type: ActionTypeEnum.BACKWARD_PAGINATION;
    }
  | {
      type: ActionTypeEnum.FORWARD_PAGINATION;
    }
  | {
      type: ActionTypeEnum.SET_CURRENT_ITEM;
      value: number;
    }
  | {
      type: ActionTypeEnum.SET_COUNT_ITEMS;
      value: number;
    };

const initialState: Pagination = {
  current: 1,
  previous: null,
  next: null,
};

const reducer = (state: Pagination, action: Action): Pagination => {
  switch (action.type) {
    case ActionTypeEnum.BACKWARD_PAGINATION: {
      const current = state.current - 1;

      const previous = current <= 1 ? null : current - 1;

      const next = current + 1;

      return {
        ...state,
        current,
        next,
        previous,
      };
    }

    case ActionTypeEnum.FORWARD_PAGINATION: {
      const current = state.current + 1;

      const next =
        current === state.viewsCount || !state.viewsCount ? null : current + 1;

      const previous = current - 1;

      return {
        ...state,
        current,
        next,
        previous,
      };
    }
    case ActionTypeEnum.SET_COUNT_ITEMS: {
      const viewsCount = Math.round(action.value / LIMIT_PER_VIEW_PAGINATION);

      const next = state.current < viewsCount ? state.current + 1 : state.next;

      const previous = state.current > 1 ? state.current - 1 : state.previous;

      return {
        ...state,
        totalItemsCount: action.value,
        viewsCount,
        previous,
        next,
      };
    }

    case ActionTypeEnum.SET_CURRENT_ITEM: {
      const current = action.value;

      const next =
        current === state.viewsCount || !state.viewsCount ? null : current + 1;

      const previous = current <= 1 ? null : current - 1;

      return {
        ...state,
        current,
        next,
        previous,
      };
    }
  }
};

/**
 * Hook e Context Provider dos dos dados de paginação utilizados no hook
 * `usePlanets`.
 */
const [PaginationProvider, usePagination] = constate(() => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const next = useCallback(
    () => dispatch({ type: ActionTypeEnum.FORWARD_PAGINATION }),
    []
  );

  const previous = useCallback(
    () => dispatch({ type: ActionTypeEnum.BACKWARD_PAGINATION }),
    []
  );

  const setCountItems = useCallback(
    (countItems: number) =>
      dispatch({ type: ActionTypeEnum.SET_COUNT_ITEMS, value: countItems }),
    []
  );

  const setCurrentItem = useCallback(
    (value: number) =>
      dispatch({ type: ActionTypeEnum.SET_CURRENT_ITEM, value }),
    []
  );

  return { pagination: state, next, previous, setCountItems, setCurrentItem };
});

export { usePagination };

export default PaginationProvider;
