import React, { ReactNode, useMemo } from 'react';

import { useFilter } from '../../hooks/useFilter';
import FilterForm from '../forms/FilterForm';

import type { FilterValues } from '../../models/Item';
type Props = {
  children: ReactNode[];
  className?: string;
  labeledBy?: string;
  columnLabels: {
    [key in keyof FilterValues]: string;
  };
};

const FilterDropdown = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, labeledBy, columnLabels }, ref) => {
    const { filter, setFilterByNumericValues } = useFilter();

    const formColumnLabels = useMemo(() => {
      const columnLabelsArray = Object.entries(columnLabels);

      const filterColumnNames = filter.byNumericValues.map(
        ({ column }) => column
      );

      return Object.fromEntries(
        columnLabelsArray.filter(
          ([columnName]) =>
            !filterColumnNames.includes(columnName as keyof FilterValues)
        )
      );
    }, [columnLabels, filter]);

    return (
      <div ref={ref} className={className} aria-labelledby={labeledBy}>
        <FilterForm
          columnLabels={formColumnLabels}
          onSubmit={setFilterByNumericValues}
        />

        <ul className="list-unstyled">{children}</ul>
      </div>
    );
  }
);

export default FilterDropdown;
