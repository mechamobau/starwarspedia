import React, { useMemo } from 'react';
import BSTable from 'react-bootstrap/Table';
import { Link } from 'react-router';

type Props<T extends object> = {
  data: T[];
  columnLabels?: {
    [key: string]: string;
  };
};

function Table<T extends object>({ data, columnLabels }: Props<T>) {
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
        {data.length
          ? data.map((item) => {
              const keys = Object.keys(item);

              return (
                <tr key={new Date().getTime() + Math.random()}>
                  {keys.map((key, index) => {
                    const data = `${(item as any)[key] ?? ''}`;
                    const filteredData =
                      data.length > 50 ? `${data.substring(0, 50)}...` : data;

                    if ('url' in item) {
                      const resource = new URL(`${item.url}`).pathname.replace(
                        '/api',
                        ''
                      );
                      return (
                        <td key={key + Math.random()}>
                          {index === 0 ? (
                            <Link to={resource}>{filteredData}</Link>
                          ) : (
                            filteredData
                          )}
                        </td>
                      );
                    }

                    return <td key={key + Math.random()}>{filteredData}</td>;
                  })}
                </tr>
              );
            })
          : null}
      </tbody>
    </BSTable>
  );
}

export default Table;
