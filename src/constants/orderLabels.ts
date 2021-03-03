import OrderEnum from "../models/enum/Order.enum";

/**
 * Mapeamento de tradução das ordenações utilizada nos filtros das tabelas.
 */
const orderLabels = {
  [OrderEnum.ASC]: "Ascendente",
  [OrderEnum.DESC]: "Descendente",
};

export default orderLabels;
