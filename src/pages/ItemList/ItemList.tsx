import { useEffect, useLayoutEffect } from 'react';
import { Button, Container, Dropdown } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';

import FilterToggle from '../../components/dropdown/FilterToggle';
import FilterDropdown from '../../components/dropdown/FilterDropdown';
import SortDropdown from '../../components/dropdown/SortDropdown';
import PaginationButtonGroup from '../../components/table/PaginationButtonGroup';
import Table from '../../components/table/Table';
import operationsLabels from '../../constants/operationsLabels';
import { useFilter } from '../../hooks/useFilter';
import { usePagination } from '../../hooks/usePagination';
import { useItemList as useItemList } from '../../hooks/useItemList';
import { Navigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { entitiesList } from '../../constants/entitiesList';

const APP_BACKGROUND_IMAGE = process.env.PUBLIC_URL + '/background.jpg';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    overflow: auto;
  }

  body {
    margin: 0;
    padding: 10px;
    background: url(${APP_BACKGROUND_IMAGE}) center / cover no-repeat;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.9em;
  font-family: 'Star Jedi', Arial, sans-serif;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    font-size: 5em;
  }

  @media (min-width: 1024) {
    font-size: 7em;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const FormControlWrapper = styled.div`
  width: 100%;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  align-items: center;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;

  @media (min-width: 768px) {
    justify-content: flex-start;

    .dropdown {
      margin: 0 5px;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    font-weight: bold;
  }

  p {
    margin: 0;
  }
`;

export const ItemList = () => {
  const { entityName } = useParams<{
    entityName: string;
  }>();
  const { items, count, clearState } = useItemList(entityName!);

  const { pagination, next, previous, setCountItems, setCurrentItem } =
    usePagination();

  const { removeFilterByNumericValues, filter } = useFilter();

  useLayoutEffect(() => {
    return () => {
      clearState();
    };
  }, [entityName]);

  useEffect(() => {
    setCountItems(count);
  }, [count, setCountItems]);

  const { t } = useTranslation();

  if (!entityName) {
    return <Navigate to="/planets" />;
  }

  const columnLabels = items?.length
    ? Object.keys(items[0]).reduce((acc, item) => {
        acc[item] = t(`${entityName}:${item}`);
        return acc;
      }, {} as { [key: string]: string })
    : {};

  if (!entitiesList.includes(entityName as 'planets' | 'people')) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title className="text-warning">{t(`${entityName!}:title`)}</Title>

        <ControlsWrapper>
          <DropdownWrapper>
            <Dropdown>
              <Dropdown.Toggle
                as={FilterToggle}
                className="text-warning"
                id="dropdown-custom-components"
              >
                Ordenação
              </Dropdown.Toggle>

              <Dropdown.Menu
                columnLabels={columnLabels}
                align="end"
                as={SortDropdown}
              ></Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle
                as={FilterToggle}
                className="text-warning"
                id="dropdown-custom-components"
              >
                Filtros
              </Dropdown.Toggle>

              <Dropdown.Menu
                columnLabels={columnLabels}
                align="end"
                as={FilterDropdown}
              >
                {filter.byNumericValues?.length ? (
                  filter.byNumericValues?.map((item, index) => (
                    <Dropdown.ItemText key={item.column + index}>
                      <Wrapper>
                        <Button
                          className="mr-2"
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>
                            removeFilterByNumericValues(item.column)
                          }
                        >
                          &times;
                        </Button>
                        <p style={{ display: 'flex' }}>
                          {`${
                            columnLabels[
                              item.column as keyof typeof columnLabels
                            ]
                          } ${operationsLabels[
                            item.comparison
                          ].toLowerCase()} ${item.value}`}
                        </p>
                      </Wrapper>
                    </Dropdown.ItemText>
                  ))
                ) : (
                  <Dropdown.ItemText>
                    Nenhum filtro cadastrado
                  </Dropdown.ItemText>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </DropdownWrapper>
        </ControlsWrapper>

        {items?.length ? (
          <Table columnLabels={columnLabels} data={items} />
        ) : null}
        <PaginationWrapper>
          <PaginationButtonGroup
            pagination={pagination}
            onNextButtonClick={next}
            onPreviousButtonClick={previous}
            onPaginationChange={setCurrentItem}
          />
        </PaginationWrapper>
      </Container>
    </>
  );
};
