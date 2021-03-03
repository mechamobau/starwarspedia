import { useCallback, useReducer } from "react";
import constate from "constate";
import { FilterList, NumericValueFilter } from "./FilterList.type";

enum ActionTypeEnum {
  FILTER_BY_NAME = "FILTER_BY_NAME",
  FILTER_BY_NUMERIC_VALUE = "FILTER_BY_NUMERIC_VALUE",
  REMOVE_NUMERIC_VALUE_FILTER = "REMOVE_NUMERIC_VALUE_FILTER",
}

type Action =
  | {
      type: ActionTypeEnum.FILTER_BY_NAME;
      value: string;
    }
  | {
      type: ActionTypeEnum.FILTER_BY_NUMERIC_VALUE;
      value: NumericValueFilter;
    }
  | {
      type: ActionTypeEnum.REMOVE_NUMERIC_VALUE_FILTER;
      value: NumericValueFilter["column"];
    };

const initialValue: FilterList = {
  filters: {
    byName: {
      name: "",
    },
    byNumericValues: [],
  },
};

const reducer = (state: FilterList, action: Action): FilterList => {
  switch (action.type) {
    case ActionTypeEnum.FILTER_BY_NAME:
      return {
        filters: {
          ...state.filters,
          byName: {
            name: action.value,
          },
        },
      };
    case ActionTypeEnum.FILTER_BY_NUMERIC_VALUE: {
      return {
        filters: {
          ...state.filters,
          byNumericValues: [
            ...state.filters.byNumericValues.filter(
              ({ column }) => column !== action.value.column
            ),
            action.value,
          ],
        },
      };
    }
    case ActionTypeEnum.REMOVE_NUMERIC_VALUE_FILTER:
      return {
        filters: {
          ...state.filters,
          byNumericValues: state.filters.byNumericValues.filter(
            ({ column }) => column !== action.value
          ),
        },
      };

    default:
      throw new Error("Provided value non exists in `ActionTypeEnum`");
  }
};

/**
 * Hook e Context Provider dos filtros utilizados nos dados do componente de `<Table />`.
 */
const [FilterTableProvider, useFilterTable] = constate(() => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const setFilterByName = useCallback(
    (name: string) =>
      dispatch({ type: ActionTypeEnum.FILTER_BY_NAME, value: name }),
    []
  );

  const setFilterByNumericValues = useCallback(
    (value: NumericValueFilter) =>
      dispatch({ type: ActionTypeEnum.FILTER_BY_NUMERIC_VALUE, value }),
    []
  );

  const removeFilterByNumericValues = useCallback(
    (value: NumericValueFilter["column"]) =>
      dispatch({ type: ActionTypeEnum.REMOVE_NUMERIC_VALUE_FILTER, value }),
    []
  );

  return {
    filter: state.filters,
    setFilterByName,
    setFilterByNumericValues,
    removeFilterByNumericValues,
  };
});

export { useFilterTable };

export default FilterTableProvider;
