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
  }, []);

  return (
    <BSTable className="table-dark" responsive>
      <thead data-testid="table-header">
        <tr data-testid="table-header-row">
          {columns.map((column, index) => (
            <th key={index + Math.random()}>
              {columnLabels?.[column] ?? column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length
          ? data.map((item) => {
              const keys = Object.keys(item);

              return (
                <tr key={new Date().getTime() + Math.random()}>
                  {keys.map((key) => (
                    <td key={new Date().getTime() + Math.random()}>
                      {(item as any)[key]}
                    </td>
                  ))}
                </tr>
              );
            })
          : null}
      </tbody>
    </BSTable>
  );
}

export default Table;
