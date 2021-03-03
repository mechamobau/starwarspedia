import ComparisonEnum from "../models/enum/Comparison.enum";

/**
 * Mapeamento de tradução das operações utilizada nos filtros das tabelas.
 */
const operationsLabels = {
  [ComparisonEnum.EQUALS]: "Igual a",
  [ComparisonEnum.GREATER_THAN]: "Maior que",
  [ComparisonEnum.LOWER_THAN]: "Menor que",
};

export default operationsLabels;
