import React from 'react';

import SortForm, { Values as SortFormValues } from '../forms/SortForm';

import type Item from '../../models/Item';
type Props = {
  className?: string;
  labeledBy?: string;
  onSubmit: (values: SortFormValues) => void;
  columnLabels: {
    [key in keyof Item]: string;
  };
};

const SortDropdown = React.forwardRef<HTMLDivElement, Props>(
  ({ className, labeledBy, columnLabels, onSubmit }, ref) => (
    <div ref={ref} className={className} aria-labelledby={labeledBy}>
      <SortForm columnLabels={columnLabels} onSubmit={onSubmit} />
    </div>
  )
);

export default SortDropdown;
