import React, { ReactNode } from "react";
import { Button } from "react-bootstrap";

type Props = {
  children: ReactNode[] | ReactNode;
  className: string;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const FilterToggle = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, onClick, className }, ref) => (
    <Button
      className={className}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Button>
  )
);

export default FilterToggle;
