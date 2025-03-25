import { FilterList, NumericValueFilter } from '../models/FilterList';
import { create } from 'zustand';

const initialValue: FilterList = {
  filter: {
    byName: {
      name: '',
    },
    byNumericValues: [],
  },
  removeFilterByNumericValues: () => {},
  setFilterByName: () => {},
  setFilterByNumericValues: () => {},
};

export const useFilter = create<FilterList>((set) => ({
  filter: initialValue.filter,
  setFilterByName: (name: string) =>
    set((state) => ({
      filter: {
        ...state.filter,
        byName: {
          name,
        },
      },
    })),
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
}));
