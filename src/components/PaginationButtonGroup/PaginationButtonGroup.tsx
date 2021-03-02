import React, { useCallback, useMemo } from "react";

import { Pagination } from "../../context/usePagination";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

/**
 * Props do componente `PaginationButtonGroup`
 */
type Props = {
  pagination: Pagination;
  onPreviousButtonClick?: () => void;
  onNextButtonClick?: () => void;
  onPaginationChange?: (index: number) => void;
};

/**
 * Componente responsável pela exibição de botóes de paginação, respondendo a eventos de clique e
 * mudança de valores.
 */
const PaginationButtonGroup = ({
  pagination,
  onPreviousButtonClick,
  onNextButtonClick,
  onPaginationChange,
}: Props) => {
  const items = useMemo(
    () => Array.from({ length: pagination.viewsCount ?? 0 }, (_, i) => i + 1),
    [pagination]
  );

  const handlePaginationChange = useCallback(
    (index: number) => () => onPaginationChange?.(index),
    [onPaginationChange]
  );

  return (
    <ButtonGroup role="menu" aria-label="Controles de Paginação">
      {pagination.previous !== null ? (
        <Button
          variant="warning"
          data-testid="previous-button"
          onClick={onPreviousButtonClick}
        >
          Anterior
        </Button>
      ) : null}
      {items.map((index) => (
        <Button
          key={index}
          variant={index === pagination.current ? "outline-warning" : "warning"}
          disabled={index === pagination.current}
          onClick={handlePaginationChange(index)}
        >
          {index}
        </Button>
      ))}
      {pagination.next !== null ? (
        <Button
          variant="warning"
          data-testid="next-button"
          onClick={onNextButtonClick}
        >
          Próximo
        </Button>
      ) : null}
    </ButtonGroup>
  );
};

export default PaginationButtonGroup;
