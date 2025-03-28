import { FilterList, NumericValueFilter } from '../models/FilterList';
import { create } from 'zustand';

const initialValue: FilterList = {
  filter: {
    byNumericValues: [],
  },
  removeFilterByNumericValues: () => {},
  setFilterByNumericValues: () => {},
  resetFilter: () => {},
};

export const useFilter = create<FilterList>((set) => ({
  filter: initialValue.filter,
  setFilterByNumericValues: (value: NumericValueFilter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        byNumericValues: [
          ...state.filter.byNumericValues.filter(
            ({ column }) => column !== value.column
          ),
          value,
        ],
      },
    })),
  removeFilterByNumericValues: (value: NumericValueFilter['column']) =>
    set((state) => ({
      filter: {
        ...state.filter,
        byNumericValues: state.filter.byNumericValues.filter(
          ({ column }) => column !== value
        ),
      },
    })),
  resetFilter: () => set({ filter: initialValue.filter }),
}));
