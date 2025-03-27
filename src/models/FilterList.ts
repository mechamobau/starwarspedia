import ComparisonEnum from './enum/Comparison.enum';

import type Item from './Item';

/**
 * Tipo dos valores de filtro para dados numéricos
 */
export type NumericValueFilter = {
  column: keyof Item;
  comparison: ComparisonEnum;
  value: number;
};

/**
 * Tipo definidor dos filtros utilizados nos dados do hook `useFilter`
 */
export type FilterList = {
  filter: {
    byNumericValues: NumericValueFilter[];
  };
  setFilterByNumericValues: (value: NumericValueFilter) => void;
  removeFilterByNumericValues: (value: NumericValueFilter['column']) => void;
  resetFilter: () => void;
};
