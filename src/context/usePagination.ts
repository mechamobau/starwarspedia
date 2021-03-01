import React, { useCallback, useReducer } from 'react';
import constate from 'constate';

/**
 * Constante que define o limite de itens exibidos por visualização de paginação.
 */
export const LIMIT_PER_VIEW_PAGINATION = 10;

type Pagination = {
    current: number,
    previous: number | null,
    next: number | null,
    totalItemsCount?: number,
    viewsCount?: number
}

enum ActionTypeEnum {
    FORWARD_PAGINATION = 'FOWARD_PAGINATION',
    BACKWARD_PAGINATION = 'BACKWARD_PAGINATION',
    SET_COUNT_ITEMS = 'SET_COUNT_ITEMS'
}

type Action = {
    type: ActionTypeEnum.BACKWARD_PAGINATION
} | {
    type: ActionTypeEnum.FORWARD_PAGINATION
} | {
    type: ActionTypeEnum.SET_COUNT_ITEMS,
    value: number
}

const initialState: Pagination = {
    current: 0,
    previous: null,
    next: null,
}

const reducer = (state: Pagination, action: Action): Pagination => {
    switch (action.type) {
        case ActionTypeEnum.BACKWARD_PAGINATION: {
            const current = state.current - 1

            const previous = current  === 0 ? null : current - 1;

            const next = current + 1;

            return {
                ...state,
                current,
                next,
                previous
            }
            
        }
            
        case ActionTypeEnum.FORWARD_PAGINATION: {
            const current = state.current + 1

            const next = current  === state.viewsCount || !state.viewsCount ? null : current + 1;

            const previous = current - 1;

            return {
                ...state,
                current,
                next,
                previous
            }
        }
        case ActionTypeEnum.SET_COUNT_ITEMS: {
            const viewsCount = Math.round(action.value / LIMIT_PER_VIEW_PAGINATION);

            const next = state.current < viewsCount ? state.current + 1 : state.next;

            const previous = state.current > 0 ? state.current - 1 : state.previous;

            return {
                ...state,
                totalItemsCount: action.value,
                viewsCount,
                previous,
                next
            };
        }

        default:
            throw new Error('Provided action type does not exists in `ActionTypeEnum`')
    }
}

/**
 * Hook e Context Provider dos dos dados de paginação utilizados no hook
 * `usePlanets`.
 */
const [PaginationProvider, usePagination] = constate(() => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const next = useCallback(() => dispatch({ type: ActionTypeEnum.FORWARD_PAGINATION }), []);

    const previous = useCallback(() => dispatch({ type: ActionTypeEnum.BACKWARD_PAGINATION }), []);

    const setCountItems = useCallback((countItems: number) => dispatch({ type: ActionTypeEnum.SET_COUNT_ITEMS, value: countItems }), [])

    return { pagination: state, next, previous, setCountItems }
    
});

export { usePagination };

export default PaginationProvider;

