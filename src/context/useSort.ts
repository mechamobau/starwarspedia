import constate from "constate";
import { useState } from "react";

import OrderEnum from "../models/enum/Order.enum";

import type Planet from "../models/Planet";

/**
 * Tipo que define a coluna a ser ordena e em qual ordem.
 */
type Sort = {
  column: keyof Planet;
  order: OrderEnum;
};

export const initialValues: Sort = {
  column: "name",
  order: OrderEnum.ASC,
};

/**
 * Hook e Provider responsáveis por prover os dados necessários pela ordenação de dados na tabela.
 */
const [SortContext, useSort] = constate(() => {
  const [sort, setSort] = useState<Sort | null>(initialValues);

  return { sort, setSort };
});

export { useSort };

export default SortContext;
