import React, { ReactNode } from "react";

type Props = {
  children: ReactNode[] | ReactNode;
  className: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const FilterToggle = React.forwardRef<HTMLAnchorElement, Props>(
  ({ children, onClick, className }, ref) => (
    <a
      href=""
      className={className}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  )
);

export default FilterToggle;
