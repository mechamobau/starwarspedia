import ComparisonEnum from './enum/Comparison.enum';

import type Planet from './Planet';

/**
 * Tipo dos valores de filtro para dados numéricos
 */
export type NumericValueFilter = {
  column: keyof Planet;
  comparison: ComparisonEnum;
  value: number;
};

/**
 * Tipo definidor dos filtros utilizados nos dados do hook `useFilter`
 */
export type FilterList = {
  filter: {
    byName: {
      name: string;
    };
    byNumericValues: NumericValueFilter[];
  };
  setFilterByName: (name: string) => void;
  setFilterByNumericValues: (value: NumericValueFilter) => void;
  removeFilterByNumericValues: (value: NumericValueFilter['column']) => void;
};
