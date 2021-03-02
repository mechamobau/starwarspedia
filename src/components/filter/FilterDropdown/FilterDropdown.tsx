import React, { ReactNode } from "react";

import { NumericPlanetValues } from "../../../models/Planet";
import FilterForm from "../../forms/FilterForm";

type Props = {
  children: ReactNode[];
  className?: string;
  labeledBy?: string;
  columnLabels: {
    [key in keyof NumericPlanetValues]: string;
  };
};

const FilterDropdown = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, labeledBy, columnLabels }, ref) => (
    <div ref={ref} className={className} aria-labelledby={labeledBy}>
      <FilterForm columnLabels={columnLabels} />

      <ul className="list-unstyled">{React.Children.toArray(children)}</ul>
    </div>
  )
);

export default FilterDropdown;
