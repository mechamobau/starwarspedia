import React, { useMemo } from "react";
import BSTable from "react-bootstrap/Table";

type Props<T extends any> = {
  data: T[];
  columnLabels?: {
    [key: string]: string;
  };
};

function Table<T>({ data, columnLabels }: Props<T>) {
  const columns = useMemo(() => {
    if (!data.length) return [];

    return Object.keys(data[0]);
  }, [data]);

  return (
    <BSTable className="table-dark" responsive>
      <thead data-testid="table-header">
        <tr data-testid="table-header-row">
          {columns.map((column) => (
            <th key={column + Math.random()}>
              {columnLabels?.[column] ?? column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Condição redundante, quando o array está vazio o map irá retornar um array vazio e isso não irá renderizar nada de qualquer forma */}
        {data.map((item) => {
              const keys = Object.keys(item);

              return (
                <tr key={new Date().getTime() + Math.random()}> 
                {/* Não se deve utilizar como key valores que sempre irão mudar (Date, Random e etc),
                fazendo isso você irá provocar uma renderização desnecessária de todos elementos do map sempre que o componente renderizar,
                o melhor nesse caso é utilizar o index como key, o index só não é a uma boa opção quando os elementos do array mudam de ordem*/}
                  {keys.map((key) => (
                    <td key={key + Math.random()}>{(item as any)[key]}</td>
                  ))}
                </tr>
              );
            })
        }
      </tbody>
    </BSTable>
  );
}

export default Table;
