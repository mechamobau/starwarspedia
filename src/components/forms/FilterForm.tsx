import React, { useMemo } from "react";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

import { NumericPlanetValues } from "../../models/Planet";

import ComparisonEnum from "../../models/enum/Comparison.enum";

type Props = {
  columnLabels: {
    [key in keyof NumericPlanetValues]: string;
  };
};

const FilterForm = ({ columnLabels }: Props) => {
  const operations = useMemo(
    () => ({
      [ComparisonEnum.EQUALS]: "Igual a",
      [ComparisonEnum.GREATER_THAN]: "Maior que",
      [ComparisonEnum.LOWER_THAN]: "Menor que",
    }),
    []
  );

  return (
    <>
      <div className="px-3 py-2">
        <FormControl
          as="select"
          autoFocus
          className="w-100"
          placeholder="Coluna a ser comparada"
          // onChange={(e) => setValue(e.target.value)}
          // value={value}
        >
          {Object.entries(columnLabels).map((item) => (
            <option value={item[0]}>{item[1]}</option>
          ))}
        </FormControl>
      </div>
      <div className="px-3 py-2">
        <FormControl
          as="select"
          autoFocus
          className="w-100"
          placeholder="Operação"
          // onChange={(e) => setValue(e.target.value)}
          // value={value}
        >
          {Object.entries(operations).map((item) => (
            <option value={item[0]}>{item[1]}</option>
          ))}
        </FormControl>
      </div>
      <FormControl
        type="number"
        autoFocus
        className="mx-3 my-2 w-auto"
        placeholder="Valor"
        //   onChange={(e) => setValue(e.target.value)}
        //   value={value}
      />
      <div className="px-3 py-2">
        <Button className="w-100">Incluir filtro</Button>
      </div>
    </>
  );
};

export default FilterForm;
