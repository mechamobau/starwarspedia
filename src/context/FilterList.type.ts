import ComparisonEnum from "../models/enum/Comparison.enum";
import type Planet from "../models/Planet";

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
  filters: {
    byName: {
      name: string;
    };
    byNumericValues: NumericValueFilter[];
  };
};
